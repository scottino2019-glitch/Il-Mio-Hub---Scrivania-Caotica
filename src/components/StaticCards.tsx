import React from "react";

interface StaticCardsProps {
  playSoundBlip: (freq: number, type?: OscillatorType, duration?: number) => void;
}

// 1. IPOD CARD (CARD A)
export const IpodCard: React.FC = () => {
  return (
    <div className="desk-card hover-rot-1" style={{ '--hover-rot': '1deg' } as any}>
      <div className="ipod-embed-container bg-black rounded-[2rem] shadow-2xl border-4 border-stone-800 overflow-hidden relative aspect-[5/7.2] w-full max-w-[420px] mx-auto">
        <iframe 
          src="https://i-pod-audio-player.vercel.app/" 
          className="absolute inset-0 w-full h-full border-none"
          allow="autoplay; clipboard-write; encrypted-media"
          sandbox="allow-scripts allow-same-origin allow-forms"
          title="Retro iPod Player"
        />
      </div>
    </div>
  );
};

// 2. CALENDARIO STRAPPATO CARD (CARD C)
export const CalendarioCard: React.FC = () => {
  return (
    <div className="desk-card hover-rot-1" style={{ '--hover-rot': '1deg' } as any}>
      <div className="bg-[#1e293b]/40 backdrop-blur-md p-4 rounded-3xl border border-white/5 flex justify-center items-center shadow-2xl w-full">
        <iframe 
          src="https://calendario-strappato.vercel.app/?embed=true&paper=lined&font=handwriting&tape=transparent" 
          style={{ border: 'none', overflow: 'hidden', background: 'transparent' }} 
          width="100%" 
          height="450" 
          title="Calendario Strappato"
        />
      </div>
    </div>
  );
};

