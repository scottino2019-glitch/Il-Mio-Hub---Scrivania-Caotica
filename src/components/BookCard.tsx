import React, { useState } from 'react';
import {
  BookOpen,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  ChevronLeft,
  Feather,
  Quote,
  ExternalLink,
} from 'lucide-react';

interface BookChapter {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  excerpt: string;
  pageNumber: number;
  note: string;
  appName: string; // Nome dell'applicazione esterna
  appUrl: string;  // Link/URL per aprire l'applicazione
}

const CHAPTERS: BookChapter[] = [
  {
    id: 1,
    number: 'APP I',
    title: 'L’Origine della Forma',
    subtitle: 'Manifesto sull’estetica delle geometrie pure',
    excerpt:
      '«Non v’è bellezza senza rigore matematico, né arte senza il coraggio di rompere il rettangolo comune. Ogni curva racchiude un pensiero, ogni spigolo vivo traccia un confine tra l’inerzia e la creazione.»',
    pageNumber: 42,
    note: 'Nota a margine: la forma non segue la funzione, la forma definisce l’esperienza.',
    appName: 'LibriGen',
    appUrl: 'https://libro-gen.vercel.app/',
  },
  {
    id: 2,
    number: 'APP II',
    title: 'L’Inchiostro e la Luce',
    subtitle: 'Contrasti ad alto impatto visivo',
    excerpt:
      '«Nel silenzio della pagina bianca, il nero più profondo risalta non per assenza, ma per autorità. Accostato al giallo vivo dell’ambra, il testo cessa di essere semplice scrittura e diviene scultura tipografica.»',
    pageNumber: 87,
    note: 'Nota: verificare la saturazione ottica su supporti editoriali ad alta grammatura.',
    appName: 'StoryCraft',
    appUrl: 'https://libro-illustrato.vercel.app/',
  },
  {
    id: 3,
    number: 'APP III',
    title: 'La Legatura Perpetua',
    subtitle: 'La memoria tangibile degli artefatti',
    excerpt:
      '«Un libro non è soltanto un contenitore di parole: è un edificio portatile, una cassaforte di idee rilegate con filo di lino e protette da spessi piatti di cartone rivestito in tela cerata.»',
    pageNumber: 138,
    note: 'Riferimento: edizioni private e copertine d’autore del XX secolo.',
    appName: 'Giornale',
    appUrl: 'https://giornale-sfogliabile.vercel.app/',
  },
{
    id: 4,
    number: 'APP IV',
    title: 'L’Architettura dei Segni',
    subtitle: 'Costruzione di linguaggi visivi complessi',
    excerpt:
      '«Ogni carattere tipografico porta con sé il peso della storia e la leggerezza dell’intuizione. Disegnare una lettera significa edificare uno spazio dove il pensiero può finalmente abitare.»',
    pageNumber: 175,
    note: 'Nota a margine: il bilanciamento dei bianchi è la chiave di ogni ritmo di lettura.',
    appName: 'Vintage neswpaper studio',
    appUrl: 'https://vintage-newspaper-studio.netlify.app/',
  },
  {
    id: 5,
    number: 'APP V',
    title: 'Il Ritmo della Macchina',
    subtitle: 'Interfacce reattive e sistemi modulari',
    excerpt:
      '«L’interattività non è semplice movimento: è un dialogo tacito tra il gesto dell’utente e la risposta della superficie numerica. Il buon design rende questo passaggio del tutto invisibile.»',
    pageNumber: 210,
    note: 'Osservazione: ridurre le transizioni superflue per preservare la chiarezza dell’azione.',
    appName: 'Libro delle fiabe',
    appUrl: 'https://libro-delle-fiabe.vercel.app/',
  },
  {
    id: 6,
    number: 'App VI',
    title: 'La Memoria Digitale',
    subtitle: 'Archivi interattivi e collezioni dinamiche',
    excerpt:
      '«Conservare il sapere nel flusso digitale richiede nuove forme di custodia: non più polvere sui volumi, ma strutture capaci di evolvere e adattarsi al trascorrere del tempo.»',
    pageNumber: 264,
    note: 'Riferimento: architettura dei dati e persistenza dell’informazione nell’era moderna.',
    appName: 'Foto Libro',
    appUrl: 'https://fotolibro2000.netlify.app/',
  },
];

