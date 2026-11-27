import React, { useState, useEffect } from 'react';
import { RefreshCwIcon, BookmarkIcon, SparklesIcon } from 'lucide-react';

interface UtilityCardProps {
  playSoundBlip?: (freq: number, type?: OscillatorType, duration?: number) => void;
}

const noopSound: NonNullable<UtilityCardProps['playSoundBlip']> = () => {};

// =========================================
// 1. COLORED MARKERS CARD (Palette Color Maker)
// =========================================
export const ColorMarkersCard: React.FC<UtilityCardProps> = ({ playSoundBlip = noopSound }) => {
  const [paletteColors, setPaletteColors] = useState<string[]>([
    '#FF5F56',
    '#F34E90',
    '#3DDC84',
    '#00A4EF',
  ]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const randomizePalette = () => {
    playSoundBlip(950, 'sine', 0.05);
    const colors = Array.from({ length: 4 }).map(() => {
      const randHex =
        '#' +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0')
          .toUpperCase();
      return randHex;
    });
    setPaletteColors(colors);
  };

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    playSoundBlip(1200, 'triangle', 0.04);
    setTimeout(() => setCopiedColor(null), 1200);
  };

  return (
    <div
      className="desk-card bg-neutral-800/80 p-5 rounded-3xl border border-white/5 hover-rot-1"
      style={{ '--hover-rot': '1deg' } as any}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="font-bold text-teal-300 font-mono text-sm leading-tight uppercase tracking-wider">
          Colored Markers 🖍️
        </span>
        <button
          onClick={randomizePalette}
          className="p-1 px-2.5 rounded bg-teal-900 text-teal-200 text-[10px] font-semibold flex items-center gap-1 active:translate-y-[1px] cursor-pointer"
          title="Rigenera Colori"
        >
          <RefreshCwIcon className="w-3 h-3" />
          Mix
        </button>
      </div>

      <p className="text-[10px] text-stone-400 font-sans mb-4 leading-relaxed">
        Fai click sui pennarelli per copiare il codice HEX di stile al volo negli appunti!
      </p>

      <div className="grid grid-cols-2 gap-3 mb-2">
        {paletteColors.map((hex, idx) => (
          <button
            key={idx}
            onClick={() => copyToClipboard(hex)}
            className="p-4 rounded-xl flex items-center justify-center font-mono text-xs font-bold text-stone-900 relative shadow transition-all active:scale-95 border-b-4 border-stone-800 cursor-pointer"
            style={{ backgroundColor: hex }}
          >
            <span className="bg-white/80 px-1.5 py-0.5 rounded text-[9px] font-bold">
              {copiedColor === hex ? 'Copied!' : hex}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// =========================================
// 3. EDITOR TESTO (.txt + LocalStorage)
// =========================================
export const TextEditorCard: React.FC<UtilityCardProps> = ({ playSoundBlip = noopSound }) => {
  const [textInput, setTextInput] = useState(() => {
    return (
      localStorage.getItem('editor_text') ||
      'Questo è un piccolo editor di testo salvato nel browser.\nScrivi qui qualsiasi nota o codice!'
    );
  });
  const [textFilename, setTextFilename] = useState('appunti.txt');
  const [textStatusMsg, setTextStatusMsg] = useState('');
  const [isStatusVisible, setIsStatusVisible] = useState(false);

  const saveTextFile = () => {
    playSoundBlip(1000, 'sine', 0.08);
    localStorage.setItem('editor_text', textInput);
    try {
      const blob = new Blob([textInput], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = textFilename || 'appunti.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setTextStatusMsg(`File "${textFilename}" salvato con successo!`);
      setIsStatusVisible(true);
      setTimeout(() => {
        setIsStatusVisible(false);
      }, 3000);
    } catch {
      setTextStatusMsg('Errore nel salvare il file.');
      setIsStatusVisible(true);
      setTimeout(() => {
        setIsStatusVisible(false);
      }, 3000);
    }
  };

  return (
    <div className="desk-card hover-rot-1 !mb-0" style={{ '--hover-rot': '0.5deg' } as any}>
      <div className="w-full bg-white border-4 border-stone-800 rounded-2xl shadow-[6px_6px_0_#292524] p-5 select-none text-stone-900">
        <h1 className="text-xl font-black mb-3 text-stone-800 flex items-center gap-2">
          <span>📝</span> Editor testo
        </h1>

        <label htmlFor="textInputSelector" className="block text-xs font-bold mb-1.5 text-stone-700">
          Scrivi o incolla il testo:
        </label>

        <textarea
          id="textInputSelector"
          rows={7}
          value={textInput}
          onChange={(e) => {
            setTextInput(e.target.value);
            localStorage.setItem('editor_text', e.target.value);
          }}
          className="w-full p-3 rounded-xl border-2 border-stone-300 focus:outline-none focus:border-blue-500 resize-y font-mono text-xs bg-stone-100 text-stone-900 caret-stone-900 placeholder:text-stone-400"
          placeholder="Scrivi qui il tuo testo..."
        />

        <div className="mt-3 flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              id="textFilenameSelector"
              type="text"
              value={textFilename}
              onChange={(e) => setTextFilename(e.target.value)}
              className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border-2 border-stone-400 font-bold bg-white text-stone-800 placeholder:text-stone-400"
              placeholder="nomefile.txt"
            />

            <button
              id="textSaveBtnSelector"
              type="button"
              onClick={saveTextFile}
              className="px-4 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-black border-2 border-red-800 shadow-[0_2.5px_0_#7f1d1d] active:translate-y-0.5 active:shadow-none text-xs transition-all cursor-pointer"
            >
              Salva file
            </button>
          </div>
          {isStatusVisible && textStatusMsg && (
            <p
              id="textStatusMsgSelector"
              className="text-[10px] font-bold text-center text-emerald-800 bg-emerald-50 border border-emerald-200 p-1.5 rounded-lg"
            >
              {textStatusMsg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// =========================================
// 4. JSON EDITOR (.json + Formatta + LocalStorage)
// =========================================
export const JsonEditorCard: React.FC<UtilityCardProps> = ({ playSoundBlip = noopSound }) => {
  const [jsonInput, setJsonInput] = useState(() => {
    return (
      localStorage.getItem('json_editor_input') ||
      '{\n  "titolo": "Esempio",\n  "tipo": "prova"\n}'
    );
  });
  const [jsonFilename, setJsonFilename] = useState('miei_dati.json');
  const [jsonStatusMsg, setJsonStatusMsg] = useState('');
  const [isJsonStatusVisible, setIsJsonStatusVisible] = useState(false);
  const [isJsonError, setIsJsonError] = useState(false);

  useEffect(() => {
    localStorage.setItem('json_editor_input', jsonInput);
  }, [jsonInput]);

  const saveJsonFile = () => {
    playSoundBlip(1000, 'sine', 0.08);
    localStorage.setItem('json_editor_input', jsonInput);
    try {
      const parsed = JSON.parse(jsonInput);
      const cleanJson = JSON.stringify(parsed, null, 2);

      const blob = new Blob([cleanJson], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = jsonFilename.endsWith('.json') ? jsonFilename : `${jsonFilename}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsJsonError(false);
      setJsonStatusMsg(`File "${jsonFilename}" salvato con successo!`);
      setIsJsonStatusVisible(true);
      setTimeout(() => {
        setIsJsonStatusVisible(false);
      }, 3000);
    } catch (e: any) {
      setIsJsonError(true);
      setJsonStatusMsg(`Errore JSON non valido: ${e.message}`);
      setIsJsonStatusVisible(true);
      setTimeout(() => {
        setIsJsonStatusVisible(false);
      }, 5000);
    }
  };

  const formatJson = () => {
    playSoundBlip(900, 'sine', 0.05);
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
      setIsJsonError(false);
      setJsonStatusMsg('JSON formattato con successo!');
      setIsJsonStatusVisible(true);
      setTimeout(() => {
        setIsJsonStatusVisible(false);
      }, 3000);
    } catch (e: any) {
      setIsJsonError(true);
      setJsonStatusMsg(`Errore nello schema: ${e.message}`);
      setIsJsonStatusVisible(true);
      setTimeout(() => {
        setIsJsonStatusVisible(false);
      }, 5000);
    }
  };

  return (
    <div className="desk-card hover-rot-1 !mb-0" style={{ '--hover-rot': '1deg' } as any}>
      <div className="w-full bg-white border-4 border-stone-800 rounded-2xl shadow-[6px_6px_0_#292524] p-5 select-none text-stone-900 relative">
        <div className="absolute -top-3.5 right-4 bg-pink-400 text-stone-900 border-2 border-stone-800 px-3 py-1 font-black uppercase tracking-wider rotate-6 text-xs z-10">
          JSON
        </div>

        <h1 className="text-xl font-black mb-3 text-stone-800 flex items-center gap-2">
          <span>💾</span> Incolla e salva JSON
        </h1>

        <div className="flex justify-between items-center mb-1.5">
          <label htmlFor="jsonInputSelector" className="block text-xs font-bold text-stone-700">
            Codice JSON:
          </label>
          <button
            onClick={formatJson}
            className="text-xs font-extrabold text-blue-600 hover:text-blue-800 underline cursor-pointer"
          >
            ✨ Formatta ed Indenta
          </button>
        </div>

        <textarea
          id="jsonInputSelector"
          rows={10}
          spellCheck={false}
          value={jsonInput}
          onChange={(e) => {
            setJsonInput(e.target.value);
            setIsJsonStatusVisible(false);
          }}
          className="w-full p-3 rounded-xl border-2 border-stone-300 focus:outline-none focus:border-blue-500 resize-y font-mono text-xs bg-stone-100 text-stone-900 caret-stone-900 placeholder:text-stone-400"
          placeholder={`{\n  "titolo": "Esempio",\n  "tipo": "prova"\n}`}
        />

        <div className="mt-3 flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              id="jsonFilenameSelector"
              type="text"
              value={jsonFilename}
              onChange={(e) => setJsonFilename(e.target.value)}
              className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border-2 border-stone-400 font-bold bg-white text-stone-800 placeholder:text-stone-400"
              placeholder="miei_dati.json"
            />

            <button
              id="jsonSaveBtnSelector"
              onClick={saveJsonFile}
              className="px-4 py-1.5 rounded-lg bg-green-400 hover:bg-green-500 text-stone-950 font-black border-2 border-stone-800 shadow-[0_2.5px_0_#1c1917] active:translate-y-0.5 active:shadow-none text-xs transition-all cursor-pointer"
            >
              Salva JSON
            </button>
          </div>

          {isJsonStatusVisible && jsonStatusMsg && (
            <p
              id="jsonStatusMsgSelector"
              className={`text-[10px] font-bold text-center p-1.5 rounded-lg border ${
                isJsonError
                  ? 'text-red-800 bg-red-50 border-red-200'
                  : 'text-emerald-800 bg-emerald-50 border-emerald-200'
              }`}
            >
              {isJsonError ? '❌ ' : '✅ '}
              {jsonStatusMsg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// =========================================
// 5. QUADERNO EDITOR IFRAME (/appunti.html)
// =========================================
export const QuadernoEditorCard: React.FC = () => {
  return (
    <div className="desk-card !mb-0 w-full min-h-[500px] overflow-hidden rounded-2xl bg-white/40 border border-white/20 shadow-xl p-2 flex flex-col">
      <iframe
        src="/appunti.html"
        className="w-full flex-grow rounded-xl border-0"
        style={{ minHeight: '520px', background: 'transparent' }}
        title="Quaderno Editor"
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </div>
  );
};

// =========================================
// 6. NOTEBOOK PREFERITI (BookmarkIcon + Link salvati)
// =========================================
interface LinkItemType {
  id: number;
  title: string;
  url: string;
}

export const PreferitiCard: React.FC<UtilityCardProps> = ({ playSoundBlip = noopSound }) => {
  const [links, setLinks] = useState<LinkItemType[]>(() => {
    const saved = localStorage.getItem('my_links');
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, title: 'Google AI Studio', url: 'https://aistudio.google.com/' },
          { id: 2, title: 'GitHub Progetti', url: 'https://github.com/' },
        ];
  });
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  useEffect(() => {
    localStorage.setItem('my_links', JSON.stringify(links));
  }, [links]);

  const addLink = () => {
    if (!linkTitle || !linkUrl) return;
    playSoundBlip(900, 'sine', 0.04);
    setLinks([...links, { id: Date.now(), title: linkTitle, url: linkUrl }]);
    setLinkTitle('');
    setLinkUrl('');
  };

  const deleteLink = (id: number) => {
    playSoundBlip(400, 'triangle', 0.05);
    setLinks(links.filter((l) => l.id !== id));
  };

  return (
    <div className="desk-card card-links-app hover-rot-1 !mb-0" style={{ '--hover-rot': '-1deg' } as any}>
      <div className="flex items-center gap-2 mb-4">
        <BookmarkIcon className="w-5 h-5 text-indigo-900" />
        <div className="font-bold text-stone-900 tracking-wide text-lg">Preferiti 🔖</div>
      </div>

      <div className="link-input-group mb-4">
        <input
          type="text"
          placeholder="Titolo"
          value={linkTitle}
          onChange={(e) => setLinkTitle(e.target.value)}
          className="link-input"
        />
        <input
          type="text"
          placeholder="https://..."
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          className="link-input"
        />
        <button
          onClick={addLink}
          className="w-full bg-slate-800 hover:bg-slate-700 active:translate-y-[1px] text-white py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all mt-1 cursor-pointer"
        >
          Aggiungi Link ＋
        </button>
      </div>

      <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
        {links.map((l) => (
          <div
            key={l.id}
            className="link-item flex justify-between items-center bg-white/40 hover:bg-white/70 px-2 py-1.5 rounded transition-all"
          >
            <a
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate max-w-[85%] font-medium"
            >
              🔗 {l.title}
            </a>
            <button
              onClick={() => deleteLink(l.id)}
              className="text-stone-400 hover:text-red-500 transition-all text-xs cursor-pointer"
              title="Rimuovi"
            >
              ✕
            </button>
          </div>
        ))}
        {links.length === 0 && (
          <div className="text-xs text-stone-500 italic py-4 text-center">Taccuino vuoto</div>
        )}
      </div>
    </div>
  );
};

// =========================================
// 7. AGENDA PLANNER CARINA (Nuovo Design Stile Agenda)
// =========================================
const AGENDA_ITEMS = [
  {
    time: '09:00',
    icon: '💼',
    title: 'Ufficio Personale',
    tag: 'Ufficio',
    url: 'https://ufficio-personale.netlify.app/',
    color: 'bg-amber-200/70 text-amber-950 border-amber-400',
  },
  {
    time: '10:30',
    icon: '📝',
    title: 'Editor di Testo Pro',
    tag: 'Note',
    url: 'https://editor-di-testo.vercel.app/',
    color: 'bg-rose-200/70 text-rose-950 border-rose-400',
  },
  {
    time: '12:00',
    icon: '📑',
    title: 'Pdf Notepad',
    tag: 'PDF',
    url: 'https://pdf-notepad.vercel.app/',
    color: 'bg-sky-200/70 text-sky-950 border-sky-400',
  },
  {
    time: '15:00',
    icon: '📅',
    title: 'Creative Desk Planner',
    tag: 'Piano',
    url: 'https://creative-desk-planner.vercel.app/',
    color: 'bg-emerald-200/70 text-emerald-950 border-emerald-400',
  },
  {
    time: '17:30',
    icon: '🗒️',
    title: 'Lettore PDF multiplo',
    tag: 'Studio',
    url: 'https://lettore-pdf-affiancato.ai.studio/',
    color: 'bg-violet-200/70 text-violet-950 border-violet-400',
  },
];

export const AgendaCard: React.FC<UtilityCardProps> = ({ playSoundBlip = noopSound }) => {
  const todayLabel = new Date().toLocaleDateString('it-IT', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  return (
    <div className="desk-card hover-rot-1 pr-3" style={{ '--hover-rot': '1.2deg' } as any}>
      {/* Copertina esterna in pelle/lino pastello con linguette segnapagina */}
      <div className="relative bg-[#d9b99b] p-2.5 rounded-2xl border-3 border-[#6b4423] shadow-[8px_8px_0_rgba(0,0,0,0.35)]">
        {/* Linguette colorate sul bordo destro dell'agenda */}
        <div className="absolute -right-3 top-10 flex flex-col gap-2 z-0">
          <span className="bg-rose-400 text-stone-900 border-2 border-[#6b4423] border-l-0 rounded-r-md px-1.5 py-1 text-[8px] font-black uppercase shadow">
            Uff
          </span>
          <span className="bg-amber-300 text-stone-900 border-2 border-[#6b4423] border-l-0 rounded-r-md px-1.5 py-1 text-[8px] font-black uppercase shadow">
            Pdf
          </span>
          <span className="bg-teal-300 text-stone-900 border-2 border-[#6b4423] border-l-0 rounded-r-md px-1.5 py-1 text-[8px] font-black uppercase shadow">
            Day
          </span>
        </div>

        {/* Fascia elastica di chiusura decorativa */}
        <div className="absolute top-0 bottom-0 right-5 w-2.5 bg-[#8c2f39]/80 border-x border-[#5a1c22]/60 pointer-events-none z-20" />

        {/* Pagina interna color crema con spirale dorata */}
        <div className="relative z-10 bg-[#fffaf0] rounded-xl border-2 border-[#b08968] pl-7 pr-4 py-4 shadow-inner text-stone-900">
          {/* Spirali dorate sul dorso sinistro */}
          <div className="absolute left-1.5 top-4 bottom-4 flex flex-col justify-between pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-4 h-2 rounded-full bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 border border-amber-900 shadow-sm"
              />
            ))}
          </div>

          {/* Intestazione stile pagina giornaliera */}
          <div className="flex items-center justify-between border-b-2 border-dashed border-amber-800/30 pb-2.5 mb-3">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-amber-800 font-bold block">
                Personal Organizer
              </span>
              <h2 className="text-base font-black text-stone-800 flex items-center gap-1.5">
                <span>📔</span> La Mia Agenda
              </h2>
            </div>
            <span className="bg-amber-100 border border-amber-400 text-amber-950 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full capitalize">
              {todayLabel}
            </span>
          </div>

          {/* Righe orarie dell'agenda */}
          <ul className="space-y-2">
            {AGENDA_ITEMS.map((item) => (
              <li
                key={item.url}
                className="border-b border-amber-900/15 pb-1.5 last:border-b-0 last:pb-0"
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSoundBlip(750, 'sine', 0.05)}
                  className="group flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 hover:bg-amber-100/70 transition-all"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-mono text-[10px] font-bold text-amber-700/80 shrink-0">
                      {item.time}
                    </span>
                    <span className="text-sm shrink-0">{item.icon}</span>
                    <span className="text-xs font-bold text-stone-800 group-hover:text-amber-950 truncate">
                      {item.title}
                    </span>
                  </div>
                  <span
                    className={`text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border shrink-0 ${item.color}`}
                  >
                    {item.tag}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Segnalibro a nastro in fondo */}
          <div className="mt-3 pt-2 border-t border-amber-900/15 flex items-center justify-between text-[9px] font-mono text-stone-500">
            <span>✦ Utility & Ufficio</span>
            <span className="text-rose-700 font-bold">🔖 Segnalibro attivo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================
// 8. STICKY NOTE BOARD (Post-it)
// =========================================
export const StickyNoteCard: React.FC<UtilityCardProps> = ({ playSoundBlip = noopSound }) => {
  const [notes, setNotes] = useState<string[]>(() => {
    const saved = localStorage.getItem('deskNotes');
    return saved
      ? JSON.parse(saved)
      : [
          'Comprare taccuini a quadretti 📓',
          'Studiare i verbi cinesi (Lavagna 🐉)',
          'Finire il layout fluido caotico ⚡',
        ];
  });
  const [noteInput, setNoteInput] = useState('');

  useEffect(() => {
    localStorage.setItem('deskNotes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!noteInput.trim()) return;
    playSoundBlip(900, 'sine', 0.04);
    setNotes([...notes, noteInput.trim()]);
    setNoteInput('');
  };

  const deleteNote = (index: number) => {
    playSoundBlip(400, 'triangle', 0.05);
    setNotes(notes.filter((_, idx) => idx !== index));
  };

  return (
    <div className="desk-card postit-card p-6" style={{ '--hover-rot': '1.5deg' } as any}>
      <div className="postit-tape"></div>
      <div className="flex items-center gap-1.5 mb-3 mt-1 text-yellow-950 font-bold font-sans">
        <SparklesIcon className="w-4 h-4 text-amber-800" />
        <span className="font-bold tracking-wider text-base">Sticky Note Board 📌</span>
      </div>

      <div className="space-y-3 mb-4">
        <input
          type="text"
          placeholder="Nuovo appunto..."
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addNote()}
          className="w-full bg-white/50 border-b border-yellow-600/30 text-xs py-1 px-2 text-stone-900 focus:outline-none focus:border-yellow-700 font-sans"
        />
        <button
          onClick={addNote}
          className="w-full bg-yellow-600/25 hover:bg-yellow-600/40 text-stone-900 text-[10px] font-bold py-1 rounded transition-all cursor-pointer"
        >
          Aggiungi Nota Rapida
        </button>
      </div>

      <div className="space-y-2 max-h-[180px] overflow-y-auto">
        {notes.map((note, index) => (
          <div
            key={index}
            className="flex justify-between items-start bg-yellow-200/40 p-2 rounded text-xs text-stone-800 font-sans border border-yellow-500/10"
          >
            <span className="leading-tight font-medium">{note}</span>
            <button
              onClick={() => deleteNote(index)}
              className="text-stone-600 hover:text-red-500 pl-2 cursor-pointer"
            >
              ✕
            </button>
          </div>
        ))}
        {notes.length === 0 && (
          <div className="text-center text-[10px] italic text-stone-600">
            Nessun promemoria attivo.
          </div>
        )}
      </div>
    </div>
  );
};

// =========================================
// 9. FAT CAT WIDGET (I Miei Link)
// =========================================
export const FatCatCard: React.FC<UtilityCardProps> = ({ playSoundBlip = noopSound }) => {
  return (
    <div className="desk-card hover-rot-1" style={{ '--hover-rot': '-1deg' } as any}>
      <div className="relative w-full max-w-[340px] mx-auto mt-6">
        <div className="absolute -top-5 left-6 w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[26px] border-b-orange-400 transform -rotate-12"></div>
        <div className="absolute -top-5 right-6 w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[26px] border-b-orange-400 transform rotate-12"></div>

        <div className="bg-orange-400 rounded-[2rem] p-6 shadow-2xl relative z-20 border-4 border-orange-500 flex flex-col items-center">
          <div className="flex justify-center items-center gap-6 mb-4 mt-1">
            <div className="w-4 h-4 bg-gray-900 rounded-full relative overflow-hidden">
              <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
            <div className="relative flex flex-col items-center">
              <div className="w-3.5 h-2 bg-pink-300 rounded-full z-10"></div>
              <div className="absolute top-1 -left-4 w-3 h-0.5 bg-orange-200 rotate-12 rounded-full"></div>
              <div className="absolute top-2.5 -left-4 w-3 h-0.5 bg-orange-200 -rotate-12 rounded-full"></div>
              <div className="absolute top-1 -right-4 w-3 h-0.5 bg-orange-200 -rotate-12 rounded-full"></div>
              <div className="absolute top-2.5 -right-4 w-3 h-0.5 bg-orange-200 rotate-12 rounded-full"></div>
            </div>
            <div className="w-4 h-4 bg-gray-900 rounded-full relative overflow-hidden">
              <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          </div>

          <h4 className="text-white font-bold text-lg mb-4 tracking-wider font-sans">I Miei Link</h4>

          <div className="w-full bg-white/95 rounded-2xl p-4 flex flex-col gap-2 shadow-inner">
            <a
              href="https://character-marker.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2.5 bg-orange-50 hover:bg-orange-100 hover:-translate-y-[2px] rounded-xl transition-all text-orange-900 font-semibold text-xs shadow-sm"
            >
              🐱 Character Marker
            </a>
            <a
              href="generatore-kawaii.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2.5 bg-orange-50 hover:bg-orange-100 hover:-translate-y-[2px] rounded-xl transition-all text-orange-900 font-semibold text-xs shadow-sm"
            >
              👑 Generatore di Kawaii
            </a>
            <a
              href="character-engine.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2.5 bg-orange-50 hover:bg-orange-100 hover:-translate-y-[2px] rounded-xl transition-all text-orange-900 font-semibold text-xs shadow-sm"
            >
              🦊 CSS_ENGINE v5.1
            </a>
            <a
              href="anatomy.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2.5 bg-orange-50 hover:bg-orange-100 hover:-translate-y-[2px] rounded-xl transition-all text-orange-900 font-semibold text-xs shadow-sm"
            >
              🤵 Anatomy Sculptor Pro
            </a>
            <a
              href="anatomy2.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2.5 bg-orange-50 hover:bg-orange-100 hover:-translate-y-[2px] rounded-xl transition-all text-orange-900 font-semibold text-xs shadow-sm"
            >
              🧸 Anatomy Blueprint Studio
            </a>
            <a
              href="https://css-artist-lab.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2.5 bg-orange-50 hover:bg-orange-100 hover:-translate-y-[2px] rounded-xl transition-all text-orange-900 font-semibold text-xs shadow-sm"
            >
              🐾 Css Artist Lab
            </a>
          </div>
        </div>

        <div
          className="absolute -bottom-5 -right-2 w-16 h-16 border-b-8 border-r-8 border-orange-400 rounded-br-full transition-transform duration-500 ease-in-out hover:rotate-12 cursor-pointer z-10"
          onClick={() => playSoundBlip(880, 'sine', 0.05)}
        ></div>
      </div>
    </div>
  );
};

// =========================================
// 10. RETRO SWISS CUCKOO CLOCK & POMODORO
// =========================================
export const CuckooClockCard: React.FC<UtilityCardProps> = ({ playSoundBlip = noopSound }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [pomoMinutes, setPomoMinutes] = useState(25);
  const [pomoSeconds, setPomoSeconds] = useState(0);
  const [pomoActive, setPomoActive] = useState(false);
  const [pomoMode, setPomoMode] = useState<'study' | 'rest'>('study');
  const [pomoNotice, setPomoNotice] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (pomoActive) {
      interval = setInterval(() => {
        if (pomoSeconds > 0) {
          setPomoSeconds((s) => s - 1);
        } else if (pomoMinutes > 0) {
          setPomoMinutes((m) => m - 1);
          setPomoSeconds(59);
        } else {
          playSoundBlip(880, 'square', 0.2);
          setTimeout(() => playSoundBlip(1320, 'square', 0.25), 150);
          setTimeout(() => playSoundBlip(880, 'square', 0.2), 300);

          if (pomoMode === 'study') {
            setPomoMode('rest');
            setPomoMinutes(5);
            setPomoNotice('Ottimo lavoro! Pausa di 5 minuti ☕');
          } else {
            setPomoMode('study');
            setPomoMinutes(25);
            setPomoNotice('Pausa finita! Concentrazione accesa 🚀');
          }
          setPomoActive(false);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [pomoActive, pomoMinutes, pomoSeconds, pomoMode, playSoundBlip]);

  const togglePomo = () => {
    playSoundBlip(pomoActive ? 500 : 800, 'sine', 0.05);
    setPomoNotice(null);
    setPomoActive(!pomoActive);
  };

  const resetPomo = () => {
    playSoundBlip(400, 'triangle', 0.08);
    setPomoActive(false);
    setPomoMode('study');
    setPomoMinutes(25);
    setPomoSeconds(0);
    setPomoNotice(null);
  };

  return (
    <div
      className="desk-card bg-[#5c4533] p-5 rounded-[2rem] border-4 border-[#3d2a21] shadow-2xl relative w-full"
      style={{ '--hover-rot': '-1deg' } as any}
    >
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#3d2a21] rounded-full flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
      </div>

      <div className="text-center text-white mt-1">
        <span className="font-semibold text-xs text-yellow-400 uppercase tracking-widest block mb-1">
          Cuckoo Timepiece & Pomodoro
        </span>
        <div className="font-mono text-xl bg-orange-950/80 text-orange-200 py-1.5 rounded-xl border border-orange-900 inline-block px-4 font-bold tracking-widest shadow-inner">
          {currentTime.toLocaleTimeString('it-IT')}
        </div>
      </div>

      <div className="flex justify-center my-4 h-12 relative overflow-hidden">
        <div className="pendulum-arm w-1 bg-amber-700 h-10 rounded-full relative">
          <div className="absolute bottom-0 -left-2 w-5 h-5 bg-yellow-500 rounded-full border border-yellow-600"></div>
        </div>
      </div>

      <div className="bg-stone-950/70 rounded-2xl p-3 border border-amber-900/30">
        <div className="flex justify-between text-[10px] text-orange-200/70 font-mono mb-2">
          <span>STAGE: {pomoMode.toUpperCase()}</span>
          <span>STATE: {pomoActive ? 'WORKING' : 'PAUSED'}</span>
        </div>

        <div className="text-center font-mono text-3xl font-bold tracking-widest my-1 text-amber-400">
          {String(pomoMinutes).padStart(2, '0')}:{String(pomoSeconds).padStart(2, '0')}
        </div>

        {pomoNotice && (
          <p className="text-[10px] text-center text-amber-200 bg-amber-900/50 rounded-lg py-1 px-2 mt-2">
            {pomoNotice}
          </p>
        )}

        <div className="flex gap-2 justify-center mt-3">
          <button
            onClick={togglePomo}
            className={`px-3 py-1 rounded text-[10px] font-bold flex items-center gap-1 ${
              pomoActive
                ? 'bg-red-800 text-red-100 hover:bg-red-700'
                : 'bg-emerald-800 text-emerald-100 hover:bg-emerald-700'
            } cursor-pointer`}
          >
            {pomoActive ? 'PAUSA' : 'START'}
          </button>
          <button
            onClick={resetPomo}
            className="bg-[#3d2a21] hover:bg-[#52382c] px-3 py-1 text-stone-200 rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer"
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
};

// =========================================
// 11. CREATIVE FONT CARD (Scrittura & Movimento)
// =========================================
export const CreativeFontCard: React.FC = () => {
  const apps = [
    {
      title: 'Cally',
      desc: 'Font',
      tag: 'Typography',
      url: 'https://calligraphy-font-art-editor.vercel.app/',
      bgPreview: '🆎',
    },
    {
      title: 'Ghiri',
      desc: 'Scrittura',
      tag: 'Motion',
      url: 'https://ghiribizzo.vercel.app/',
      bgPreview: '🎞️',
    },
    {
      title: 'Gliph',
      desc: 'Mostri',
      tag: 'Vector',
      url: 'https://gliph-forge.netlify.app/',
      bgPreview: '👹',
    },
    {
      title: 'Scribble',
      desc: 'Tratti',
      tag: 'Animation',
      url: 'https://scarabocchio.vercel.app/',
      bgPreview: '🖋️',
    },
    {
      title: 'ASCII',
      desc: 'Tratti',
      tag: 'Scritte',
      url: 'https://generatore-di-testo-ascii-16148277139.europe-west2.run.app/',
      bgPreview: '💟',
    },
    {
      title: 'Stickers!',
      desc: 'Disegni',
      tag: 'Emoji',
      url: 'https://site-craft-studio.netlify.app/',
      bgPreview: '👀',
    },
    {
      title: 'Stickers!!',
      desc: 'Disegni',
      tag: 'Emoji',
      url: 'https://stickers-creator.vercel.app/',
      bgPreview: '🏖',
    },
    {
      title: 'Json',
      desc: 'Widget',
      tag: 'file',
      url: 'https://lettore-json-universale.vercel.app/',
      bgPreview: '🖥️',
    },
    {
      title: 'Emoji',
      desc: 'Stickers3',
      tag: 'immagini',
      url: 'https://wemoji-studio-maker.netlify.app/',
      bgPreview: '🤪',
    },
  ];

  return (
    <div className="desk-card w-full py-4 font-sans text-[#E4E4E7]">
      <div className="mb-4 flex items-center gap-2 border-b border-[#222226] pb-2">
        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#A1A1AA]">
          Studio Workflow
        </span>
        <span className="text-[#52525B] text-xs">//</span>
        <h2 className="text-sm font-medium tracking-wide text-zinc-300">
          Scrittura & Movimento
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {apps.map((app, index) => (
          <a
            key={index}
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between p-3 rounded-lg bg-[#161619] border border-[#27272A] hover:border-amber-500/50 transition-all duration-300 overflow-hidden min-h-[80px]"
          >
            <div className="absolute right-2 bottom-1 text-xl font-serif text-[#222226] opacity-30 group-hover:opacity-60 transition-all duration-300 pointer-events-none select-none italic">
              {app.bgPreview}
            </div>

            <div className="relative z-10">
              <span className="text-[8px] font-mono tracking-wider uppercase text-amber-500/80 block mb-0.5">
                {app.tag}
              </span>
              <h3 className="text-xs font-medium text-white group-hover:text-amber-400 transition-colors truncate">
                {app.title}
              </h3>
              <p className="text-[10px] text-[#A1A1AA] font-light leading-tight mt-0.5 pr-2 line-clamp-2">
                {app.desc}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