// 3. LAVAGNA SLATE CHALKBOARD CARD (CARD D)
export const LavagnaCard: React.FC = () => {
  return (
    <div className="desk-card hover-rot-1" style={{ '--hover-rot': '-1deg' } as any}>
      <div className="wooden-frame">
        <div className="slate-surface relative">
          <div className="chalk-dust-1"></div>
          <div className="chalk-dust-2"></div>
          
          <div className="text-center mb-6">
            <h3 className="font-bold text-white text-base tracking-wide" style={{ textShadow: '0 0 5px rgba(255,255,255,0.8)' }}>
             Lingua e Utility
            </h3>
            <p className="text-white/60 font-mono text-[9px] mt-1">~ Non cancellare questa lavagna ~</p>
          </div>

          <div className="space-y-4 relative z-10 font-mono text-xs">
            <div className="flex gap-2 items-start">
              <span>🐉</span>
              <div>
                <a href="https://scottino2019-glitch.github.io/lingua-cinese/" target="_blank" rel="noopener noreferrer" className="chalk-link chalk-pink">
                  1. 中文 (Cinese)
                </a>
                <span className="block text-[9px] text-white/50">Portale e dizionario linguistico</span>
              </div>
            </div>

            <div className="flex gap-2 items-start">
              <span>🐅</span>
              <div>
                <a href="https://linguacoreana.netlify.app/" target="_blank" rel="noopener noreferrer" className="chalk-link chalk-blue">
                  2. 한국어 (Coreano)
                </a>
                <span className="block text-[9px] text-white/50">Risorse di apprendimento e pronuncia</span>
              </div>
            </div>

            <div className="flex gap-2 items-start">
              <span>✍</span>
              <div>
                <a href="https://quaderni-per-esercizi.vercel.app/" target="_blank" rel="noopener noreferrer" className="chalk-link chalk-yellow">
                  3. Laboratorio Linguistico
                </a>
                <span className="block text-[9px] text-white/50">Quaderni di grammatica attiva</span>
              </div>
            </div>

            <div className="flex gap-2 items-start">
              <span>📑</span>
              <div>
                <a href="https://spazio-creativo.vercel.app/eserciziPDF.html" target="_blank" rel="noopener noreferrer" className="chalk-link chalk-green">
                  4. Eserciziario PDF
                </a>
                <span className="block text-[9px] text-white/50">Svolgere i compiti sul tablet</span>
              </div>
            </div>

            <div className="flex gap-2 items-start">
              <span>💻</span>
              <div>
                <a href="https://quaderno-digitale.vercel.app/" target="_blank" rel="noopener noreferrer" className="chalk-link chalk-red">
                  5. Quaderno Digitale
                </a>
                <span className="block text-[9px] text-white/50">Raccolta di studi informatici</span>
              </div>
            </div>
          </div>

          {/* Felt eraser representation */}
          <div className="absolute bottom-3 right-4 flex flex-col w-[60px] h-[18px] shadow-lg rounded overflow-hidden opacity-85">
            <div className="bg-[#444] h-[12px] border-b border-black"></div>
            <div className="bg-[#c19a6b] h-[6px] text-stone-800 text-[6px] font-bold flex items-center justify-center font-sans uppercase">
              Cancellino
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. SMARTPHONE BEZEL OVERLAY (CARD I)
export const SmartphoneCard: React.FC<StaticCardsProps> = ({ playSoundBlip }) => {
  return (
    <div className="desk-card hover-rot-1" style={{ '--hover-rot': '1deg' } as any}>
      <div className="smartphone-bezel overflow-hidden">
        <div className="top-ears">
          <div className="notch-camera"></div>
          <div className="ear-speaker"></div>
        </div>

        <div className="smartphone-screen p-4 min-h-[460px] flex flex-col justify-between select-none">
          <div>
            {/* Glowing Status grid bar */}
            <div className="flex justify-between items-center text-[9px] text-white/70 font-mono mb-4">
              <span>16:49</span>
              <div className="flex gap-1.5 items-center">
                <span className="text-[7px]">📶</span>
                <span>5G</span>
                <span>🔋 99%</span>
              </div>
            </div>

            <div className="text-center font-bold text-white tracking-wider text-base mt-2 mb-6" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              📚 Libri & Codex
            </div>

            {/* Icon apps grid list */}
            <div className="grid grid-cols-2 gap-3">
              <a 
                href="https://libreria-lilac.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => playSoundBlip(880, 'sine', 0.06)}
                className="app-tile flex flex-col items-center justify-center p-3.5 bg-amber-950/40 hover:bg-amber-950/60 border border-amber-500/15 hover:border-amber-500/40 rounded-2xl transition-all hover:-translate-y-1"
              >
                <span className="text-3xl mb-1.5">📚</span>
                <span className="text-[11px] text-white font-bold tracking-tight">Codex Digital</span>
                <span className="text-[7.5px] text-amber-400 font-mono mt-1 opacity-85">LINK DIRETTO ↗</span>
              </a>

              <a 
                href="https://vox-libro.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => playSoundBlip(880, 'sine', 0.05)}
                className="app-tile flex flex-col items-center justify-center p-3.5 bg-indigo-950/40 hover:bg-indigo-950/60 border border-indigo-500/15 hover:border-indigo-500/40 rounded-2xl transition-all hover:-translate-y-1"
              >
                <span className="text-3xl mb-1.5">🎧</span>
                <span className="text-[11px] text-white font-bold tracking-tight">VoxLibro</span>
                <span className="text-[7.5px] text-indigo-400 font-mono mt-1 opacity-85">LINK DIRETTO ↗</span>
              </a>

              <a 
                href="https://biblioteca-six-plum.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => playSoundBlip(880, 'sine', 0.05)}
                className="app-tile flex flex-col items-center justify-center p-3.5 bg-rose-950/40 hover:bg-rose-950/60 border border-rose-500/15 hover:border-rose-500/40 rounded-2xl transition-all hover:-translate-y-1"
              >
                <span className="text-3xl mb-1.5">📕</span>
                <span className="text-[11px] text-white font-bold tracking-tight">Biblioteca</span>
                <span className="text-[7.5px] text-rose-400 font-mono mt-1 opacity-85">LINK DIRETTO ↗</span>
              </a>

              <a 
                href="https://mdn.mozilla.org" 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => playSoundBlip(880, 'sine', 0.05)}
                className="app-tile flex flex-col items-center justify-center p-3.5 bg-teal-950/40 hover:bg-teal-950/60 border border-teal-500/15 hover:border-teal-500/40 rounded-2xl transition-all hover:-translate-y-1"
              >
                <span className="text-3xl mb-1.5">💡</span>
                <span className="text-[11px] text-white font-bold tracking-tight">Z-Library</span>
                <span className="text-[7.5px] text-teal-400 font-mono mt-1 opacity-85">INFO CODIRE ↗</span>
              </a>
            </div>
          </div>

          {/* iPhone style home button strip bar */}
          <div className="w-24 h-1.5 bg-white/70 rounded-full mx-auto mt-6"></div>
        </div>
      </div>
    </div>
  );
};

// 5. TV BOX CARD
export const TvBoxCard: React.FC = () => {
  return (
    <div className="desk-card hover-rot-1" style={{ '--hover-rot': '1.5deg' } as any}>
      <div className="tv-box">
        <div className="tv-screen-container">
          <div className="tv-screen">
            {/* Rumore statico di sottofondo */}
            <div className="static"></div>
            
            {/* Contenuto dello Schermo */}
            <div className="flex flex-col items-center justify-center p-4 h-full relative z-10 select-none">
              
              {/* Titolo Canale Retro */}
              <span className="text-emerald-400 font-mono text-[10px] tracking-widest uppercase mb-3 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]">
                📺 MENU PROGETTI
              </span>
              
              {/* Lista di 5 canali (Collegamenti) */}
              <ul className="space-y-2 font-mono text-[11px] text-left w-full px-2">
                <li>
                  <a 
                    href="https://v-maker-studio.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-emerald-300 hover:text-white transition-colors duration-150 flex items-center gap-1 drop-shadow-[0_0_4px_rgba(52,211,153,0.5)]"
                  >
                    <span>📟</span> CH 01: V-MAKER
                  </a>
                </li>
                <li>
                  <a 
                    href="https://toonscriptstudio.netlify.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-emerald-300 hover:text-white transition-colors duration-150 flex items-center gap-1 drop-shadow-[0_0_4px_rgba(52,211,153,0.5)]"
                  >
                    <span>📟</span> CH 02: TOONSCRIPT
                  </a>
                </li>
                <li>
                  <a 
                    href="slide-text.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-emerald-300 hover:text-white transition-colors duration-150 flex items-center gap-1 drop-shadow-[0_0_4px_rgba(52,211,153,0.5)]"
                  >
                    <span>📟</span> CH 03: SLIDE TEXT
                  </a>
                </li>
                <li>
                  <a 
                    href="slide-con-immagini-e-testo.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-emerald-305 hover:text-white transition-colors duration-150 flex items-center gap-1 drop-shadow-[0_0_4px_rgba(52,211,153,0.5)]"
                  >
                    <span>📟</span> CH 04: SLIDE IMMAGINI
                  </a>
                </li>
                <li>
                  <a 
                    href="https://audio-edu-creator.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-emerald-300 hover:text-white transition-colors duration-150 flex items-center gap-1 drop-shadow-[0_0_4px_rgba(52,211,153,0.5)]"
                  >
                    <span>📟</span> CH 05: AUDIO EDU 
                  </a>
                </li>
              </ul>

              {/* Testo in sovrimpressione analogico */}
              <div className="overlay-text">CHANNEL 04</div>
            </div>
            
            {/* Effetti visivi CRT */}
            <div className="scanlines"></div>
            <div className="reflection"></div>
          </div>
        </div>
        
        {/* Componenti fisiche della TV */}
        <div className="tv-controls">
          <div className="dial-large"></div>
          <div className="dial-small"></div>
          <div className="vents"></div>
        </div>
      </div>
    </div>
  );
};

// 6. RETRO PERSONAL COMPUTER DEVICE CARD
export const RetroPcCard: React.FC = () => {
  return (
    <div className="desk-card hover-rot-1 lg:col-span-2 xl:col-span-2" style={{ '--hover-rot': '0.5deg' } as any}>
      <div className="p-4 bg-stone-900 border-4 border-stone-800 rounded-3xl shadow-2xl relative w-full overflow-hidden">
        {/* Retro monitor glowing status and knobs */}
        <div className="flex justify-between items-center px-1.5 mb-2.5">
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] text-zinc-400 font-mono tracking-wider">VINTAGE MONITOR SYSTEM v5.10</span>
          </div>
          <div className="flex gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-stone-750 shadow-inner border border-stone-800"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-stone-750 shadow-inner border border-stone-800"></div>
          </div>
        </div>

        {/* Sandbox iframe loading local retro-pc.html */}
        <iframe 
          src="retro-pc.html" 
          className="w-full h-[520px] rounded-2xl border-none"
          allow="autoplay; clipboard-write; encrypted-media"
          sandbox="allow-scripts allow-same-origin allow-forms"
          loading="lazy"
          title="La Mia Computer Classico"
        />

        <div className="text-[9px] text-stone-500 text-center font-mono mt-3 uppercase tracking-widest">
          📼 Retro Device Terminal Emulator - DOS Shell v5.10
        </div>
      </div>
    </div>
  );
};

