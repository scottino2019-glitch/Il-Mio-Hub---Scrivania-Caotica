/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Componente Promo Card + Modal per Galleria Laboratori CSS
 * Integra una splendida card interattiva con trigger overlay.
 */

import React, { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';
import CssLabsIndex from './CssLabsIndex';

export default function PromoCardModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="group relative mx-auto flex h-[320px] w-[320px] cursor-pointer overflow-hidden rounded-[60%_40%_30%_70%/60%_30%_70%_40%] border-2 border-white/10 bg-[#111116] p-[30px] text-left shadow-[0_10px_30px_rgba(139,92,246,0.10)] transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.25)] hover:scale-105 hover:rotate-1 hover:rounded-[40%_60%_60%_40%/40%_60%_40%_60%] hover:border-violet-400 hover:shadow-[0_20px_50px_rgba(139,92,246,0.25)]"
      >
        <div className="absolute left-[-50%] top-[-50%] z-[1] h-[200%] w-[200%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_180deg_at_50%_50%,#f472b6,#a78bfa,#3b82f6,#ec4899,#f472b6)] opacity-15 transition-all duration-500 group-hover:animate-[spin_4s_linear_infinite] group-hover:opacity-25" />

        <div className="relative z-[2] flex h-full w-full flex-col justify-between text-white">
          <div className="flex justify-end">
            <span className="border-b border-white/10 pb-2 text-[10px] font-bold tracking-[0.25em] text-violet-400 transition-colors duration-300 group-hover:border-violet-400/30 group-hover:text-pink-400">
              7 LABS
            </span>
          </div>

          <div className="mb-3">
            <h3 className="mb-1 bg-gradient-to-br from-white via-white to-purple-300 bg-clip-text text-[26px] font-black leading-none tracking-[0.06em] text-transparent transition-all duration-300 group-hover:from-pink-400 group-hover:to-blue-500">
              CSS Labs Playground
            </h3>

            <p className="mt-3 max-w-[22ch] text-[13px] leading-[1.5] text-slate-400">
              Sperimentazioni artistiche, animazioni fluide e griglie bento
              interattive realizzate in puro CSS. Clicca per aprirle tutte!
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4">
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-violet-400 transition-all duration-300 group-hover:translate-x-[2px] group-hover:text-pink-400">
              Esplora i laboratori
              <ChevronRight className="h-4 w-4 shrink-0" />
            </span>

            <span className="whitespace-nowrap text-[10px] font-bold tracking-[0.06em] text-slate-400">
              React + Tailwind
            </span>
          </div>

          <div className="absolute bottom-[-15px] right-[-15px] h-[35px] w-[35px] rounded-full border border-dashed border-white/15 transition-all duration-500 group-hover:scale-[1.8] group-hover:border-solid group-hover:border-violet-400" />
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-md">
          <div className="relative my-8 max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-3xl border-4 border-slate-900 bg-slate-50 p-6 shadow-[12px_12px_0px_#000] sm:p-10">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border-3 border-slate-900 bg-white text-slate-800 shadow-[2px_2px_0px_#000] transition-colors hover:bg-rose-100 hover:text-rose-600 sm:right-6 sm:top-6"
              title="Chiudi"
            >
              <X className="h-5 w-5 stroke-[2.5]" />
            </button>

            <div className="mb-6 border-b-2 border-slate-200 pb-4 pr-12">
              <span className="rounded border-2 border-slate-900 bg-indigo-100 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-indigo-800">
                Galleria Laboratori CSS
              </span>

              <p className="mt-1 text-xs text-slate-500">
                Fai click su qualsiasi scheda per avviare il laboratorio corrispondente.
              </p>
            </div>

            <div className="py-2">
              <CssLabsIndex />
            </div>

            <div className="mt-8 flex justify-end border-t-2 border-slate-200 pt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-xl border-3 border-slate-900 bg-slate-950 px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white transition-colors hover:bg-slate-800"
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