export default function HardcoverBookCard() {
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [hasBookmark, setHasBookmark] = useState(true);

  const chapter = CHAPTERS[currentChapterIdx];

  const handleOpenApp = () => {
    window.open(chapter.appUrl, '_blank', 'noopener,noreferrer');
  };

  return (
   <div className="w-full max-w-xl mx-auto py-6 px-2 flex flex-col items-center h-min">
      {/* Book Container with Realistic Hardcover & Deckle Page Edges */}
      <div className="relative w-full">
        {/* Silk Ribbon Bookmark hanging from the book top down to the bottom */}
        {hasBookmark && (
          <div
            onClick={() => setHasBookmark(!hasBookmark)}
            className="absolute -top-3 right-16 z-30 flex flex-col items-center cursor-pointer group"
            title="Clicca per rimuovere / spostare il segnalibro"
          >
            {/* Top folded ribbon */}
            <div className="w-6 h-4 bg-red-700 border-x-2 border-t-2 border-black group-hover:bg-red-600 transition-colors" />
            {/* Hanging body */}
            <div className="w-6 h-28 bg-red-600 border-x-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.6)] flex items-end justify-center pb-2 group-hover:bg-red-500 transition-colors">
              <span className="text-[8px] font-mono font-black text-white uppercase tracking-widest rotate-90 mb-6">
                P.{chapter.pageNumber}
              </span>
            </div>
            {/* Forked ribbon tail */}
            <div className="w-0 h-0 border-x-[12px] border-x-transparent border-t-[12px] border-t-red-600 border-b-0" />
          </div>
        )}

        {/* The Hardcover Book Block */}
        <div className="relative bg-[#faf7ee] border-4 border-black shadow-[10px_10px_0px_0px_#000,16px_16px_0px_0px_#d6cbb6] flex overflow-visible">
          {/* Left Spine / Dorso del libro rilegato */}
          <div className="w-12 sm:w-16 bg-[#1e1b18] text-[#e0cfb3] border-r-4 border-black p-2 flex flex-col justify-between items-center relative select-none shrink-0 shadow-inner">
            {/* Spine bands (nervi del dorso in rilievo) */}
            <div className="w-full space-y-12 my-auto">
              <div className="w-full h-2 bg-[#ffeb3b] border-y border-black shadow-[0_2px_0_#000]" />
              <div className="w-full h-2 bg-[#ffeb3b] border-y border-black shadow-[0_2px_0_#000]" />
              <div className="w-full h-2 bg-[#ffeb3b] border-y border-black shadow-[0_2px_0_#000]" />
            </div>

            {/* Vertical Title on Spine */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="font-mono font-black text-xs sm:text-sm tracking-widest text-[#ffeb3b] rotate-90 uppercase whitespace-nowrap drop-shadow">
               LIBRI  STUDIO
              </span>
            </div>

            <div className="z-10 text-[9px] font-mono text-stone-400 font-bold">
              1924
            </div>
          </div>

          {/* Book Inner Page Body */}
          <div className="flex-none w-full p-5 sm:p-7 flex flex-col justify-between relative bg-[#fffdfa]">
            {/* Page Header with Chapter number & Bookmark toggle */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-black/80">
              <div className="flex items-center gap-2">
                <Feather className="w-4 h-4 text-black stroke-[2.5]" />
                <span className="font-mono text-xs font-black uppercase tracking-wider text-black">
                  {chapter.number}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setHasBookmark(!hasBookmark)}
                  className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase border border-black flex items-center gap-1 transition-all ${
                    hasBookmark
                      ? 'bg-red-600 text-white shadow-[1px_1px_0px_#000]'
                      : 'bg-white text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {hasBookmark ? (
                    <>
                      <BookmarkCheck className="w-3 h-3" />
                      <span>Segnalibro ON</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3 h-3" />
                      <span>Segna Pagina</span>
                    </>
                  )}
                </button>
                <span className="font-mono text-xs font-bold text-black border-l-2 border-black pl-2">
                  Pag. {chapter.pageNumber}
                </span>
              </div>
            </div>

            {/* Chapter Titles */}
            <div className="py-4 space-y-1">
              <h4 className="text-xl sm:text-2xl font-serif font-black text-black tracking-tight">
                {chapter.title}
              </h4>
              <p className="text-xs font-mono font-bold text-stone-600 uppercase tracking-wide">
                {chapter.subtitle}
              </p>
            </div>

            {/* Literary Excerpt with Drop Cap */}
            <div className="relative my-3 p-4 bg-[#f8f4e9] border-2 border-black shadow-[3px_3px_0px_#000]">
              <Quote className="absolute top-2 right-2 w-6 h-6 text-black/15 pointer-events-none" />
              <p className="font-serif text-sm sm:text-base text-stone-900 leading-relaxed italic pr-4">
                {chapter.excerpt}
              </p>
              {/* Nome dell'applicazione sotto la citazione */}
              <div className="mt-3 pt-2 border-t border-black/20 flex items-center justify-between text-xs font-mono font-bold text-stone-700">
                <span>Applicazione:</span>
                <span className="text-black uppercase tracking-wider">{chapter.appName}</span>
              </div>
            </div>

            {/* Margin Note / Chiosa a margine */}
            <div className="pt-2 pb-4 text-xs font-mono text-stone-700 border-l-4 border-[#ffeb3b] pl-3 italic bg-[#fff9db]/50">
              {chapter.note}
            </div>

            {/* Book Footer Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-black">
              {/* Previous / Next Chapter buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentChapterIdx(
                      (prev) => (prev - 1 + CHAPTERS.length) % CHAPTERS.length
                    )
                  }
                  className="px-2.5 py-1 bg-white hover:bg-black hover:text-white text-black border-2 border-black text-xs font-mono font-black uppercase shadow-[2px_2px_0px_#000] flex items-center gap-1 transition-all"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prec</span>
                </button>

                <button
                  onClick={() =>
                    setCurrentChapterIdx((prev) => (prev + 1) % CHAPTERS.length)
                  }
                  className="px-2.5 py-1 bg-[#ffeb3b] hover:bg-black hover:text-[#ffeb3b] text-black border-2 border-black text-xs font-mono font-black uppercase shadow-[2px_2px_0px_#000] flex items-center gap-1 transition-all"
                >
                  <span>Succ</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Open External App Button */}
              <button
                onClick={handleOpenApp}
                className="px-3 py-1 bg-black text-white hover:bg-[#ffeb3b] hover:text-black border-2 border-black text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[2px_2px_0px_#000] transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Apri App</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