// 7. MACOS VSCODE DEVTOOLS EDITOR CARD (CARD F)
export const VsCodeCard: React.FC = () => {
  return (
    <div className="desk-card card-editor hover-rot-1" style={{ '--hover-rot': '-1deg' } as any}>
      <div className="editor-header">
        <div className="mac-btn close"></div>
        <div className="mac-btn min"></div>
        <div className="mac-btn max"></div>
        <span className="text-[10px] text-stone-500 font-mono ml-2 mt-0.5">VS Code Lite</span>
      </div>
      <div className="p-4 font-mono text-xs">
        <div className="text-sky-400 font-bold mb-3">&lt;DevTools /&gt;</div>
        <ul className="space-y-2">
          <li className="flex items-center gap-1.5 text-stone-300">
            <span className="text-purple-400">import</span>
            <a href="https://scottino2019-glitch.github.io/web-designer/" target="_blank" rel="noopener noreferrer" className="text-amber-200 hover:underline">
              "Web Designer"
            </a>
          </li>
          <li className="flex items-center gap-1.5 text-stone-300">
            <span className="text-purple-400">import</span>
            <a href="https://htmlcssedit.netlify.app" target="_blank" rel="noopener noreferrer" className="text-amber-200 hover:underline">
              "Editor Html"
            </a>
          </li>
          <li className="flex items-center gap-1.5 text-stone-300">
            <span className="text-purple-400">import</span>
            <a href="https://tailwind-code-lab.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-amber-200 hover:underline">
              "Tailwind Coding"
            </a>
          </li>
          <li className="flex items-center gap-1.5 text-stone-300">
            <span className="text-purple-400">import</span>
            <a href="https://portofolio-pi-kohl.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-amber-200 hover:underline">
              "Portofolio"
            </a>
          </li>
          <li className="flex items-center gap-1.5 text-stone-300">
            <span className="text-purple-400">import</span>
            <a href="https://mini-ide.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-amber-200 hover:underline">
              "Mini Ide"
            </a>
          </li>
          <li className="flex items-center gap-1.5 text-stone-300">
            <span className="text-purple-400">import</span>
            <a href="https://div-generator.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-amber-200 hover:underline">
              "Div Generator"
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

// 8. MONITOR IFRAME FOR SNIPPET CREATOR (CARD G)
export const SnippetCreatorCard: React.FC = () => {
  return (
    <div className="desk-card hover-rot-1" style={{ '--hover-rot': '1deg' } as any}>
      <div className="p-3 bg-stone-900 border-4 border-stone-800 rounded-3xl shadow-2xl relative w-full overflow-hidden">
        {/* Retro monitor glowing line on top */}
        <div className="h-1.5 w-24 bg-teal-500 rounded-full mx-auto mb-2 opacity-80 animate-pulse"></div>
        <iframe 
          src="https://creatore-di-snippet.vercel.app/" 
          className="w-full h-[520px] rounded-2xl border-none"
          allow="clipboard-write"
          loading="lazy"
          title="Creatore di Card Snippet"
        />
        <div className="text-[9px] text-stone-500 text-center font-mono mt-2">MONITOR - SNIPPET GENERATOR</div>
      </div>
    </div>
  );
};

// 9. L'AGENDA CARD
export const AgendaCard: React.FC<StaticCardsProps> = ({ playSoundBlip }) => {
  return (
    <div className="desk-card card-agenda hover-rot-1" style={{ '--hover-rot': '1.5deg' } as any}>
      {/* Custom spiral loops */}
      <div className="agenda-rings">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="agenda-ring" />
        ))}
      </div>

      <h2 className="group-title">Utility & Ufficio</h2>
      <ul className="app-list">
        <li>
          <a 
            href="https://ufficio-personale.netlify.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => playSoundBlip(750, 'sine', 0.05)}
          >
            💼 Ufficio Personale
          </a>
        </li>
        <li>
          <a 
            href="https://editor-di-testo.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => playSoundBlip(750, 'sine', 0.05)}
          >
            📝 Editor di Testo Pro
          </a>
        </li>
        <li>
          <a 
            href="https://pdf-notepad.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => playSoundBlip(750, 'sine', 0.05)}
          >
            📑 Pdf Notepad
          </a>
        </li>
        <li>
          <a 
            href="https://pdf-editor-text.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => playSoundBlip(750, 'sine', 0.05)}
          >
            🗒 Pdf Editor Text
          </a>
        </li>
      </ul>
    </div>
  );
};

