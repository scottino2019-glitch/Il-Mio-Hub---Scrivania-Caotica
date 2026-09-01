/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Componente Indice Multimediale CSS Labs (Artistico Neo-Brutalista)
 * Integrabile con React, Tailwind CSS e Lucide Icons.
 */

import React from 'react';
import {
  ArrowUpRight,
  Cat,
  ChevronRight,
  CodeXml,
  Coffee,
  Compass,
  Flame,
  Heart,
  Image,
  Layout,
  Mountain,
  Sparkles
} from 'lucide-react';

interface LabLink {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  iconName: string;
  isExternal: boolean;
  status: 'completato' | 'in_corso' | 'sperimentale';
}

const LABS_DATA: LabLink[] = [
  {
    id: '01',
    title: 'Coffee Studio',
    subtitle: 'Caffetteria virtuale con animazioni fluide e vapore realistico',
    url: 'coffe-studio.html',
    iconName: 'Coffee',
    isExternal: false,
    status: 'completato',
  },
  {
    id: '02',
    title: 'Gatto Studio',
    subtitle: 'Gattino interattivo con tracciamento occhi e coda animata',
    url: 'gatto-studio.html',
    iconName: 'Cat',
    isExternal: false,
    status: 'completato',
  },
  {
    id: '03',
    title: 'CSS Black Studio',
    subtitle: 'Elegante interfaccia scura con bagliori neon e accenti futuristici',
    url: 'Css-Black-Studio.html',
    iconName: 'CodeXml',
    isExternal: false,
    status: 'completato',
  },
  {
    id: '04',
    title: 'CSS Studio',
    subtitle: 'Laboratorio interattivo di sperimentazione e test per fogli di stile',
    url: 'css-studio.html',
    iconName: 'Layout',
    isExternal: false,
    status: 'completato',
  },
  {
    id: '05',
    title: 'Dragon Studio',
    subtitle: 'Drago animato sputafuoco con cicli di movimento in puro CSS',
    url: 'dragon-studio.html',
    iconName: 'Flame',
    isExternal: false,
    status: 'in_corso',
  },
  {
    id: '06',
    title: 'Mountain Studio',
    subtitle: 'Paesaggio montano con parallasse dinamico e ciclo giorno/notte',
    url: 'montain-studio.html',
    iconName: 'Mountain',
    isExternal: false,
    status: 'completato',
  },
  {
    id: '07',
    title: 'Pure Code Canvas',
    subtitle: 'La galleria web centrale di visual art e pittura con puro codice',
    url: 'https://pure-code-canvas-579414217719.europe-west2.run.app/',
    iconName: 'Sparkles',
    isExternal: true,
    status: 'completato',
  },
  {
    id: '08',
    title: 'CSS Grid',
    subtitle: '',
    url: 'https://css-grid-container-layout-studio.vercel.app/',
    iconName: 'Layout',
    isExternal: true,
    status: 'in_corso',
  },
  {
    id: '09',
    title: 'CSS Clip-Path Studio',
    subtitle: '',
    url: 'https://studio-clip-path.vercel.app/',
    iconName: 'Image',
    isExternal: true,
    status: 'in_corso',
  },
  {
    id: '10',
    title: 'CSS CLIP PATH',
    subtitle: '',
    url: 'https://clip-path-studio-two.vercel.app/',
    iconName: 'Heart',
    isExternal: true,
    status: 'in_corso',
  },
  {
    id: '11',
    title: 'Grid Coordinate Canvas',
    subtitle: '',
    url: 'https://grid-coordinate-canvas.vercel.app/',
    iconName: 'Compass',
    isExternal: true,
    status: 'in_corso',
  }
];

const colorThemes = {
  indigo: { primary: '#4f46e5', bg: 'bg-indigo-50/50', badge: 'text-indigo-600', border: 'border-indigo-600/20' },
  rose: { primary: '#e11d48', bg: 'bg-rose-50/50', badge: 'text-rose-600', border: 'border-rose-600/20' },
  emerald: { primary: '#059669', bg: 'bg-emerald-50/50', badge: 'text-emerald-600', border: 'border-emerald-600/20' },
  amber: { primary: '#d97706', bg: 'bg-amber-50/50', badge: 'text-amber-600', border: 'border-amber-600/20' },
  violet: { primary: '#7c3aed', bg: 'bg-violet-50/50', badge: 'text-violet-600', border: 'border-violet-600/20' },
  sky: { primary: '#0284c7', bg: 'bg-sky-50/50', badge: 'text-sky-600', border: 'border-sky-600/20' },
  slate: { primary: '#475569', bg: 'bg-slate-100/50', badge: 'text-slate-700', border: 'border-slate-700/20' },
};

const organicBlobs = [
  '30% 70% 70% 30% / 30% 30% 70% 70%',
  '60% 40% 30% 70% / 60% 30% 70% 40%',
  '40% 60% 70% 30% / 40% 40% 60% 60%',
  '15% 85% 15% 85% / 85% 15% 85% 15%',
  '70% 30% 30% 70% / 60% 40% 60% 40%',
  '20% 80% 20% 80% / 20% 80% 20% 80%',
  '9999px',
];

