<template>
  <div class="space-y-8 max-w-5xl mx-auto pb-12">
    <!-- Header Teórico NIF A-1 -->
    <div class="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-900 border border-indigo-900/60 rounded-3xl p-6 md:p-8 text-slate-100 shadow-xl space-y-4">
      <div class="flex items-center gap-2">
        <span class="px-3 py-1 bg-indigo-500/20 border border-indigo-500/40 rounded-full text-[10px] font-mono font-bold tracking-widest text-indigo-300 uppercase">
          NIF A-1 • Marco Teórico Conceptual
        </span>
      </div>
      <h2 class="text-xl md:text-2xl font-black text-white">Contabilidad vs Contaduría</h2>
      
      <div class="grid md:grid-cols-2 gap-4 text-xs leading-relaxed">
        <div class="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-1.5">
          <div class="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/></svg>
            <span>Contabilidad:</span>
          </div>
          <p class="text-slate-300">
            Técnica que compila los registros sistemáticos de las transacciones y eventos económicos que afectan a una entidad, generando la información incorporada en los estados financieros.
          </p>
        </div>

        <div class="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-1.5">
          <div class="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            <span>Contaduría:</span>
          </div>
          <p class="text-slate-300">
            Profesión ejercida por el Contador Público, vinculada a las ciencias económico-administrativas en áreas como auditoría, contraloría, fiscal/impuestos, costos, finanzas y nómina.
          </p>
        </div>
      </div>
    </div>

    <!-- Esquema de Mayor Interactivo (Cuenta "T") -->
    <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h3 class="text-base font-bold text-slate-100 flex items-center gap-2">
            <svg class="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
            <span>Esquema de Mayor (Cuenta "T")</span>
          </h3>
          <p class="text-xs text-slate-400 mt-0.5">Dinámica estructural de cargos, abonos y saldos.</p>
        </div>
      </div>

      <!-- Diagrama de la Cuenta T -->
      <div class="max-w-xl mx-auto border-2 border-slate-700 rounded-2xl overflow-hidden bg-slate-950 shadow-lg">
        <div class="bg-slate-800/90 text-slate-100 text-center py-2.5 font-mono font-bold text-xs uppercase tracking-wider border-b border-slate-700">
          Nombre de la Cuenta
        </div>

        <div class="grid grid-cols-2 text-center text-[11px] font-bold border-b border-slate-800 bg-slate-900/60 py-1.5 font-mono">
          <div class="text-blue-400">DEBE (Izquierda)</div>
          <div class="text-emerald-400">HABER (Derecha)</div>
        </div>

        <div class="grid grid-cols-2 divide-x-2 divide-slate-700 p-4 min-h-[130px] text-xs">
          <!-- Lado Izquierdo (Debe) -->
          <div class="space-y-2 pr-3">
            <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-950 border border-blue-800 text-blue-300 font-bold rounded-md text-[10px]">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
              CARGO
            </span>
            <p class="text-[11px] text-slate-400 leading-tight">Cualquier anotación en la columna del DEBE.</p>
            <div class="pt-2 text-[10px] font-mono font-semibold text-blue-400">
              Suma = Movimiento Deudor
            </div>
          </div>

          <!-- Lado Derecho (Haber) -->
          <div class="space-y-2 pl-3">
            <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold rounded-md text-[10px]">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              ABONO
            </span>
            <p class="text-[11px] text-slate-400 leading-tight">Cualquier anotación en la columna del HABER.</p>
            <div class="pt-2 text-[10px] font-mono font-semibold text-emerald-400">
              Suma = Movimiento Acreedor
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 text-center text-[10px] font-bold border-t-2 border-slate-700 bg-slate-900/90 py-2.5">
          <div class="text-blue-300 px-2 font-mono">SALDO DEUDOR (Mov. Deudor > Mov. Acreedor)</div>
          <div class="text-emerald-300 px-2 font-mono">SALDO ACREEDOR (Mov. Acreedor > Mov. Deudor)</div>
        </div>
      </div>
    </div>

    <!-- Reglas de Aumento y Disminución -->
    <div class="grid md:grid-cols-2 gap-4">
      <div class="p-5 bg-blue-950/40 border border-blue-800/60 rounded-3xl space-y-3">
        <h4 class="text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-2">
          <svg class="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          <span>¿Cuándo se Realiza un Cargo? (DEBE)</span>
        </h4>
        <div class="space-y-2 text-xs">
          <div class="p-3 bg-slate-900/80 border border-blue-900/50 rounded-xl text-slate-200 flex items-start gap-2">
            <span class="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">+</span>
            <span><strong>Aumento</strong> de cuentas de <strong>Activo, Costo o Gasto</strong> (Naturaleza Deudora).</span>
          </div>
          <div class="p-3 bg-slate-900/80 border border-blue-900/50 rounded-xl text-slate-200 flex items-start gap-2">
            <span class="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">-</span>
            <span><strong>Disminución</strong> de cuentas de <strong>Pasivo, Capital o Ingreso</strong> (Naturaleza Acreedora).</span>
          </div>
        </div>
      </div>

      <div class="p-5 bg-emerald-950/40 border border-emerald-800/60 rounded-3xl space-y-3">
        <h4 class="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
          <svg class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          <span>¿Cuándo se Realiza un Abono? (HABER)</span>
        </h4>
        <div class="space-y-2 text-xs">
          <div class="p-3 bg-slate-900/80 border border-emerald-900/50 rounded-xl text-slate-200 flex items-start gap-2">
            <span class="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">+</span>
            <span><strong>Aumento</strong> de cuentas de <strong>Pasivo, Capital o Ingreso</strong> (Naturaleza Acreedora).</span>
          </div>
          <div class="p-3 bg-slate-900/80 border border-emerald-900/50 rounded-xl text-slate-200 flex items-start gap-2">
            <span class="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">-</span>
            <span><strong>Disminución</strong> de cuentas de <strong>Activo, Costo o Gasto</strong> (Naturaleza Deudora).</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Cuentas Complementarias y Casos Prácticos -->
    <div class="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
      <div class="flex items-center gap-2 text-amber-400 font-bold text-sm">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        <span>Cuentas Complementarias o de Naturaleza Contraria</span>
      </div>
      <p class="text-xs text-slate-300">
        Son cuentas que tienen una naturaleza contraria a la del elemento al que pertenecen para regularizar o restar su valor contable:
      </p>

      <div class="grid md:grid-cols-2 gap-3 text-xs">
        <div class="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
          <span class="font-bold text-amber-300 block">En el ACTIVO (Naturaleza ACREEDORA):</span>
          <ul class="text-slate-400 space-y-1 text-[11px]">
            <li>• <strong>Depreciación acumulada</strong> (resta propiedades, planta y equipo).</li>
            <li>• <strong>Amortización acumulada</strong> (resta activos intangibles).</li>
            <li>• <strong>Estimación para cuentas incobrables</strong> (resta clientes).</li>
            <li>• <strong>Estimación de inventarios obsoletos</strong> (resta almacén).</li>
          </ul>
        </div>

        <div class="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
          <span class="font-bold text-amber-300 block">En el CAPITAL (Naturaleza DEUDORA):</span>
          <ul class="text-slate-400 space-y-1 text-[11px]">
            <li>• <strong>Capital suscrito no exhibido / Accionistas</strong> (resta capital social).</li>
            <li>• <strong>Pérdidas acumuladas o del ejercicio</strong> (disminuyen el capital ganado).</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
