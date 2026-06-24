
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Componente Promo Card + Modal per Galleria Laboratori CSS
 * Integra una splendida card interattiva con trigger overlay.
 */

import React, { useState } from 'react';
import { Sparkles, ExternalLink, X, ChevronRight } from 'lucide-react';
import CssLabsIndex from './CssLabsIndex'; // Modifica il percorso secondo le tue esigenze

export default function PromoCardModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 1. LA PROMO CARD - Posizionala ovunque nel tuo sito principale (Home, Sidebar, ecc.) */}
      <div 
        onClick={() => setIsOpen(true)}
        className="max-w-md mx-auto border-4 border-slate-900 bg-white p-6 rounded-3xl shadow-[6px_6px_0px_#1e293b] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_#1e293b] active:translate-x-0 active:translate-y-0 active:shadow-[6px_6px_0px_#1e293b] transition-all cursor-pointer group relative overflow-hidden text-left"
      >
        {/* Sfondo decorativo ad effetto */}
        <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-indigo-100/50 group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
        
        <div className="flex justify-between items-start relative z-10">
          <span className="text-4xl group-hover:animate-bounce duration-300">🧪</span>
          <span className="px-3 py-1 bg-rose-100 text-rose-800 border-2 border-slate-900 rounded-xl font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_#000]">
            7 Labs
          </span>
        </div>
        
        <div className="mt-5 relative z-10">
          <h3 className="font-sans font-black text-xl uppercase tracking-tight text-slate-900">
            CSS Labs Playground
          </h3>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Sperimentazioni artistiche, animazioni fluide e griglie bento interattive realizzate in puro CSS. Clicca per aprirle tutte!
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between border-t-2 border-slate-100 pt-4 relative z-10">
          <span className="text-xs font-black uppercase text-indigo-600 group-hover:underline flex items-center gap-1">
            Esplora i laboratori
            <ChevronRight className="w-4 h-4" />
          </span>
          <span className="text-[10px] font-mono font-bold text-slate-400">
            React + Tailwind
          </span>
        </div>
      </div>

      {/* 2. IL MODAL OVERLAY (Si attiva al clic) */}
      {isOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-50 border-4 border-slate-900 shadow-[12px_12px_0px_#000] rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-y-auto relative p-6 sm:p-10 my-8">
            
            {/* Pulsante di chiusura del Modal */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white border-3 border-slate-900 flex items-center justify-center text-slate-800 hover:bg-rose-100 hover:text-rose-600 transition-colors z-30 shadow-[2px_2px_0px_#000]"
              title="Chiudi"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Header del Modal */}
            <div className="mb-6 border-b-2 border-slate-200 pb-4 pr-12">
              <span className="px-2 py-1 bg-indigo-100 text-indigo-800 border-2 border-slate-900 rounded font-black text-[10px] uppercase tracking-wider">
                Galleria Laboratori CSS
              </span>
              <p className="text-xs text-slate-500 mt-1">
                Fai click su qualsiasi scheda per avviare il laboratorio corrispondente.
              </p>
            </div>

            {/* L'indice principale (CssLabsIndex.tsx) */}
            <div className="py-2">
              <CssLabsIndex />
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t-2 border-slate-200 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 border-3 border-slate-900 bg-slate-950 text-white font-black text-xs uppercase tracking-wider rounded-xl hover:bg-slate-800 transition-colors"
              >
                Chiudi Galleria
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

