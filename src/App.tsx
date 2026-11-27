import { useMemo } from 'react';

import {
  IpodCard,
  RojiCard,
  LavagnaCard,
  SmartphoneCard,
  TvBoxCard,
  RetroPcCard,
  VsCodeCard,
  SnippetCreatorCard,
  AlbumCssCard,
  CrtMonitorCard,
  ArtistPaletteCard,
  PinkPdfNotebookCard,
  PolaroidCard,
  AppuntiVolantiCard,
} from './components/StaticCards';
import ComicLinksCard from './components/ComicLinksCard';
import PromoCardModal from './components/PromoCardModal';
import RetroCrtCard from './components/RetroCrtCard';
import RotoScopioAppsCard from './components/RotoScopioAppsCard';
import {
  ColorMarkersCard,
  TextEditorCard,
  JsonEditorCard,
  QuadernoEditorCard,
  PreferitiCard,
  AgendaCard,
  StickyNoteCard,
  FatCatCard,
  CuckooClockCard,
  CreativeFontCard,
} from './components/UtilityCards';

// =========================================
// TYPES & CONSTANTS
// =========================================
const DESK_EMOJIS = ['☕', '📎', '✏️', '📐', '✂️', '💡', '📌', '📚', '⌨️', '🖱️', '🎧', '🧮', '🖇️', '🗑️', '🖋️'];

// =========================================
// HELPER SYNTHESIZER SOUND BLIPS
// =========================================
const playSoundBlip = (freq: number, type: OscillatorType = 'triangle', duration = 0.08) => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Silently proceed if browser blocks audio
  }
};