// 10. ALBUM CSS GRANDE
export const AlbumCssCard: React.FC<StaticCardsProps> = ({ playSoundBlip }) => {
  return (
    <div className="desk-card album-css-grande hover-rot-1" style={{ '--hover-rot': '-2deg' } as any}>
      {/* Effetti di disordine */}
      <div className="nastro-adesivo"></div>
      <div className="segnalibro-postit">ART</div>
      <div className="segnalibro-2"></div>

      <div className="etichetta-album">Bozze & Codice</div>
      <h3>CSS Artist</h3>
      <p className="Progetti-con-css">Progetti con css.</p>
      
      {/* LISTA DEI LINK AI TUOI PROGETTI */}
      <ul className="lista-progetti">
        <li>
          <a 
            href="https://graphic-atelier.netlify.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => playSoundBlip(800, 'sine', 0.05)}
          >
            Graphic Atelier
          </a>
        </li>
        <li>
          <a 
            href="https://comic-studio-five.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => playSoundBlip(800, 'sine', 0.05)}
          >
            Comix Studio
          </a>
        </li>
        <li>
          <a 
            href="https://analog-craft.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => playSoundBlip(800, 'sine', 0.05)}
          >
            AnalogCraft
          </a>
        </li>
        <li>
          <a 
            href="https://creative-card-code-editor.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => playSoundBlip(800, 'sine', 0.05)}
          >
            Creative Card
          </a>
        </li>
        <li>
          <a 
            href="https://hover-craft-tau.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => playSoundBlip(800, 'sine', 0.05)}
          >
            Hover Craft
          </a>
        </li>
        <li>
          <a 
            href="https://analogue-studio.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => playSoundBlip(800, 'sine', 0.05)}
          >
            Analogue Studio
          </a>
        </li>
        <li>
          <a 
            href="https://gliph-forge.netlify.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => playSoundBlip(800, 'sine', 0.05)}
          >
            Gliph Forge
          </a>
        </li>
      </ul>

      <a 
        href="https://artisan-studio-psi.vercel.app/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="btn-schizzo"
        onClick={() => playSoundBlip(950, 'sine', 0.06)}
      >
        + Crea Nuovo background
      </a>
    </div>
  );
};