const bentoColors = [
  { shadow: '#4f46e5', accent: 'text-indigo-600', bg: 'bg-white', isDark: false },
  { shadow: '#fbbf24', accent: 'text-amber-500', bg: 'bg-white', isDark: false },
  { shadow: '#f43f5e', accent: 'text-rose-500', bg: 'bg-[#1e293b]', isDark: true },
  { shadow: '#10b981', accent: 'text-emerald-500', bg: 'bg-white', isDark: false },
  { shadow: '#8b5cf6', accent: 'text-violet-500', bg: 'bg-white', isDark: false },
  { shadow: '#0ea5e9', accent: 'text-sky-500', bg: 'bg-white', isDark: false },
  { shadow: '#1e293b', accent: 'text-indigo-600', bg: 'bg-[#f1f5f9]', isDark: false },
];

const iconsMap: Record<string, React.ComponentType<any>> = {
  ArrowUpRight,
  Cat,
  ChevronRight,
  CodeXml,
  Coffee,
  Compass,
  Flame,
  Heart,
  Image,
  Layout,
  Mountain,
  Sparkles
};

export default function CssLabsIndex() {
  const theme = colorThemes['indigo'] || colorThemes.indigo;
  const isBento = true;

  // Border radius shape
  const getBorderRadius = (index: number) => {
    const shape = 'organic-blob';
    if (shape === 'organic-blob') return organicBlobs[index % organicBlobs.length];
    if (shape === 'pill-blob') return '9999px';
    if (shape === 'rounded-rect') return '16px';
    return '0px';
  };

  // Shadow calculation
  const getShadowStyle = (isHovered: boolean, itemIndex: number) => {
    const offset = '10px';
    if (offset === 'none') return 'none';
    const size = { '6px': isHovered ? 10 : 6, '10px': isHovered ? 14 : 10, '14px': isHovered ? 18 : 14 }[offset] || 10;
    const baseColor = isBento ? bentoColors[itemIndex % bentoColors.length].shadow : theme.primary;
    const shadowColor = isHovered ? '#1e293b' : baseColor;
    return `${size}px ${size}px 0px ${shadowColor}`;
  };

  const getBentoColSpan = (index: number) => {
    switch (index % 7) {
      case 0: return 'md:col-span-4 min-h-[180px]';
      case 1: return 'md:col-span-4 min-h-[180px]';
      case 2: return 'md:col-span-4 min-h-[180px]';
      case 3: return 'md:col-span-5 md:row-span-2 min-h-[384px]';
      case 4: return 'md:col-span-3 min-h-[180px]';
      case 5: return 'md:col-span-4 min-h-[180px]';
      case 6: return 'md:col-span-7 min-h-[180px]';
      default: return 'md:col-span-4 min-h-[180px]';
    }
  };

  return (
    <div className={`w-full mx-auto py-12 px-4 transition-all duration-500 ${isBento ? 'max-w-5xl' : 'max-w-2xl'}`} id="artistic-index-card">
      <div className="mb-10 text-center">
        <h1 className="font-sans font-black tracking-wider text-slate-900 uppercase text-3xl sm:text-4xl mb-3 inline-block px-4 py-2 border-3 border-slate-900 shadow-[4px_4px_0px_#1e293b] rotate-[-1deg] bg-white rounded-md">
          Indice Laboratori
        </h1>
        {true && (
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mt-2">
            Sperimentazioni artistiche realizzate in puro CSS
          </p>
        )}
      </div>

      {isBento ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {LABS_DATA.map((lab, index) => {
            const IconComponent = iconsMap[lab.iconName] || Sparkles;
            const borderRadius = getBorderRadius(index);
            const colSpan = getBentoColSpan(index);
            const bentoColor = bentoColors[index % bentoColors.length];
            const restShadow = getShadowStyle(false, index);
            const hoverShadow = getShadowStyle(true, index);
            const isMasterCard = index % 7 === 3;
            const isDarkCard = bentoColor.isDark;

            return (
              <div
                key={lab.id}
                className={`${colSpan} relative group`}
              >
                {true && (
                  <div 
                    className="absolute -top-2.5 -right-2.5 w-8 h-8 rounded-full border-2 border-slate-900 font-black text-xs flex items-center justify-center shadow-[2px_2px_0px_#000] z-20"
                    style={{ 
                      backgroundColor: bentoColor.shadow,
                      color: isDarkCard ? '#ffffff' : '#1e293b'
                    }}
                  >
                    {lab.id}
                  </div>
                )}

                <a
                  href={lab.url}
                  target={lab.isExternal ? '_blank' : '_self'}
                  rel="noreferrer"
                  className={`block w-full h-full p-5 sm:p-6 transition-all duration-300 border-slate-900 relative border-[3px] ${bentoColor.bg} ${isDarkCard ? 'text-white' : 'text-slate-800 hover:text-slate-950'}`}
                  style={{
                    borderRadius: borderRadius,
                    boxShadow: restShadow,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translate(-4px, -4px)';
                    e.currentTarget.style.boxShadow = hoverShadow;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translate(0px, 0px)';
                    e.currentTarget.style.boxShadow = restShadow;
                  }}
                >
                  {isMasterCard ? (
                    <div className="flex flex-col h-full justify-center items-center text-center">
                      <span className="text-6xl sm:text-7xl mb-3 group-hover:scale-110 transition-transform">🏗️</span>
                      <h3 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tighter leading-none mt-2">
                        {lab.title}
                      </h3>
                      {false && lab.subtitle && (
                        <p className="text-xs font-bold uppercase tracking-wider mt-2 px-3 py-1 bg-emerald-50 rounded-lg text-emerald-600 border border-emerald-100">
                          {lab.subtitle}
                        </p>
                      )}
                      <div className="mt-5 flex justify-center gap-1.5">
                        <div className="w-2.5 h-2.5 bg-slate-900 rounded-full" />
                        <div className="w-2.5 h-2.5 bg-slate-900 rounded-full opacity-50" />
                        <div className="w-2.5 h-2.5 bg-slate-900 rounded-full opacity-20" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col h-full justify-between">
                      <div className="flex justify-between items-start">
                        <div 
                          className="flex items-center justify-center w-10 h-10 text-white border-2 border-slate-900 transition-transform group-hover:rotate-6 shadow-[2px_2px_0px_#1e293b]"
                          style={{
                            borderRadius: borderRadius,
                            backgroundColor: bentoColor.shadow,
                          }}
                        >
                          <IconComponent className="w-5 h-5 stroke-[2.5]" />
                        </div>
                        <div className="w-7 h-7 rounded-full border border-slate-300 group-hover:border-slate-900 flex items-center justify-center text-slate-400 group-hover:text-slate-900 transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-sans font-black text-sm sm:text-base uppercase tracking-tight leading-tight">
                            {lab.title}
                          </h3>
                          {lab.status === 'sperimentale' && (
                            <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 bg-amber-100 text-amber-800 border-2 border-slate-900 rounded-sm">
                              Sperimentale
                            </span>
                          )}
                        </div>
                        {false && lab.subtitle && (
                          <p className={`text-[10px] font-bold uppercase mt-1 tracking-wider ${isDarkCard ? 'text-rose-300' : 'text-slate-400'}`}>
                            {lab.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </a>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-6">
          {LABS_DATA.map((lab, index) => {
            const IconComponent = iconsMap[lab.iconName] || Sparkles;
            const borderRadius = getBorderRadius(index);
            const restShadow = getShadowStyle(false, index);
            const hoverShadow = getShadowStyle(true, index);

            return (
              <div
                key={lab.id}
                className="group relative"
              >
                <a
                  href={lab.url}
                  target={lab.isExternal ? '_blank' : '_self'}
                  rel="noreferrer"
                  className="block w-full transition-all duration-300 bg-white border-slate-900 text-slate-800 hover:text-slate-950 border-[3px]"
                  style={{
                    borderRadius: borderRadius,
                    boxShadow: restShadow,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translate(-4px, -4px)';
                    e.currentTarget.style.boxShadow = hoverShadow;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translate(0px, 0px)';
                    e.currentTarget.style.boxShadow = restShadow;
                  }}
                >
                  <div className="flex items-center gap-4 sm:gap-6 p-5 sm:p-6">
                    {/* Badge Number */}
                    {true && (
                      <div className={`hidden sm:flex items-center justify-center font-black text-xs sm:text-sm w-10 h-10 border rounded-full shrink-0 font-mono transition-colors group-hover:bg-slate-50 ${theme.border} ${theme.badge}`}>
                        {lab.id}
                      </div>
                    )}

                    {/* Circular Dot */}
                    {false && (
                      <div className="hidden sm:block w-3.5 h-3.5 rounded-full border-2 border-slate-900 shrink-0" style={{ backgroundColor: theme.primary }} />
                    )}

                    {/* Icon Frame */}
                    <div
                      className="flex items-center justify-center w-12 h-12 shrink-0 text-white border-3 border-slate-900 transition-transform group-hover:rotate-6 shadow-[2px_2px_0px_#1e293b]"
                      style={{
                        borderRadius: borderRadius,
                        backgroundColor: theme.primary,
                      }}
                    >
                      <IconComponent className="w-6 h-6 stroke-[2.5]" />
                    </div>

                    {/* Title & Subtitle */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-sans font-black tracking-wide text-base sm:text-lg uppercase leading-tight group-hover:text-slate-950">
                          {lab.title}
                        </h3>
                        {lab.status === 'sperimentale' && (
                          <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 bg-amber-100 text-amber-800 border-2 border-slate-900 rounded-sm">
                            Sperimentale
                          </span>
                        )}
                      </div>
                      {false && lab.subtitle && (
                        <p className="text-xs sm:text-sm font-semibold opacity-70 mt-1 leading-normal text-slate-500 group-hover:text-slate-700">
                          {lab.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Action Link */}
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-slate-300 group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all">
                      {lab.isExternal ? <ArrowUpRight className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

