import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../lib/supabase'

export const useAccountingStore = defineStore('accounting', () => {
  const documents = ref(JSON.parse(localStorage.getItem('cached_conta_data') || '[]'))
  const loading = ref(false)
  const isOnline = ref(navigator.onLine)

  window.addEventListener('online', () => { isOnline.value = true })
  window.addEventListener('offline', () => { isOnline.value = false })

  async function fetchAll() {
    loading.value = true
    try {
      const { data, error } = await supabase
        .from('documents')
        .select(`
          id, title, short_code, nif_reference, description, icon, order_index,
          sections (
            id, name, nature, order_index,
            financial_items (
              id, code, abbreviation, name, operation_sign, normal_balance,
              is_group_total, formula_expression, definition, examples, order_index
            )
          )
        `)
        .order('order_index')

      if (!error && data) {
        // Ordenar secciones y cuentas internamente
        data.forEach(doc => {
          if (doc.sections) {
            doc.sections.sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
            doc.sections.forEach(sec => {
              if (sec.financial_items) {
                sec.financial_items.sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
              }
            })
          }
        })
        documents.value = data
        localStorage.setItem('cached_conta_data', JSON.stringify(data))
      }
    } catch (err) {
      console.warn('Conexión fallida, operando con datos offline:', err)
    } finally {
      loading.value = false
    }
  }

  async function upsertItem(itemData) {
    if (itemData.id) {
      const { id, ...rest } = itemData
      await supabase.from('financial_items').update(rest).eq('id', id)
    } else {
      await supabase.from('financial_items').insert(itemData)
    }
    await fetchAll()
  }

  async function deleteItem(id) {
    await supabase.from('financial_items').delete().eq('id', id)
    await fetchAll()
  }

  return {
    documents,
    loading,
    isOnline,
    fetchAll,
    upsertItem,
    deleteItem
  }
})