export default function App() {
  // =========================================
  // RANDOM DESK BACKGROUND ELEMENTS (Stable)
  // =========================================
  const floatingEmojis = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => {
      const emoji = DESK_EMOJIS[Math.floor(Math.random() * DESK_EMOJIS.length)];
      const left = Math.random() * 95;
      const top = Math.random() * 95;
      const fontSize = Math.random() * 2.2 + 1.2;
      const rot = Math.random() * 360;
      const delay = -Math.random() * 20;
      return { id: i, emoji, left, top, fontSize, rot, delay };
    });
  }, []);

  return (
    <div className="relative min-h-screen py-[120px] px-4 md:px-8">
      {/* 1. BACKGROUND FLOATING FILL-GRAIN EMOJIS */}
      <div className="bg-emojis">
        {floatingEmojis.map(item => (
          <div
            key={item.id}
            className="bg-emoji"
            style={{
              left: `${item.left}vw`,
              top: `${item.top}vh`,
              fontSize: `${item.fontSize}rem`,
              animationDelay: `${item.delay}s`,
              transform: `rotate(${item.rot}deg)`,
              // Custom inline vars handled securely
              ['--rot' as any]: `${item.rot}deg`
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      {/* 2. MENU DOCK SUPERIORE GLASSMORPHISM */}
      <nav className="top-dock">
        <a href="https://androidmain.netlify.app/" target="_blank" rel="noopener noreferrer" className="dock-item android" data-tooltip="Ambiente Android">🤖</a>
        <a href="https://scuola-virtuale.netlify.app/" target="_blank" rel="noopener noreferrer" className="dock-item school" data-tooltip="Scuola Virtuale">🎓</a>
        <a href="pdf-home.html" target="_blank" rel="noopener noreferrer" className="dock-item eserciziario" data-tooltip="Pdf Home">✍</a>
        <a href="https://laboratorio-programmazione.vercel.app/" target="_blank" rel="noopener noreferrer" className="dock-item windows" data-tooltip="Ambiente Windows">🪟</a>
   <a href="https://mela-os.vercel.app/" target="_blank" rel="noopener noreferrer" className="dock-item apple" data-tooltip="IPad Scriba">🍎</a>
        <a href="https://photo-finder-kohl.vercel.app/" target="_blank" rel="noopener noreferrer" className="dock-item immagini" data-tooltip="Ricerca immagini">🖼</a>
        <a href="https://ricettario-internazionale.vercel.app/" target="_blank" rel="noopener noreferrer" className="dock-item ricettario" data-tooltip="Ricettario">🍳</a>
        <a href="https://film-finder-indol.vercel.app/" target="_blank" rel="noopener noreferrer" className="dock-item film" data-tooltip="Film">🎬</a>
        <a href="https://winamp-swart.vercel.app/" target="_blank" rel="noopener noreferrer" className="dock-item Musica" data-tooltip="Musica">🎧</a>
        <a href="https://ide-core.vercel.app/" target="_blank" rel="noopener noreferrer" className="dock-item Coding" data-tooltip="Edu Code">💻</a>
        <a href="https://tutor-programmazione.netlify.app/" target="_blank" rel="noopener noreferrer" className="dock-item Tutor" data-tooltip="Tutor">🖥</a>
        <a href="social.html" target="_blank" rel="noopener noreferrer" className="dock-item Social" data-tooltip="Social">👥</a>
        <a href="https://bunko-rho.vercel.app/" target="_blank" rel="noopener noreferrer" className="dock-item Editor" data-tooltip="Bunko">📝</a>
         <a href="https://playground-web-ten.vercel.app/" target="_blank" rel="noopener noreferrer" className="dock-item Playground" data-tooltip="Playground">🖲</a>
        <a href="https://code-editor-khaki-one.vercel.app/" target="_blank" rel="noopener noreferrer" className="dock-item Code-Editor" data-tooltip="Code-Editor">🖱</a>
        <a href="https://ufficio-virtuale.vercel.app/" target="_blank" rel="noopener noreferrer" className="dock-item Ufficio-Virtuale" data-tooltip="Ufficio-Virtuale">🧰</a>
          <a href="https://web-coding-study-studio.ai.studio/" target="_blank" rel="noopener noreferrer" className="dock-item LearnCode" data-tooltip="LearnCode">📱</a>
          <a href="BlogCraft.html" target="_blank" rel="noopener noreferrer" className="dock-item BlogCraft" data-tooltip="BlogCraft">🌐</a>
   
   

      </nav>

      {/* 3. HEADER AND SVG PATH VECTOR TEXT */}
      <header className="max-w-[1200px] mx-auto text-center mb-10 relative z-30">
        <div className="w-full flex justify-center mb-4">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100%" className="max-w-[1000px] h-auto block" height="150" viewBox="0 0 1604 180">
            <defs>
              <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity="0.35"/>
              </filter>
              <linearGradient id="grad-ext-0-I" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e91e63" />
                <stop offset="100%" stopColor="#9c27b0" />
              </linearGradient>
              <clipPath id="clip-ext-0-I">
                <path d="M30,10 H70 V26 H55 V74 H70 V90 H30 V74 H45 V26 H30 Z" />
              </clipPath>
              <linearGradient id="grad-ext-1-L" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7b2ff7" />
                <stop offset="100%" stopColor="#f107a3" />
              </linearGradient>
              <clipPath id="clip-ext-1-L">
                <path d="M20,10 H42 V70 H80 V90 H20 Z" />
              </clipPath>
              <linearGradient id="grad-ext-3-M" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a6ff00" />
                <stop offset="100%" stopColor="#00e676" />
              </linearGradient>
              <clipPath id="clip-ext-3-M">
                <path d="M15,10 H38 L50,42 L62,10 H85 V90 H65 V45 L55,75 H45 L35,45 V90 H15 Z" />
              </clipPath>
              <linearGradient id="grad-ext-4-I" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff9000" />
                <stop offset="100%" stopColor="#ff3d00" />
              </linearGradient>
              <clipPath id="clip-ext-4-I">
                <path d="M30,10 H70 V26 H55 V74 H70 V90 H30 V74 H45 V26 H30 Z" />
              </clipPath>
              <linearGradient id="grad-ext-5-O" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e91e63" />
                <stop offset="100%" stopColor="#9c27b0" />
              </linearGradient>
              <clipPath id="clip-ext-5-O">
                <path d="M50,10 Q85,10 85,50 Q85,90 50,90 Q15,90 15,50 Q15,10 50,10 Z M50,30 Q63,30 63,50 Q63,70 50,70 Q37,70 37,50 Q37,30 50,30 Z" />
              </clipPath>
              <linearGradient id="grad-ext-7-M" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fdd835" />
                <stop offset="100%" stopColor="#f57c00" />
              </linearGradient>
              <clipPath id="clip-ext-7-M">
                <path d="M15,10 H38 L50,42 L62,10 H85 V90 H65 V45 L55,75 H45 L35,45 V90 H15 Z" />
              </clipPath>
              <linearGradient id="grad-ext-8-U" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffeb3b" />
                <stop offset="100%" stopColor="#4caf50" />
              </linearGradient>
              <clipPath id="clip-ext-8-U">
                <path d="M15,10 H38 V62 Q38,72 50,72 Q62,72 62,62 V10 H85 V62 Q85,90 50,90 Q15,90 15,62 Z" />
              </clipPath>
              <linearGradient id="grad-ext-9-L" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00f2fe" />
                <stop offset="100%" stopColor="#4facfe" />
              </linearGradient>
              <clipPath id="clip-ext-9-L">
                <path d="M20,10 H42 V70 H80 V90 H20 Z" />
              </clipPath>
              <linearGradient id="grad-ext-10-T" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff3366" />
                <stop offset="100%" stopColor="#ff00cc" />
              </linearGradient>
              <clipPath id="clip-ext-10-T">
                <path d="M15,10 H85 V30 H62 V90 H38 V30 H15 Z" />
              </clipPath>
              <linearGradient id="grad-ext-11-I" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a6ff00" />
                <stop offset="100%" stopColor="#00e676" />
              </linearGradient>
              <clipPath id="clip-ext-11-I">
                <path d="M30,10 H70 V26 H55 V74 H70 V90 H30 V74 H45 V26 H30 Z" />
              </clipPath>
              <linearGradient id="grad-ext-12-V" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff416c" />
                <stop offset="100%" stopColor="#ff4b2b" />
              </linearGradient>
              <clipPath id="clip-ext-12-V">
                <path d="M12,10 H36 L50,66 L64,10 H88 L64,90 H36 Z" />
              </clipPath>
              <linearGradient id="grad-ext-13-E" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7b2ff7" />
                <stop offset="100%" stopColor="#f107a3" />
              </linearGradient>
              <clipPath id="clip-ext-13-E">
                <path d="M20,10 H80 V28 H46 V42 H74 V58 H46 V72 H80 V90 H20 Z" />
              </clipPath>
              <linearGradient id="grad-ext-14-R" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00f2fe" />
                <stop offset="100%" stopColor="#4facfe" />
              </linearGradient>
              <clipPath id="clip-ext-14-R">
                <path d="M18,10 H65 Q85,10 85,38 Q80,55 58,58 L85,90 H60 L38,62 H40 V90 H18 Z M40,24 H52 Q62,24 62,38 Q62,45 48,45 H40 Z" />
              </clipPath>
              <linearGradient id="grad-ext-15-S" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fdd835" />
                <stop offset="100%" stopColor="#f57c00" />
              </linearGradient>
              <clipPath id="clip-ext-15-S">
                <path d="M82,25 Q70,12 50,12 Q25,12 25,32 Q25,48 50,52 Q72,55 72,70 Q72,82 50,82 Q28,82 20,68 H42 Q45,70 52,70 Q60,70 60,60 Q60,53 45,50 Q20,44 20,28 Q20,10 50,10 Q80,10 85,25 Z" />
              </clipPath>
              <linearGradient id="grad-ext-16-O" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffeb3b" />
                <stop offset="100%" stopColor="#4caf50" />
              </linearGradient>
              <clipPath id="clip-ext-16-O">
                <path d="M50,10 Q85,10 85,50 Q85,90 50,90 Q15,90 15,50 Q15,10 50,10 Z M50,30 Q63,30 63,50 Q63,70 50,70 Q37,70 37,50 Q37,30 50,30 Z" />
              </clipPath>
            </defs>
            <rect width="100%" height="100%" fill="none" />
            <g filter="url(#shadow)">
              {/* letter I */}
              <g transform="translate(40, 48) rotate(-10, 50, 50)">
                <path d="M12,40 C-8,45 -12,20 -2,12 C2,22 8,30 12,40 Z M12,40 C-2,46 -4,55 0,60 C4,52 8,46 12,40 Z" fill="#2A1A4A" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M88,40 C108,45 112,20 102,12 C98,22 92,30 88,40 Z M88,40 C102,46 104,55 100,60 C96,52 92,46 88,40 Z" fill="#2A1A4A" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M25,12 C18,2 8,10 12,25 C16,20 22,17 25,12 Z" fill="url(#grad-ext-0-I)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M75,12 C82,2 92,10 88,25 C84,20 78,17 75,12 Z" fill="url(#grad-ext-0-I)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M30,10 H70 V26 H55 V74 H70 V90 H30 V74 H45 V26 H30 Z" fill="url(#grad-ext-0-I)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <g clipPath="url(#clip-ext-0-I)"></g>
                <g transform="translate(0, -20)">
                  <path d="M45,95 L50,78 L55,95 Z" fill="#ffffff" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
                  <path d="M32,92 L36,80 L40,92 Z" fill="#ffffff" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
                  <path d="M60,92 L64,80 L68,92 Z" fill="#ffffff" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
                </g>
                <g stroke="#1e0b20" strokeWidth="2.777" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="26" cy="10" r="9" fill="#ffffff" />
                  <circle cx="26" cy="8.5" r="4.05" fill="#1e0b20" />
                  <circle cx="23.75" cy="7.75" r="1.35" fill="#ffffff" stroke="none" />
                  <path d="M15,5.5 L37,1 L37,-2 L15,-2 Z" fill="currentColor" stroke="none" />
                </g>
                <g stroke="#1e0b20" strokeWidth="2.777" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="50" cy="2" r="12" fill="#ffffff" />
                  <circle cx="50" cy="0" r="5.4" fill="#1e0b20" />
                  <circle cx="47" cy="-1" r="1.8" fill="#ffffff" stroke="none" />
                  <path d="M36,-4 L64,-10 L64,-13 L36,-13 Z" fill="currentColor" stroke="none" />
                </g>
                <g stroke="#1e0b20" strokeWidth="2.777" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="74" cy="10" r="10" fill="#ffffff" />
                  <circle cx="74" cy="8.33" r="4.5" fill="#1e0b20" />
                  <circle cx="71.5" cy="7.5" r="1.5" fill="#ffffff" stroke="none" />
                  <path d="M62,5 L86,0 L86,-3 L62,-3 Z" fill="currentColor" stroke="none" />
                </g>
                <g stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round">
                  <path d="M 50 86 L 37 77 V 95 Z" fill="#ff296d" />
                  <path d="M 50 86 L 63 77 V 95 Z" fill="#ff296d" />
                  <circle cx="50" cy="86" r="4" fill="#f5ee30" stroke="#1e0b20" strokeWidth="2.5" />
                </g>
              </g>

              {/* letter L */}
              <g transform="translate(129, 34) rotate(6, 50, 50)">
                <path d="M20,10 H42 V70 H80 V90 H20 Z" fill="url(#grad-ext-1-L)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <g clipPath="url(#clip-ext-1-L)">
                  <circle cx="30" cy="30" r="6" fill="#000" opacity="0.15" />
                  <circle cx="75" cy="70" r="8" fill="#000" opacity="0.15" />
                  <circle cx="70" cy="25" r="4" fill="#000" opacity="0.15" />
                  <circle cx="25" cy="75" r="5" fill="#000" opacity="0.15" />
                </g>
                <g transform="translate(-20, 15)">
                  <path d="M38,5 Q38,18 43,18 Q45,15 45,5 Z" fill="#ffffff" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
                  <path d="M62,5 Q62,18 57,18 Q55,15 55,5 Z" fill="#ffffff" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
                </g>
                <g stroke="#1e0b20" strokeWidth="2.777" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="34" cy="6" r="11" fill="#ffffff" />
                  <circle cx="34" cy="6" r="4.95" fill="#1e0b20" />
                  <circle cx="31.25" cy="3.25" r="1.65" fill="#ffffff" stroke="none" />
                </g>
                <g stroke="#1e0b20" strokeWidth="2.777" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="66" cy="4" r="12" fill="#ffffff" />
                  <circle cx="66" cy="4" r="5.4" fill="#1e0b20" />
                  <circle cx="63" cy="1" r="1.8" fill="#ffffff" stroke="none" />
                </g>
                <g stroke="#1e0b20" strokeWidth="3.2" fill="none" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="16" cy="59" r="10.5" />
                  <circle cx="44" cy="59" r="10.5" />
                  <line x1="26.5" y1="59" x2="33.5" y2="59" />
                  <path d="M 5.5 59 Q -1 55 -7 63" />
                  <path d="M 54.5 59 Q 61 55 67 63" />
                </g>
              </g>

              {/* letter M */}
              <g transform="translate(307, 32) rotate(8, 50, 50)">
                <path d="M18,18 Q5,5 2,22 Q5,28 15,22 Z" fill="url(#grad-ext-3-M)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M82,18 Q95,5 98,22 Q95,28 85,22 Z" fill="url(#grad-ext-3-M)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M15,10 H38 L50,42 L62,10 H85 V90 H65 V45 L55,75 H45 L35,45 V90 H15 Z" fill="url(#grad-ext-3-M)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <g clipPath="url(#clip-ext-3-M)"></g>
                <g transform="translate(0, 5)">
                  <path d="M30,5 L35,16 L40,5 L45,16 L50,5 L55,16 L65,5 L70,16 L75,5" fill="none" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
                </g>
                <g stroke="#1e0b20" strokeWidth="2.777" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="34" cy="6" r="11" fill="#ffffff" />
                  <circle cx="36.75" cy="9.66" r="4.95" fill="#1e0b20" />
                  <circle cx="31.25" cy="3.25" r="1.65" fill="#ffffff" stroke="none" />
                </g>
                <g stroke="#1e0b20" strokeWidth="2.777" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="66" cy="4" r="12" fill="#ffffff" />
                  <circle cx="62" cy="8" r="5.4" fill="#1e0b20" />
                  <circle cx="63" cy="1" r="1.8" fill="#ffffff" stroke="none" />
                </g>
                <g stroke="#1e0b20" strokeWidth="0.8" strokeLinejoin="round" strokeLinecap="round">
                  <path d="M 50 61 Q 37 57 30 64 Q 40 67 50 62.5 Q 60 67 70 64 Q 63 57 50 61 Z" fill="#1e0b20" />
                </g>
                <path d="M25,85 Q25,102 22,102 Q19,102 19,85 Z" fill="url(#grad-ext-3-M)" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" opacity="0.9" />
                <path d="M50,83 Q50,110 46,110 Q42,110 42,83 Z" fill="url(#grad-ext-3-M)" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" opacity="0.9" />
                <path d="M75,85 Q75,100 72,100 Q69,100 69,85 Z" fill="url(#grad-ext-3-M)" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" opacity="0.9" />
              </g>

              {/* letter I */}
              <g transform="translate(396, 45) rotate(-7, 50, 50)">
                <path d="M35,10 L50,-4 L65,10 Z" fill="url(#grad-ext-4-I)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M15,18 L26,8 L37,18 Z" fill="url(#grad-ext-4-I)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M63,18 L74,8 L85,18 Z" fill="url(#grad-ext-4-I)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M30,10 H70 V26 H55 V74 H70 V90 H30 V74 H45 V26 H30 Z" fill="url(#grad-ext-4-I)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <g clipPath="url(#clip-ext-4-I)"></g>
                <g transform="translate(0, -22)">
                  <path d="M40,90 Q50,70 60,90 Q50,95 40,90 Z" fill="#ff4081" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
                </g>
                <g stroke="#1e0b20" strokeWidth="2.777" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="50" cy="4" r="14" fill="#ffffff" />
                  <circle cx="50" cy="4" r="6.3" fill="#1e0b20" />
                  <circle cx="46.5" cy="0.5" r="2.1" fill="#ffffff" stroke="none" />
                </g>
                <path d="M80,80 Q98,82 105,72 Q112,62 102,55 Q96,51 90,62 Q85,72 80,80 Z" fill="url(#grad-ext-4-I)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M101,58 L108,52 L103,64 Z" fill="#ffeb3b" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M106,66 L113,63 L107,71 Z" fill="#ffeb3b" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
              </g>

              {/* letter O */}
              <g transform="translate(485, 30) rotate(9, 50, 50)">
                <path d="M12,40 C-8,45 -12,20 -2,12 C2,22 8,30 12,40 Z M12,40 C-2,46 -4,55 0,60 C4,52 8,46 12,40 Z" fill="#2A1A4A" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M88,40 C108,45 112,20 102,12 C98,22 92,30 88,40 Z M88,40 C102,46 104,55 100,60 C96,52 92,46 88,40 Z" fill="#2A1A4A" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M50,10 Q85,10 85,50 Q85,90 50,90 Q15,90 15,50 Q15,10 50,10 Z M50,30 Q63,30 63,50 Q63,70 50,70 Q37,70 37,50 Q37,30 50,30 Z" fill="url(#grad-ext-5-O)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <g clipPath="url(#clip-ext-5-O)"></g>
                <g transform="translate(0, -20)">
                  <path d="M45,95 L50,78 L55,95 Z" fill="#ffffff" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
                  <path d="M32,92 L36,80 L40,92 Z" fill="#ffffff" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
                  <path d="M60,92 L64,80 L68,92 Z" fill="#ffffff" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
                </g>
                <g stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round">
                  <path d="M 50 86 L 37 77 V 95 Z" fill="#ff296d" />
                  <path d="M 50 86 L 63 77 V 95 Z" fill="#ff296d" />
                  <circle cx="50" cy="86" r="4" fill="#f5ee30" stroke="#1e0b20" strokeWidth="2.5" />
                </g>
              </g>

              {/* letter M */}
              <g transform="translate(663, 36) rotate(8, 50, 50)">
                <path d="M35,10 Q28,-5 34,-12 Q40,-12 40,-5 L41,10 Z" fill="url(#grad-ext-7-M)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M65,10 Q72,-5 66,-12 Q60,-12 60,-5 L59,10 Z" fill="url(#grad-ext-7-M)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <circle cx="34" cy="-11" r="4" fill="#fff" stroke="#1e0b20" strokeWidth="2.5" />
                <circle cx="33.5" cy="-11" r="1.8" fill="#1e0b20" />
                <circle cx="66" cy="-11" r="4" fill="#fff" stroke="#1e0b20" strokeWidth="2.5" />
                <circle cx="65.5" cy="-11" r="1.8" fill="#1e0b20" />
                <path d="M15,10 H38 L50,42 L62,10 H85 V90 H65 V45 L55,75 H45 L35,45 V90 H15 Z" fill="url(#grad-ext-7-M)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <g clipPath="url(#clip-ext-7-M)">
                  <circle cx="30" cy="30" r="6" fill="#000" opacity="0.15" />
                  <circle cx="75" cy="70" r="8" fill="#000" opacity="0.15" />
                  <circle cx="70" cy="25" r="4" fill="#000" opacity="0.15" />
                  <circle cx="25" cy="75" r="5" fill="#000" opacity="0.15" />
                </g>
                <g transform="translate(0, -22)">
                  <path d="M40,90 Q50,70 60,90 Q50,95 40,90 Z" fill="#ff4081" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
                </g>
                <g stroke="#1e0b20" strokeWidth="2.777" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="26" cy="10" r="9" fill="#ffffff" />
                  <circle cx="25.1" cy="9.1" r="4.05" fill="#1e0b20" />
                  <circle cx="23" cy="7" r="1.8" fill="#ffffff" stroke="none" />
                  <circle cx="28.25" cy="12.25" r="0.9" fill="#ffffff" stroke="none" />
                  <line x1="18.8" y1="5.5" x2="15.2" y2="1.9" stroke="#1e0b20" strokeWidth="2.777" />
                  <line x1="33.2" y1="5.5" x2="36.8" y2="1.9" stroke="#1e0b20" strokeWidth="2.777" />
                </g>
                <g stroke="#1e0b20" strokeWidth="2.777" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="50" cy="2" r="12" fill="#ffffff" />
                  <circle cx="48.8" cy="0.8" r="5.4" fill="#1e0b20" />
                  <circle cx="46" cy="-2" r="2.4" fill="#ffffff" stroke="none" />
                  <circle cx="53" cy="5" r="1.2" fill="#ffffff" stroke="none" />
                  <line x1="40.4" y1="-4" x2="35.6" y2="-8.8" stroke="#1e0b20" strokeWidth="2.777" />
                  <line x1="59.6" y1="-4" x2="64.4" y2="-8.8" stroke="#1e0b20" strokeWidth="2.777" />
                </g>
                <g stroke="#1e0b20" strokeWidth="2.777" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="74" cy="10" r="10" fill="#ffffff" />
                  <circle cx="73" cy="9" r="4.5" fill="#1e0b20" />
                  <circle cx="70.66" cy="6.66" r="2" fill="#ffffff" stroke="none" />
                  <circle cx="76.5" cy="12.5" r="1" fill="#ffffff" stroke="none" />
                  <line x1="66" y1="5" x2="62" y2="1" stroke="#1e0b20" strokeWidth="2.777" />
                  <line x1="82" y1="5" x2="86" y2="1" stroke="#1e0b20" strokeWidth="2.777" />
                </g>
                <g opacity="0.65">
                  <ellipse cx="32" cy="58" rx="6.5" ry="3.5" fill="#ff4081" stroke="none" />
                  <ellipse cx="68" cy="58" rx="6.5" ry="3.5" fill="#ff4081" stroke="none" />
                </g>
              </g>

              {/* letter U */}
              <g transform="translate(752, 50) rotate(-12, 50, 50)">
                <path d="M35,10 L50,-4 L65,10 Z" fill="url(#grad-ext-8-U)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M15,18 L26,8 L37,18 Z" fill="url(#grad-ext-8-U)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M63,18 L74,8 L85,18 Z" fill="url(#grad-ext-8-U)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M15,10 H38 V62 Q38,72 50,72 Q62,72 62,62 V10 H85 V62 Q85,90 50,90 Q15,90 15,62 Z" fill="url(#grad-ext-8-U)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <g clipPath="url(#clip-ext-8-U)"></g>
                <g transform="translate(0, 0)">
                  <path d="M30,5 L35,16 L40,5 L45,16 L50,5 L55,16 L65,5 L70,16 L75,5" fill="none" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
                </g>
                <g stroke="#1e0b20" strokeWidth="2.777" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="34" cy="6" r="11" fill="#ffffff" />
                  <circle cx="30.33" cy="9.66" r="4.95" fill="#1e0b20" />
                  <circle cx="31.25" cy="3.25" r="1.65" fill="#ffffff" stroke="none" />
                </g>
                <g stroke="#1e0b20" strokeWidth="2.777" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="66" cy="4" r="12" fill="#ffffff" />
                  <circle cx="69" cy="8" r="5.4" fill="#1e0b20" />
                  <circle cx="63" cy="1" r="1.8" fill="#ffffff" stroke="none" />
                </g>
                <g stroke="#1e0b20" strokeWidth="0.8" strokeLinejoin="round" strokeLinecap="round">
                  <path d="M 50 56 Q 37 52 30 59 Q 40 62 50 57.5 Q 60 62 70 59 Q 63 52 50 56 Z" fill="#1e0b20" />
                </g>
                <path d="M80,80 Q98,82 105,72 Q112,62 102,55 Q96,51 90,62 Q85,72 80,80 Z" fill="url(#grad-ext-8-U)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M101,58 L108,52 L103,64 Z" fill="#ffeb3b" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M106,66 L113,63 L107,71 Z" fill="#ffeb3b" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
              </g>

              {/* letter L */}
              <g transform="translate(841, 32) rotate(5, 50, 50)">
                <path d="M12,40 C-8,45 -12,20 -2,12 C2,22 8,30 12,40 Z M12,40 C-2,46 -4,55 0,60 C4,52 8,46 12,40 Z" fill="#2A1A4A" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M88,40 C108,45 112,20 102,12 C98,22 92,30 88,40 Z M88,40 C102,46 104,55 100,60 C96,52 92,46 88,40 Z" fill="#2A1A4A" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M18,18 Q5,5 2,22 Q5,28 15,22 Z" fill="url(#grad-ext-9-L)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M82,18 Q95,5 98,22 Q95,28 85,22 Z" fill="url(#grad-ext-9-L)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M20,10 H42 V70 H80 V90 H20 Z" fill="url(#grad-ext-9-L)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <g clipPath="url(#clip-ext-9-L)"></g>
                <g stroke="#1e0b20" strokeWidth="2.777" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="50" cy="4" r="14" fill="#ffffff" />
                  <circle cx="50" cy="4" r="6.3" fill="#1e0b20" />
                  <circle cx="46.5" cy="0.5" r="2.1" fill="#ffffff" stroke="none" />
                </g>
              </g>

              {/* letter T */}
              <g transform="translate(930, 46) rotate(-6, 50, 50)">
                <path d="M15,10 H85 V30 H62 V90 H38 V30 H15 Z" fill="url(#grad-ext-10-T)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <g clipPath="url(#clip-ext-10-T)">
                  <path d="M35,35 Q40,40 45,35 M50,45 Q55,50 60,45 M30,55 Q35,60 40,55" fill="none" stroke="#1e0b20" strokeOpacity="0.25" strokeWidth="2.5" />
                </g>
                <g transform="translate(0, -50)">
                  <path d="M45,95 L50,78 L55,95 Z" fill="#ffffff" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
                  <path d="M32,92 L36,80 L40,92 Z" fill="#ffffff" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
                  <path d="M60,92 L64,80 L68,92 Z" fill="#ffffff" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
                </g>
                <g stroke="#1e0b20" strokeWidth="2.777" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="34" cy="6" r="11" fill="#ffffff" />
                  <circle cx="30.33" cy="9.66" r="4.95" fill="#1e0b20" />
                  <circle cx="31.25" cy="3.25" r="1.65" fill="#ffffff" stroke="none" />
                </g>
                <g stroke="#1e0b20" strokeWidth="2.777" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="66" cy="4" r="12" fill="#ffffff" />
                  <circle cx="69" cy="8" r="5.4" fill="#1e0b20" />
                  <circle cx="63" cy="1" r="1.8" fill="#ffffff" stroke="none" />
                </g>
                <g stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round">
                  <path d="M 50 86 L 37 77 V 95 Z" fill="#ff296d" />
                  <path d="M 50 86 L 63 77 V 95 Z" fill="#ff296d" />
                  <circle cx="50" cy="86" r="4" fill="#f5ee30" stroke="#1e0b20" strokeWidth="2.5" />
                </g>
              </g>

              {/* letter I */}
              <g transform="translate(1019, 40) rotate(6, 50, 50)">
                <path d="M25,12 C18,2 8,10 12,25 C16,20 22,17 25,12 Z" fill="url(#grad-ext-11-I)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M75,12 C82,2 92,10 88,25 C84,20 78,17 75,12 Z" fill="url(#grad-ext-11-I)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M30,10 H70 V26 H55 V74 H70 V90 H30 V74 H45 V26 H30 Z" fill="url(#grad-ext-11-I)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <g clipPath="url(#clip-ext-11-I)"></g>
                <g transform="translate(0, -22)">
                  <path d="M40,90 Q50,70 60,90 Q50,95 40,90 Z" fill="#ff4081" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
                </g>
                <g stroke="#1e0b20" strokeWidth="2.777" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="50" cy="4" r="14" fill="#ffffff" />
                  <circle cx="50" cy="4" r="6.3" fill="#1e0b20" />
                  <circle cx="46.5" cy="0.5" r="2.1" fill="#ffffff" stroke="none" />
                </g>
                <g opacity="0.65">
                  <ellipse cx="32" cy="58" rx="6.5" ry="3.5" fill="#ff4081" stroke="none" />
                  <ellipse cx="68" cy="58" rx="6.5" ry="3.5" fill="#ff4081" stroke="none" />
                </g>
                <path d="M80,80 Q98,82 105,72 Q112,62 102,55 Q96,51 90,62 Q85,72 80,80 Z" fill="url(#grad-ext-11-I)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M101,58 L108,52 L103,64 Z" fill="#ffeb3b" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M106,66 L113,63 L107,71 Z" fill="#ffeb3b" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
              </g>

              {/* letter V */}
              <g transform="translate(1108, 34) rotate(-6, 50, 50)">
                <path d="M12,40 C-8,45 -12,20 -2,12 C2,22 8,30 12,40 Z M12,40 C-2,46 -4,55 0,60 C4,52 8,46 12,40 Z" fill="#2A1A4A" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M88,40 C108,45 112,20 102,12 C98,22 92,30 88,40 Z M88,40 C102,46 104,55 100,60 C96,52 92,46 88,40 Z" fill="#2A1A4A" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M18,18 Q5,5 2,22 Q5,28 15,22 Z" fill="url(#grad-ext-12-V)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M82,18 Q95,5 98,22 Q95,28 85,22 Z" fill="url(#grad-ext-12-V)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M12,10 H36 L50,66 L64,10 H88 L64,90 H36 Z" fill="url(#grad-ext-12-V)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <g clipPath="url(#clip-ext-12-V)"></g>
                <g stroke="#1e0b20" strokeWidth="2.777" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="26" cy="10" r="9" fill="#ffffff" />
                  <circle cx="26" cy="8.5" r="4.05" fill="#1e0b20" />
                  <circle cx="23.75" cy="7.75" r="1.35" fill="#ffffff" stroke="none" />
                  <path d="M15,5.5 L37,1 L37,-2 L15,-2 Z" fill="currentColor" stroke="none" />
                </g>
                <g stroke="#1e0b20" strokeWidth="2.777" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="50" cy="2" r="12" fill="#ffffff" />
                  <circle cx="50" cy="0" r="5.4" fill="#1e0b20" />
                  <circle cx="47" cy="-1" r="1.8" fill="#ffffff" stroke="none" />
                  <path d="M36,-4 L64,-10 L64,-13 L36,-13 Z" fill="currentColor" stroke="none" />
                </g>
                <g stroke="#1e0b20" strokeWidth="2.777" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="74" cy="10" r="10" fill="#ffffff" />
                  <circle cx="74" cy="8.33" r="4.5" fill="#1e0b20" />
                  <circle cx="71.5" cy="7.5" r="1.5" fill="#ffffff" stroke="none" />
                  <path d="M62,5 L86,0 L86,-3 L62,-3 Z" fill="currentColor" stroke="none" />
                </g>
              </g>

              {/* letter E */}
              <g transform="translate(1197, 46) rotate(6, 50, 50)">
                <path d="M35,10 L50,-4 L65,10 Z" fill="url(#grad-ext-13-E)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M15,18 L26,8 L37,18 Z" fill="url(#grad-ext-13-E)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M63,18 L74,8 L85,18 Z" fill="url(#grad-ext-13-E)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M20,10 H80 V28 H46 V42 H74 V58 H46 V72 H80 V90 H20 Z" fill="url(#grad-ext-13-E)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <g clipPath="url(#clip-ext-13-E)"></g>
                <g transform="translate(-20, 5)">
                  <path d="M38,5 Q38,18 43,18 Q45,15 45,5 Z" fill="#ffffff" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
                  <path d="M62,5 Q62,18 57,18 Q55,15 55,5 Z" fill="#ffffff" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
                </g>
                <g stroke="#1e0b20" strokeWidth="2.777" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="34" cy="6" r="11" fill="#ffffff" />
                  <circle cx="32.9" cy="4.9" r="4.95" fill="#1e0b20" />
                  <circle cx="30.33" cy="2.33" r="2.2" fill="#ffffff" stroke="none" />
                  <circle cx="36.75" cy="8.75" r="1.1" fill="#ffffff" stroke="none" />
                  <line x1="25.2" y1="0.5" x2="20.8" y2="-3.9" stroke="#1e0b20" strokeWidth="2.777" />
                  <line x1="42.8" y1="0.5" x2="47.2" y2="-3.9" stroke="#1e0b20" strokeWidth="2.777" />
                </g>
                <g stroke="#1e0b20" strokeWidth="2.777" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="66" cy="4" r="12" fill="#ffffff" />
                  <circle cx="64.8" cy="2.8" r="5.4" fill="#1e0b20" />
                  <circle cx="62" cy="0" r="2.4" fill="#ffffff" stroke="none" />
                  <circle cx="69" cy="7" r="1.2" fill="#ffffff" stroke="none" />
                  <line x1="56.4" y1="-2" x2="51.6" y2="-6.8" stroke="#1e0b20" strokeWidth="2.777" />
                  <line x1="75.6" y1="-2" x2="80.4" y2="-6.8" stroke="#1e0b20" strokeWidth="2.777" />
                </g>
                <g stroke="#1e0b20" strokeWidth="3.2" fill="none" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="16" cy="49" r="10.5" />
                  <circle cx="44" cy="49" r="10.5" />
                  <line x1="26.5" y1="49" x2="33.5" y2="49" />
                  <path d="M 5.5 49 Q -1 45 -7 53" />
                  <path d="M 54.5 49 Q 61 45 67 53" />
                </g>
              </g>

              {/* letter R */}
              <g transform="translate(1286, 40) rotate(-6, 50, 50)">
                <path d="M40,12 L43,2 L50,8 L57,2 L60,12 Z" fill="#ffea00" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M18,10 H65 Q85,10 85,38 Q80,55 58,58 L85,90 H60 L38,62 H40 V90 H18 Z M40,24 H52 Q62,24 62,38 Q62,45 48,45 H40 Z" fill="url(#grad-ext-14-R)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <g clipPath="url(#clip-ext-14-R)"></g>
                <g transform="translate(1, -9)">
                  <path d="M30,5 L35,16 L40,5 L45,16 L50,5 L55,16 L65,5 L70,16 L75,5" fill="none" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
                </g>
                <g stroke="#1e0b20" strokeWidth="2.777" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="50" cy="4" r="14" fill="#ffffff" />
                  <circle cx="50" cy="4" r="6.3" fill="#1e0b20" />
                  <circle cx="46.5" cy="0.5" r="2.1" fill="#ffffff" stroke="none" />
                </g>
                <g stroke="#1e0b20" strokeWidth="0.8" strokeLinejoin="round" strokeLinecap="round">
                  <path d="M 51 47 Q 38 43 31 50 Q 41 53 51 48.5 Q 61 53 71 50 Q 64 43 51 47 Z" fill="#1e0b20" />
                </g>
                <path d="M25,85 Q25,102 22,102 Q19,102 19,85 Z" fill="url(#grad-ext-14-R)" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" opacity="0.9" />
                <path d="M50,83 Q50,110 46,110 Q42,110 42,83 Z" fill="url(#grad-ext-14-R)" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" opacity="0.9" />
                <path d="M75,85 Q75,100 72,100 Q69,100 69,85 Z" fill="url(#grad-ext-14-R)" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" opacity="0.9" />
              </g>

              {/* letter S */}
              <g transform="translate(1375, 34) rotate(6, 50, 50)">
                <path d="M35,10 Q28,-5 34,-12 Q40,-12 40,-5 L41,10 Z" fill="url(#grad-ext-15-S)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M65,10 Q72,-5 66,-12 Q60,-12 60,-5 L59,10 Z" fill="url(#grad-ext-15-S)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <circle cx="34" cy="-11" r="4" fill="#fff" stroke="#1e0b20" strokeWidth="2.5" />
                <circle cx="33.5" cy="-11" r="1.8" fill="#1e0b20" />
                <circle cx="66" cy="-11" r="4" fill="#fff" stroke="#1e0b20" strokeWidth="2.5" />
                <circle cx="65.5" cy="-11" r="1.8" fill="#1e0b20" />
                <path d="M82,25 Q70,12 50,12 Q25,12 25,32 Q25,48 50,52 Q72,55 72,70 Q72,82 50,82 Q28,82 20,68 H42 Q45,70 52,70 Q60,70 60,60 Q60,53 45,50 Q20,44 20,28 Q20,10 50,10 Q80,10 85,25 Z" fill="url(#grad-ext-15-S)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <g clipPath="url(#clip-ext-15-S)">
                  <circle cx="30" cy="30" r="6" fill="#000" opacity="0.15" />
                  <circle cx="75" cy="70" r="8" fill="#000" opacity="0.15" />
                  <circle cx="70" cy="25" r="4" fill="#000" opacity="0.15" />
                  <circle cx="25" cy="75" r="5" fill="#000" opacity="0.15" />
                </g>
                <g transform="translate(0, -20)">
                  <path d="M45,95 L50,78 L55,95 Z" fill="#ffffff" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
                  <path d="M32,92 L36,80 L40,92 Z" fill="#ffffff" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
                  <path d="M60,92 L64,80 L68,92 Z" fill="#ffffff" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
                </g>
                <g stroke="#1e0b20" strokeWidth="2.777" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="34" cy="6" r="11" fill="#ffffff" />
                  <circle cx="36.75" cy="9.66" r="4.95" fill="#1e0b20" />
                  <circle cx="31.25" cy="3.25" r="1.65" fill="#ffffff" stroke="none" />
                </g>
                <g stroke="#1e0b20" strokeWidth="2.777" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="66" cy="4" r="12" fill="#ffffff" />
                  <circle cx="62" cy="8" r="5.4" fill="#1e0b20" />
                  <circle cx="63" cy="1" r="1.8" fill="#ffffff" stroke="none" />
                </g>
                <g stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round">
                  <path d="M 50 86 L 37 77 V 95 Z" fill="#ff296d" />
                  <path d="M 50 86 L 63 77 V 95 Z" fill="#ff296d" />
                  <circle cx="50" cy="86" r="4" fill="#f5ee30" stroke="#1e0b20" strokeWidth="2.5" />
                </g>
              </g>

              {/* letter O */}
              <g transform="translate(1464, 46) rotate(-6, 50, 50)">
                <path d="M50,10 Q85,10 85,50 Q85,90 50,90 Q15,90 15,50 Q15,10 50,10 Z M50,30 Q63,30 63,50 Q63,70 50,70 Q37,70 37,50 Q37,30 50,30 Z" fill="url(#grad-ext-16-O)" stroke="#1e0b20" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <g clipPath="url(#clip-ext-16-O)">
                  <path d="M35,35 Q40,40 45,35 M50,45 Q55,50 60,45 M30,55 Q35,60 40,55" fill="none" stroke="#1e0b20" strokeOpacity="0.25" strokeWidth="2.5" />
                </g>
                <g transform="translate(0, -22)">
                  <path d="M40,90 Q50,70 60,90 Q50,95 40,90 Z" fill="#ff4081" stroke="#1e0b20" strokeWidth="3.333" strokeLinejoin="round" strokeLinecap="round" />
                </g>
                <g stroke="#1e0b20" strokeWidth="2.777" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="50" cy="4" r="14" fill="#ffffff" />
                  <circle cx="50" cy="4" r="6.3" fill="#1e0b20" />
                  <circle cx="46.5" cy="0.5" r="2.1" fill="#ffffff" stroke="none" />
                </g>
                <g opacity="0.65">
                  <ellipse cx="32" cy="58" rx="6.5" ry="3.5" fill="#ff4081" stroke="none" />
                  <ellipse cx="68" cy="58" rx="6.5" ry="3.5" fill="#ff4081" stroke="none" />
                </g>
              </g>
            </g>
          </svg>
        </div>
        <p className="header-subtitle mt-2">
          Tutti i miei progetti raccolti sulla mia scrivania digitale.
        </p>
      </header>

      {/* 4. MAIN DESK LAYOUT: 4 colonne compatte senza spazi vuoti, con iPod e utility in primo piano */}
      <main className="main-content">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start [&_.desk-card]:!mb-0">
          {/* COLONNA 1: iPod in primo piano + strumenti principali */}
          <div className="flex flex-col gap-6">
            <IpodCard />
            <JsonEditorCard playSoundBlip={playSoundBlip} />
            <AgendaCard playSoundBlip={playSoundBlip} />
            <LavagnaCard />
            <CuckooClockCard playSoundBlip={playSoundBlip} />
            <ArtistPaletteCard playSoundBlip={playSoundBlip} />
            <CreativeFontCard />
          </div>

          {/* COLONNA 2: Editor di testo piccolo in primo piano + Note Volanti */}
          <div className="flex flex-col gap-6">
            <TextEditorCard playSoundBlip={playSoundBlip} />
            <AppuntiVolantiCard playSoundBlip={playSoundBlip} />
            <div className="desk-card">
              <ComicLinksCard />
            </div>
            <RojiCard />
            <PolaroidCard playSoundBlip={playSoundBlip} />
            <TvBoxCard />
            <div className="desk-card flex justify-center">
              <RotoScopioAppsCard />
            </div>
          </div>

          {/* COLONNA 3: Preferiti in primo piano + Quaderno Editor.html */}
          <div className="flex flex-col gap-6">
            <PreferitiCard playSoundBlip={playSoundBlip} />
            <QuadernoEditorCard />
            <SmartphoneCard playSoundBlip={playSoundBlip} />
            <AlbumCssCard playSoundBlip={playSoundBlip} />
            <StickyNoteCard playSoundBlip={playSoundBlip} />
            <div className="desk-card flex justify-center">
              <RetroCrtCard />
            </div>
            <div className="desk-card flex justify-center">
              <PromoCardModal />
            </div>
          </div>

          {/* COLONNA 4: Quaderno Pink in primo piano + dispositivi & studio */}
          <div className="flex flex-col gap-6">
            <PinkPdfNotebookCard playSoundBlip={playSoundBlip} />
            <RetroPcCard />
            <SnippetCreatorCard />
            <FatCatCard playSoundBlip={playSoundBlip} />
            <ColorMarkersCard playSoundBlip={playSoundBlip} />
            <CrtMonitorCard playSoundBlip={playSoundBlip} />
            <VsCodeCard />
          </div>
        </div>
      </main>
    </div>
  );
}




          

         
         