// 11. PORTAL CARDS CARD
export const PortalCardsCard: React.FC = () => {
  return (
    <div className="desk-card hover-rot-1" style={{ '--hover-rot': '-1deg' } as any}>
      <div className="p-8 flex items-center justify-center min-h-full">
        <div className="relative w-[320px] h-[560px] rounded-3xl bg-[#ff8f95] p-4 overflow-hidden shadow-2xl">
          <div className="absolute top-20 -left-5 w-40 h-40 rounded-3xl bg-[#8fd5ff] [background-image:linear-gradient(#ffffff55_1px,transparent_1px),linear-gradient(90deg,#ffffff55_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="absolute bottom-10 -right-5 w-40 h-40 rounded-3xl bg-[#ffd57a] [background-image:linear-gradient(#ffffff55_1px,transparent_1px),linear-gradient(90deg,#ffffff55_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="relative w-full h-full bg-white rounded-2xl shadow-lg px-6 pt-6 pb-8 flex flex-col items-center justify-between">
            <div className="w-full flex items-center justify-between text-xs font-medium text-gray-700">
              <span>3/100</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 shadow-sm text-[10px] font-semibold text-gray-700">10"</div>
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 shadow-sm text-[10px] font-semibold text-gray-700">10"</div>
              </div>
            </div>
            
            <div className="relative flex flex-col items-start justify-center gap-2.5 my-auto w-full">
              <ul className="list-none space-y-1 text-sm text-gray-800 font-medium w-full">
                <li className="hover:translate-x-1.5 transition-transform duration-200">
                  <a href="generatore-card-orientali.html" className="text-gray-700 hover:text-red-500 flex items-center gap-1.5 font-bold">🧧 Creatore di Card Orientali</a>
                </li>
                <li className="hover:translate-x-1.5 transition-transform duration-200">
                  <a href="hanziBuilderPro.html" className="text-gray-700 hover:text-red-500 flex items-center gap-1.5 font-bold">㊗ Hanzi Builder Pro</a>
                </li>
                <li className="hover:translate-x-1.5 transition-transform duration-200">
                  <a href="https://le-app-studio.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-500 flex items-center gap-1.5 font-bold">🎓 App-Studio</a>
                </li>
                <li className="hover:translate-x-1.5 transition-transform duration-200">
                  <a href="https://whats-app-chat-designer.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-green-500 flex items-center gap-1.5 font-bold">🗯 ChatBuilder</a>
                </li>
                <li className="hover:translate-x-1.5 transition-transform duration-200">
                  <a href="https://grammar-creator.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-yellow-600 flex items-center gap-1.5 font-bold">📔 Grammar Creator</a>
                </li>
                <li className="hover:translate-x-1.5 transition-transform duration-200">
                  <a href="https://librocreator.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-orange-500 flex items-center gap-1.5 font-bold">📙 Libro Creator</a>
                </li>
                <li className="hover:translate-x-1.5 transition-transform duration-200">
                  <a href="https://flashcard-creator.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-indigo-500 flex items-center gap-1.5 font-bold">🎴 Flashcard Creator</a>
                </li>
                <li className="hover:translate-x-1.5 transition-transform duration-200">
                  <a href="https://linguaeditpro.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-purple-500 flex items-center gap-1.5 font-bold">🗣 Lingua Edit Pro</a>
                </li>
                <li className="hover:translate-x-1.5 transition-transform duration-200">
                  <a href="https://dialogue-creator.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-pink-500 flex items-center gap-1.5 font-bold">💬 Dialogue Creator</a>
                </li>
              </ul>
            </div>

            <div className="w-full flex items-center justify-between text-xs text-gray-500">
              <span className="text-[11px]">Tocca per ascoltare</span>
              <div className="flex gap-2">
                <div className="px-3 py-1.5 rounded-full bg-[#ff8f95] text-[11px] font-semibold text-white shadow-md cursor-pointer hover:opacity-90 active:scale-95 transition-all">Indietro</div>
                <div className="px-3 py-1.5 rounded-full bg-[#ffbd4a] text-[11px] font-semibold text-gray-900 shadow-md cursor-pointer hover:opacity-90 active:scale-95 transition-all">Avanti</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 12. RETRO CRT MONITOR PORTAL ENTRÈE (BIOS SYSTEM)
export const CrtMonitorCard: React.FC<StaticCardsProps> = ({ playSoundBlip }) => {
  return (
    <div className="desk-card hover-rot-1" style={{ '--hover-rot': '-1deg' } as any}>
      <div className="retro-pc-case">
        {/* Glowing CRT Glass Bezel Cover */}
        <div className="monitor-glass shadow-2xl">
          {/* Screen Scanlines Mesh */}
          <div className="crt-scanlines"></div>
          <div className="crt-flicker"></div>
          <div className="screen-glare"></div>
          
          {/* System Shell Prompt Header */}
          <div className="terminal-shell">
            <div className="sys-info font-mono">
              BIOS v4.12 - MEM: 640KB BASE OK
              <br />[CODELINK RETRO OS - CONSOLE ATTIVA]
            </div>
            
            {/* List of Hyperlinks in Matrix console screen */}
            <div className="console-entries mt-6">
              <div className="console-row">
                <span className="prompt-symbol">&gt;</span>
                <a 
                  href="Snake Arcade Retro.html" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="matrix-link font-bold"
                  onClick={() => playSoundBlip(600, 'triangle', 0.1)}
                >
                  🐍 Snake
                </a>
                <span className="status-label font-mono">[READY]</span>
              </div>
              
              <div className="console-row">
                <span className="prompt-symbol">&gt;</span>
                <a 
                  href="memory.html" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="matrix-link font-bold"
                  onClick={() => playSoundBlip(650, 'triangle', 0.1)}
                >
                  🃏 Memory
                </a>
                <span className="status-label font-mono">[READY]</span>
              </div>
              
              <div className="console-row">
                <span className="prompt-symbol">&gt;</span>
                <a 
                  href="type-invader.html" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="matrix-link font-bold"
                  onClick={() => playSoundBlip(700, 'triangle', 0.1)}
                >
                  🔠 Type Invaders
                </a>
                <span className="status-label font-mono">[STABLE]</span>
              </div>
              
              <div className="console-row">
                <span className="prompt-symbol">&gt;</span>
                <a 
                  href="campo-minato.html" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="matrix-link font-bold"
                  onClick={() => playSoundBlip(750, 'triangle', 0.1)}
                >
                  💣 Campo minato
                </a>
                <span className="status-label font-mono">[ONLINE]</span>
              </div>
            </div>
            
            {/* Interactive Input Prompt with blinking cursors */}
            <div className="active-prompt mt-5 font-mono">
              <span className="prompt-symbol">&gt;</span>
              <span className="typing-placeholder">SISTEMA PRONTO...</span>
              <span className="blinking-cursor">▒</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 13. ARTIST PALETTE WITH 6 LINKS (PENULTIMA CARD)
export const ArtistPaletteCard: React.FC<StaticCardsProps> = ({ playSoundBlip }) => {
  return (
    <div className="desk-card hover-rot-1" style={{ '--hover-rot': '-1.5deg' } as any}>
      <div className="app-group card-tavolozza">
        <h2 className="group-title">🎨 Foto Design</h2>
        <ul className="app-list">
          <li>
            <a 
              href="https://vector-sketch.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => playSoundBlip(800, 'sine', 0.05)}
            >
              Vector Sketch
            </a>
          </li>
          <li>
            <a 
              href="https://arty-scrapbook.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => playSoundBlip(820, 'sine', 0.05)}
            >
              Arty Scrapbook
            </a>
          </li>
          <li>
            <a 
              href="https://scrapbook-magic.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => playSoundBlip(840, 'sine', 0.05)}
            >
              Scrapbook magic
            </a>
          </li>
          <li>
            <a 
              href="https://stickers-creator.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => playSoundBlip(860, 'sine', 0.05)}
            >
              Stickers Creator
            </a>
          </li>
          <li>
            <a 
              href="https://artiscard.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => playSoundBlip(880, 'sine', 0.05)}
            >
              ArtisCard
            </a>
          </li>
          <li>
            <a 
              href="https://arte-libera-studio.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => playSoundBlip(900, 'sine', 0.05)}
            >
              ArteLibera Studio
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
