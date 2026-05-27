import { useState, useEffect, useMemo, useRef } from 'react';
import { 
  FolderIcon, 
  SmartphoneIcon, 
  CalendarIcon, 
  BookmarkIcon, 
  MusicIcon, 
  PenToolIcon, 
  SmileIcon,
  SparklesIcon,
  PlayIcon,
  PauseIcon,
  RotateCcwIcon,
  Volume2Icon,
  ScissorsIcon,
  CheckCircle2Icon,
  CoffeeIcon,
  RefreshCwIcon,
  AlertTriangleIcon,
  Trash2Icon,
  ChevronRightIcon
} from 'lucide-react';

// =========================================
// TYPES & CONSTANTS
// =========================================
interface LinkItemType {
  id: number;
  title: string;
  url: string;
}

interface MoodItemType {
  id: number;
  text: string;
}

const DESK_EMOJIS = ['☕', '📎', '✏️', '📐', '✂️', '💡', '📌', '📚', '⌨️', '🖱️', '🎧', '🧮', '🖇️', '🗑️', '🖋️'];

const PROGRAMMER_FORTUNES = [
  { text: "L'Anello Infinito", motto: "Riscriverai questa funzione domani su GitHub.", status: "Loop inevitabile" },
  { text: "Allineamento Divino", motto: "Il margin: auto funzionerà al primo colpo.", status: "Favore degli Dei" },
  { text: "Stack Overflow Supremo", motto: "Troverai la risposta in un forum datato 2012.", status: "Risveglio karmico" },
  { text: "Caffè della Rivelazione", motto: "L'illuminazione del bug arriverà alle 3:15 del mattino.", status: "Energia pura" },
  { text: "Nirvana del Compiler", motto: "Zero avvisi, zero errori. Un evento astronomico raro.", status: "Perfezione cosmica" },
  { text: "L'Omino dei Tasti", motto: "Un punto e virgola dimenticato ti terrà sveglio per 2 ore.", status: "Maledizione minore" }
];

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
  } catch (err) {
    // Silently proceed if browser blocks audio
  }
};

export default function App() {
  // =========================================
  // PERSISTED STATES
  // =========================================
  const [links, setLinks] = useState<LinkItemType[]>(() => {
    const saved = localStorage.getItem('my_links');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Google AI Studio', url: 'https://aistudio.google.com/' },
      { id: 2, title: 'GitHub Progetti', url: 'https://github.com/' }
    ];
  });

  const [moods, setMoods] = useState<MoodItemType[]>(() => {
    const saved = localStorage.getItem('my_mood_board_data');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: 'https://picsum.photos/seed/art/200' },
      { id: 2, text: 'Il caos è l\'ordine non ancora decifrato.' }
    ];
  });

  const [notes, setNotes] = useState<string[]>(() => {
    const saved = localStorage.getItem('deskNotes');
    return saved ? JSON.parse(saved) : [
      "Comprare taccuini a quadretti 📓",
      "Studiare i verbi cinesi (Lavagna 🐉)",
      "Finire il layout fluido caotico ⚡"
    ];
  });

  // =========================================
  // APP INPUT / CORE STATES
  // =========================================
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [moodInput, setMoodInput] = useState('');
  const [noteInput, setNoteInput] = useState('');

  // Sincronizzazione LocalStorage editor_text
  const [textInput, setTextInput] = useState(() => {
    return localStorage.getItem('editor_text') || 'Questo è un piccolo editor di testo salvato nel browser.\nScrivi qui qualsiasi nota o codice!';
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
    } catch (e) {
      setTextStatusMsg('Errore nel salvare il file.');
      setIsStatusVisible(true);
      setTimeout(() => {
        setIsStatusVisible(false);
      }, 3000);
    }
  };

  // Sincronizzazione LocalStorage per JSON Editor
  const [jsonInput, setJsonInput] = useState(() => {
    return localStorage.getItem('json_editor_input') || '{\n  "titolo": "Esempio",\n  "tipo": "prova"\n}';
  });
  const [jsonFilename, setJsonFilename] = useState('miei_dati.json');
  const [jsonStatusMsg, setJsonStatusMsg] = useState('');
  const [isJsonStatusVisible, setIsJsonStatusVisible] = useState(false);
  const [isJsonError, setIsJsonError] = useState(false);

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
      setJsonStatusMsg("JSON formattato con successo!");
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

  // Sincronizzazione LocalStorage
  useEffect(() => {
    localStorage.setItem('json_editor_input', jsonInput);
  }, [jsonInput]);

  // Sincronizzazione LocalStorage
  useEffect(() => {
    localStorage.setItem('my_links', JSON.stringify(links));
  }, [links]);

  useEffect(() => {
    localStorage.setItem('my_mood_board_data', JSON.stringify(moods));
  }, [moods]);

  useEffect(() => {
    localStorage.setItem('deskNotes', JSON.stringify(notes));
  }, [notes]);

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

  // =========================================
  // WIDGETS STATES
  // =========================================

  // A. Palette Color Maker State
  const [paletteColors, setPaletteColors] = useState<string[]>(['#FF5F56', '#F34E90', '#3DDC84', '#00A4EF']);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const randomizePalette = () => {
    playSoundBlip(950, 'sine', 0.05);
    const generateHsl = () => {
      const h = Math.floor(Math.random() * 360);
      const s = 65 + Math.floor(Math.random() * 25);
      const l = 45 + Math.floor(Math.random() * 20);
      return `hsl(${h}, ${s}%, ${l}%)`;
    };
    
    // Forze computate in hex fittizio per semplicità o hsl
    const colors = Array.from({ length: 4 }).map(() => {
      // Converte HSL generico a HEX o lo mantiene
      const randHex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
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

  // B. Retro Swiss Cuckoo Clock & Timer States
  const [currentTime, setCurrentTime] = useState(new Date());
  const [pomoMinutes, setPomoMinutes] = useState(25);
  const [pomoSeconds, setPomoSeconds] = useState(0);
  const [pomoActive, setPomoActive] = useState(false);
  const [pomoMode, setPomoMode] = useState<'study' | 'rest'>('study');

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
          setPomoSeconds(s => s - 1);
        } else if (pomoMinutes > 0) {
          setPomoMinutes(m => m - 1);
          setPomoSeconds(59);
        } else {
          // Timer termines! Ring alarm
          playSoundBlip(880, 'square', 0.2);
          setTimeout(() => playSoundBlip(1320, 'square', 0.25), 150);
          setTimeout(() => playSoundBlip(880, 'square', 0.2), 300);
          
          if (pomoMode === 'study') {
            setPomoMode('rest');
            setPomoMinutes(5);
            alert("Ottimo lavoro! Ora fai una meritata pausa di 5 minuti ☕");
          } else {
            setPomoMode('study');
            setPomoMinutes(25);
            alert("La pausa è finita! Concentrazione accesa 🚀");
          }
          setPomoActive(false);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [pomoActive, pomoMinutes, pomoSeconds, pomoMode]);

  const togglePomo = () => {
    playSoundBlip(pomoActive ? 500 : 800, 'sine', 0.05);
    setPomoActive(!pomoActive);
  };

  const resetPomo = () => {
    playSoundBlip(400, 'triangle', 0.08);
    setPomoActive(false);
    setPomoMode('study');
    setPomoMinutes(25);
    setPomoSeconds(0);
  };

  // C. Interactive Virtual Pixel Pet (Tamagotchi) State
  const [petName, setPetName] = useState('Dino');
  const [petHunger, setPetHunger] = useState(30);
  const [petHappy, setPetHappy] = useState(70);
  const [petAction, setPetAction] = useState<'idle' | 'eating' | 'playing' | 'sleeping'>('idle');

  const interactPet = (type: 'feed' | 'play' | 'sleep') => {
    if (type === 'feed') {
      playSoundBlip(620, 'sine', 0.06);
      setTimeout(() => playSoundBlip(820, 'sine', 0.06), 70);
      setPetHunger(h => Math.max(0, h - 25));
      setPetHappy(j => Math.min(100, j + 5));
      setPetAction('eating');
      setTimeout(() => setPetAction('idle'), 2200);
    } else if (type === 'play') {
      playSoundBlip(750, 'triangle', 0.07);
      setTimeout(() => playSoundBlip(950, 'sine', 0.07), 75);
      setPetHappy(j => Math.min(100, j + 25));
      setPetHunger(h => Math.min(100, h + 10));
      setPetAction('playing');
      setTimeout(() => setPetAction('idle'), 2200);
    } else if (type === 'sleep') {
      playSoundBlip(400, 'triangle', 0.12);
      setPetAction(petAction === 'sleeping' ? 'idle' : 'sleeping');
    }
  };

  // D. Tic-Tac-Toe Notebook State
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [playerSymbol, setPlayerSymbol] = useState<'X' | 'O'>('X');
  const [gameResult, setGameResult] = useState<string | null>(null);

  const checkWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Orizzontali
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticali
      [0, 4, 8], [2, 4, 6]             // Diagonali
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (squares.every(s => s !== null)) return 'Pari';
    return null;
  };

  const handleCellClick = (index: number) => {
    if (board[index] || gameResult) return;
    playSoundBlip(850, 'sine', 0.04);
    
    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      setGameResult(winner === 'Pari' ? 'Pareggio! 🤝' : 'Hai Vinto! 🏆');
      return;
    }

    // Cat-Bot moves shortly after
    const emptyIndices = newBoard.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[];
    if (emptyIndices.length > 0) {
      setTimeout(() => {
        const botMove = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        newBoard[botMove] = 'O';
        setBoard([...newBoard]);
        playSoundBlip(550, 'triangle', 0.05);
        const botWinner = checkWinner(newBoard);
        if (botWinner) {
          setGameResult(botWinner === 'Pari' ? 'Pareggio! 🤝' : 'Cat-Bot ha vinto! 🐾');
        }
      }, 400);
    }
  };

  const resetGame = () => {
    playSoundBlip(300, 'triangle', 0.08);
    setBoard(Array(9).fill(null));
    setGameResult(null);
  };

  // E. Developer Oracle / Fortunes
  const [activeFortune, setActiveFortune] = useState(PROGRAMMER_FORTUNES[0]);
  const shuffleFortune = () => {
    playSoundBlip(1100, 'sine', 0.06);
    const valid = PROGRAMMER_FORTUNES.filter(f => f.text !== activeFortune.text);
    const rand = valid[Math.floor(Math.random() * valid.length)];
    setActiveFortune(rand);
  };

  // F. Spillable Coffee Quotes
  const [coffeeSips, setCoffeeSips] = useState(3);
  const [coffeeQuote, setCoffeeQuote] = useState('Fai click sulla tazza per raccogliere ispirazione.');

  const COFFEE_QUOTES = [
    "Un programmatore traduce il caffè in codici funzionanti.",
    "Il codice funziona ma non so perché, ho spento la caffettiera nel panico.",
    "Git commit -m 'Aggiunto caffè, risolti i dubbi sull'esistenza'.",
    "Non c'è bug abbastanza ostico che un espresso bollente non possa anestetizzare.",
    "La caffeina è l'unico carburante approvato dalle direttive W3C."
  ];

  const sipCoffee = () => {
    if (coffeeSips > 0) {
      playSoundBlip(440, 'sine', 0.15);
      setCoffeeSips(s => s - 1);
      setCoffeeQuote(COFFEE_QUOTES[Math.floor(Math.random() * COFFEE_QUOTES.length)]);
    } else {
      playSoundBlip(300, 'triangle', 0.2);
      setCoffeeQuote("La tazza è vuota! Riempi di nuovo per altro codice calda.");
    }
  };

  const refillCoffee = () => {
    playSoundBlip(800, 'sine', 0.08);
    setCoffeeSips(3);
    setCoffeeQuote("Tazza riempita con una miscela arabica caldissima! ☕");
  };

  // G. Ambient Lo-Fi Tape Machine
  const [tapePlaying, setTapePlaying] = useState(false);
  const [activeAmbiences, setActiveAmbiences] = useState<{ [key: string]: boolean }>({
    rain: false,
    cafe: false,
    keyboards: false,
    vinyl: false
  });

  const [synthedNodes, setSynthedNodes] = useState<{ [key: string]: any }>({});
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientSynthsRef = useRef<{ [key: string]: { stop: () => void } }>({});

  const toggleTapePlay = () => {
    playSoundBlip(1000, 'sine', 0.08);
    
    // Setup and resume Audio Context during user gesture
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    const ctx = audioCtxRef.current;
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const nextPlaying = !tapePlaying;
    setTapePlaying(nextPlaying);

    if (nextPlaying) {
      // Start currently selected active layers if context is alive
      if (ctx) {
        Object.keys(activeAmbiences).forEach(layer => {
          if (activeAmbiences[layer]) {
            startSynthLayer(layer, ctx);
          }
        });
      }
    } else {
      // Stop all layers
      Object.keys(activeAmbiences).forEach(layer => {
        stopSynthLayer(layer);
      });
    }
  };

  const toggleSoundLayer = (layer: string) => {
    if (!tapePlaying) {
      alert("Accendi prima il Cassette Player premendo PLAY! 🎧");
      return;
    }
    
    playSoundBlip(700, 'triangle', 0.04);
    
    // Ensure Context is alive
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    const ctx = audioCtxRef.current;
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const nextState = !activeAmbiences[layer];
    setActiveAmbiences(prev => ({
      ...prev,
      [layer]: nextState
    }));

    if (ctx) {
      if (nextState) {
        startSynthLayer(layer, ctx);
      } else {
        stopSynthLayer(layer);
      }
    }
  };

  // Helper white noise generator
  const createNoiseBuffer = (ctx: AudioContext) => {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  };

  // Synths start/stop dispatcher
  const startSynthLayer = (layer: string, ctx: AudioContext) => {
    if (ambientSynthsRef.current[layer]) return;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.connect(ctx.destination);
    masterGain.gain.linearRampToValueAtTime(layer === 'rain' ? 0.3 : 0.2, ctx.currentTime + 1.0);

    let stopCallback = () => {};

    if (layer === 'rain') {
      const src = ctx.createBufferSource();
      src.buffer = createNoiseBuffer(ctx);
      src.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);

      src.connect(filter);
      filter.connect(masterGain);
      src.start();

      stopCallback = () => {
        try { src.stop(); } catch(e){}
      };
    } else if (layer === 'cafe') {
      const src = ctx.createBufferSource();
      src.buffer = createNoiseBuffer(ctx);
      src.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);
      filter.Q.setValueAtTime(0.7, ctx.currentTime);

      src.connect(filter);
      filter.connect(masterGain);
      src.start();

      // sporadically play warm coffee cup clinks
      const timer = setInterval(() => {
        if (Math.random() > 0.45) {
          const osc = ctx.createOscillator();
          const pGain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(1400 + Math.random() * 1100, ctx.currentTime);
          pGain.gain.setValueAtTime(0.006, ctx.currentTime);
          pGain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.12);
          osc.connect(pGain);
          pGain.connect(masterGain);
          osc.start();
          osc.stop(ctx.currentTime + 0.15);
        }
      }, 1000);

      stopCallback = () => {
        try { src.stop(); } catch(e){}
        clearInterval(timer);
      };
    } else if (layer === 'keyboards') {
      // Periodic typing clicks
      const timer = setInterval(() => {
        const count = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < count; i++) {
          const delay = i * (90 + Math.random() * 50);
          setTimeout(() => {
            if (!tapePlaying || !activeAmbiences.keyboards) return;
            try {
              const osc = ctx.createOscillator();
              const bPass = ctx.createBiquadFilter();
              const pGain = ctx.createGain();
              osc.type = 'triangle';
              osc.frequency.setValueAtTime(120 + Math.random() * 80, ctx.currentTime);
              bPass.type = 'bandpass';
              bPass.frequency.setValueAtTime(900 + Math.random() * 500, ctx.currentTime);
              bPass.Q.setValueAtTime(2.5, ctx.currentTime);
              pGain.gain.setValueAtTime(0.06, ctx.currentTime);
              pGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);
              osc.connect(bPass);
              bPass.connect(pGain);
              pGain.connect(masterGain);
              osc.start();
              osc.stop(ctx.currentTime + 0.05);
            } catch(e){}
          }, delay);
        }
      }, 850);

      stopCallback = () => {
        clearInterval(timer);
      };
    } else if (layer === 'vinyl') {
      const humOsc = ctx.createOscillator();
      humOsc.type = 'sine';
      humOsc.frequency.setValueAtTime(50, ctx.currentTime);
      const humGain = ctx.createGain();
      humGain.gain.setValueAtTime(0.05, ctx.currentTime);
      humOsc.connect(humGain);
      humGain.connect(masterGain);
      humOsc.start();

      const timer = setInterval(() => {
        if (Math.random() > 0.4) {
          const osc = ctx.createOscillator();
          const pGain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(2500 + Math.random() * 3000, ctx.currentTime);
          pGain.gain.setValueAtTime(0.015 + Math.random() * 0.02, ctx.currentTime);
          pGain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.01 + Math.random() * 0.01);
          osc.connect(pGain);
          pGain.connect(masterGain);
          osc.start();
          osc.stop(ctx.currentTime + 0.03);
        }
      }, 350);

      stopCallback = () => {
        try { humOsc.stop(); } catch(e){}
        clearInterval(timer);
      };
    }

    ambientSynthsRef.current[layer] = {
      stop: () => {
        try {
          masterGain.gain.cancelScheduledValues(ctx.currentTime);
          masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
          masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
          setTimeout(() => {
            stopCallback();
            masterGain.disconnect();
          }, 450);
        } catch(e) {
          stopCallback();
          masterGain.disconnect();
        }
      }
    };
  };

  const stopSynthLayer = (layer: string) => {
    if (ambientSynthsRef.current[layer]) {
      ambientSynthsRef.current[layer].stop();
      delete ambientSynthsRef.current[layer];
    }
  };

  // Tape audio unmount cleanup
  useEffect(() => {
    return () => {
      // stop all playing synths on unmount
      Object.keys(ambientSynthsRef.current).forEach(layer => {
        try {
          ambientSynthsRef.current[layer].stop();
        } catch(e) {}
      });
    };
  }, []);

  // =========================================
  // ACTIONS / IMPLEMENTING USER MARKUP LOGICS
  // =========================================
  const addLink = () => {
    if (!linkTitle || !linkUrl) return;
    playSoundBlip(900, 'sine', 0.04);
    setLinks([...links, { id: Date.now(), title: linkTitle, url: linkUrl }]);
    setLinkTitle('');
    setLinkUrl('');
  };

  const deleteLink = (id: number) => {
    playSoundBlip(400, 'triangle', 0.05);
    setLinks(links.filter(l => l.id !== id));
  };

  const addMoodItem = () => {
    if (!moodInput) return;
    playSoundBlip(950, 'sine', 0.04);
    setMoods([...moods, { id: Date.now(), text: moodInput }]);
    setMoodInput('');
  };

  const deleteMood = (id: number) => {
    playSoundBlip(400, 'triangle', 0.05);
    setMoods(moods.filter(m => m.id !== id));
  };

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
        <a href="https://libro-folle.vercel.app/" target="_blank" rel="noopener noreferrer" className="dock-item eserciziario" data-tooltip="Libro Folle">✍</a>
        <a href="https://laboratorio-programmazione.vercel.app/" target="_blank" rel="noopener noreferrer" className="dock-item windows" data-tooltip="Ambiente Windows">🪟</a>
        <a href="https://photo-finder-kohl.vercel.app/" target="_blank" rel="noopener noreferrer" className="dock-item immagini" data-tooltip="Ricerca immagini">🖼</a>
        <a href="https://ricettario-internazionale.vercel.app/" target="_blank" rel="noopener noreferrer" className="dock-item ricettario" data-tooltip="Ricettario">🍳</a>
        <a href="https://film-finder-indol.vercel.app/" target="_blank" rel="noopener noreferrer" className="dock-item film" data-tooltip="Film">🎬</a>
        <a href="https://winamp-swart.vercel.app/" target="_blank" rel="noopener noreferrer" className="dock-item Musica" data-tooltip="Musica">🎧</a>
        <a href="https://ide-core.vercel.app/" target="_blank" rel="noopener noreferrer" className="dock-item Coding" data-tooltip="Edu Code">💻</a>
        <a href="https://tutor-programmazione.netlify.app/" target="_blank" rel="noopener noreferrer" className="dock-item Coding" data-tooltip="Tutor">🖥</a>
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

      {/* 4. MAIN FLUID MASONRY GRID CONTAINER */}
      <main className="main-content">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 [column-fill:balance] w-full">
          
          {/* =========================================
             ORIGINAL APP CARDS
             ========================================= */}

          {/* CARD A: RETRO IPOD PLAYER IFRAME */}
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
            {/* CARD D: LAVAGNA SLATE WOOD CHECKLIST */}
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
 {/* CARD EXTRA: RETRO PERSONAL COMPUTER DEVICE */}
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
          {/* ALBUM CSS GRANDE - CSS Artist Draft */}
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
             {/* TV BOX */}
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
              className="text-emerald-300 hover:text-white transition-colors duration-150 flex items-center gap-1 drop-shadow-[0_0_4px_rgba(52,211,153,0.5)]"
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
          {/* CARD B: NOTEBOOK PREFERITI */}
          <div className="desk-card card-links-app hover-rot-1" style={{ '--hover-rot': '-1deg' } as any}>
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
                className="w-full bg-slate-800 hover:bg-slate-700 active:translate-y-[1px] text-white py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all mt-1"
              >
                Aggiungi Link ＋
              </button>
            </div>

            <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
              {links.map(l => (
                <div key={l.id} className="link-item flex justify-between items-center bg-white/40 hover:bg-white/70 px-2 py-1.5 rounded transition-all">
                  <a href={l.url} target="_blank" rel="noopener noreferrer" className="truncate max-w-[85%] font-medium">
                    🔗 {l.title}
                  </a>
                  <button 
                    onClick={() => deleteLink(l.id)}
                    className="text-stone-400 hover:text-red-500 transition-all text-xs"
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

          {/* L'AGENDA (Ufficio / Utility) */}
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

          

          {/* USER INTERACTIVE EDITOR TESTO (Salva File in .txt) */}
          <div className="desk-card hover-rot-1" style={{ '--hover-rot': '0.5deg' } as any}>
            <div className="w-full bg-white border-4 border-stone-800 rounded-2xl shadow-[6px_6px_0_#292524] p-5 select-none text-stone-900">
              <h1 className="text-xl font-black mb-3 text-stone-800 flex items-center gap-2">
                <span>📝</span> Editor testo
              </h1>

              <label htmlFor="textInputSelector" className="block text-xs font-bold mb-1.5 text-stone-700">
                Scrivi o incolla il testo:
              </label>

              <textarea
                id="textInputSelector"
                rows={10}
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
                    className="px-4 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-black border-2 border-red-800 shadow-[0_2.5px_0_#7f1d1d] active:translate-y-0.5 active:shadow-none text-xs transition-all"
                  >
                    Salva file
                  </button>
                </div>
                {isStatusVisible && textStatusMsg && (
                  <p id="textStatusMsgSelector" className="text-[10px] font-bold text-center text-emerald-800 bg-emerald-50 border border-emerald-200 p-1.5 rounded-lg">
                    {textStatusMsg}
                  </p>
                )}
              </div>
            </div>
          </div>

         {/* EXTRA CARD 7.5: ARTIST PALETTE WITH 6 LINKS (PENULTIMA CARD) */}
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


          {/* CARD EXTRA: PORTAL CARDS */}
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
                        <a href="generatore-card-orientali.html" className="text-gray-700 hover:text-red-500 flex items-center gap-1.5">🧧 Creatore di Card Orientali</a>
                      </li>
                      <li className="hover:translate-x-1.5 transition-transform duration-200">
                        <a href="hanziBuilderPro.html" className="text-gray-700 hover:text-red-500 flex items-center gap-1.5">㊗ Hanzi Builder Pro</a>
                      </li>
                      <li className="hover:translate-x-1.5 transition-transform duration-200">
                        <a href="https://le-app-studio.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-500 flex items-center gap-1.5">🎓 App-Studio</a>
                      </li>
                      <li className="hover:translate-x-1.5 transition-transform duration-200">
                        <a href="https://whats-app-chat-designer.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-green-500 flex items-center gap-1.5">🗯 ChatBuilder</a>
                      </li>
                      <li className="hover:translate-x-1.5 transition-transform duration-200">
                        <a href="https://grammar-creator.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-yellow-600 flex items-center gap-1.5">📔 Grammar Creator</a>
                      </li>
                      <li className="hover:translate-x-1.5 transition-transform duration-200">
                        <a href="https://librocreator.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-orange-500 flex items-center gap-1.5">📙 Libro Creator</a>
                      </li>
                      <li className="hover:translate-x-1.5 transition-transform duration-200">
                        <a href="https://flashcard-creator.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-indigo-500 flex items-center gap-1.5">🎴 Flashcard Creator</a>
                      </li>
                      <li className="hover:translate-x-1.5 transition-transform duration-200">
                        <a href="https://linguaeditpro.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-purple-500 flex items-center gap-1.5">🗣 Lingua Edit Pro</a>
                      </li>
                      <li className="hover:translate-x-1.5 transition-transform duration-200">
                        <a href="https://dialogue-creator.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-pink-500 flex items-center gap-1.5">💬 Dialogue Creator</a>
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

          {/* CARD C: CALENDARIO STRAPPATO IFRAME */}
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

        
         

          {/* CARD G: MONITOR IFRAME FOR SNIPPET CREATOR */}
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

          {/* CARD H: FAT CAT WIDGET WITH MOVING SWAY TAIL */}
          <div className="desk-card hover-rot-1" style={{ '--hover-rot': '-1deg' } as any}>
            <div className="relative w-full max-w-[340px] mx-auto mt-6">
              {/* Cat Ears */}
              <div className="absolute -top-5 left-6 w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[26px] border-b-orange-400 transform -rotate-12"></div>
              <div className="absolute -top-5 right-6 w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[26px] border-b-orange-400 transform rotate-12"></div>

              {/* Cat Body Card */}
              <div className="bg-orange-400 rounded-[2rem] p-6 shadow-2xl relative z-20 border-4 border-orange-500 flex flex-col items-center">
                {/* Face details */}
                <div className="flex justify-center items-center gap-6 mb-4 mt-1">
                  {/* SX eye */}
                  <div className="w-4 h-4 bg-gray-900 rounded-full relative overflow-hidden">
                    <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  {/* Mouth/Whiskers */}
                  <div className="relative flex flex-col items-center">
                    <div className="w-3.5 h-2 bg-pink-300 rounded-full z-10"></div>
                    <div className="absolute top-1 -left-4 w-3 h-0.5 bg-orange-200 rotate-12 rounded-full"></div>
                    <div className="absolute top-2.5 -left-4 w-3 h-0.5 bg-orange-200 -rotate-12 rounded-full"></div>
                    <div className="absolute top-1 -right-4 w-3 h-0.5 bg-orange-200 -rotate-12 rounded-full"></div>
                    <div className="absolute top-2.5 -right-4 w-3 h-0.5 bg-orange-200 rotate-12 rounded-full"></div>
                  </div>
                  {/* DX eye */}
                  <div className="w-4 h-4 bg-gray-900 rounded-full relative overflow-hidden">
                    <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                </div>

                <h4 className="text-white font-bold text-lg mb-4 tracking-wider font-sans">I Miei Link</h4>

                <div className="w-full bg-white/95 rounded-2xl p-4 flex flex-col gap-2 shadow-inner">
                  <a href="https://character-marker.vercel.app/" className="flex items-center gap-2 p-2.5 bg-orange-50 hover:bg-orange-100 hover:-translate-y-[2px] rounded-xl transition-all text-orange-900 font-semibold text-xs shadow-sm">
                    🐱 Character Marker
                  </a>
                  <a href="generatore-kawaii.hltm" className="flex items-center gap-2 p-2.5 bg-orange-50 hover:bg-orange-100 hover:-translate-y-[2px] rounded-xl transition-all text-orange-900 font-semibold text-xs shadow-sm">
                    👑 Generatore di Kawaii
                  </a>
                  <a href="character-engine.html" className="flex items-center gap-2 p-2.5 bg-orange-50 hover:bg-orange-100 hover:-translate-y-[2px] rounded-xl transition-all text-orange-900 font-semibold text-xs shadow-sm">
                    🦊 CSS_ENGINE v5.1
                  </a>
                  <a href="anatomy.html" className="flex items-center gap-2 p-2.5 bg-orange-50 hover:bg-orange-100 hover:-translate-y-[2px] rounded-xl transition-all text-orange-900 font-semibold text-xs shadow-sm">
                    🤵 Anatomy Sculptor Pro
                  </a>
                  <a href="anatomy2.html" className="flex items-center gap-2 p-2.5 bg-orange-50 hover:bg-orange-100 hover:-translate-y-[2px] rounded-xl transition-all text-orange-900 font-semibold text-xs shadow-sm">
                    🧸 Anatomy Blueprint Studio
                  </a>
                  <a href="https://css-artist-lab.netlify.app/" className="flex items-center gap-2 p-2.5 bg-orange-50 hover:bg-orange-100 hover:-translate-y-[2px] rounded-xl transition-all text-orange-900 font-semibold text-xs shadow-sm">
                    🐾 Css Artist Lab
                  </a>
                </div>
              </div>

              {/* Swaying cat tail element */}
              <div 
                className="absolute -bottom-5 -right-2 w-16 h-16 border-b-8 border-r-8 border-orange-400 rounded-br-full transition-transform duration-500 ease-in-out hover:rotate-12 cursor-pointer z-10"
                onClick={() => playSoundBlip(880, 'sine', 0.05)}
              ></div>
            </div>
          </div>

          {/* CARD I: SMARTPHONE BEZEL OVERLAY FOR BOOKS */}
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


          {/* =========================================
             NATIVE EXTRA FLUID CARDS
             ========================================= */}

          {/* EXTRA CARD 1: STICKY NOTES APP (POST-IT BOARD) */}
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
                className="w-full bg-yellow-600/25 hover:bg-yellow-600/40 text-stone-900 text-[10px] font-bold py-1 rounded transition-all "
              >
                Aggiungi Nota Rapida
              </button>
            </div>

            <div className="space-y-2 max-h-[180px] overflow-y-auto">
              {notes.map((note, index) => (
                <div key={index} className="flex justify-between items-start bg-yellow-200/40 p-2 rounded text-xs text-stone-800 font-sans border border-yellow-500/10">
                  <span className="leading-tight font-medium">{note}</span>
                  <button onClick={() => deleteNote(index)} className="text-stone-600 hover:text-red-500 pl-2">
                    ✕
                  </button>
                </div>
              ))}
              {notes.length === 0 && (
                <div className="text-center text-[10px] italic text-stone-600">Nessun promemoria attivo.</div>
              )}
            </div>
          </div>

          {/* EXTRA CARD 2: REFRESHING COLOR MARKERS & COASTER */}
          <div className="desk-card bg-neutral-800/80 p-5 rounded-3xl border border-white/5 hover-rot-1" style={{ '--hover-rot': '1deg' } as any}>
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-teal-300 font-mono text-sm leading-tight uppercase tracking-wider">Colored Markers 🖍️</span>
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

          {/* EXTRA CARD 3: RETRO SWISS CUCKOO CLOCK */}
          <div className="desk-card bg-[#5c4033] p-5 rounded-[2rem] border-4 border-[#3d2a21] shadow-2xl relative w-full" style={{ '--hover-rot': '-1deg' } as any}>
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#3d2a21] rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
            </div>

            <div className="text-center text-white mt-1">
              <span className="font-semibold text-xs text-yellow-400 uppercase tracking-widest block mb-1">Cuckoo Timepiece & Pomodoro</span>
              <div className="font-mono text-xl bg-orange-950/80 text-orange-200 py-1.5 rounded-xl border border-orange-900 inline-block px-4 font-bold tracking-widest shadow-inner">
                {currentTime.toLocaleTimeString('it-IT')}
              </div>
            </div>

            {/* Swing pendulum container */}
            <div className="flex justify-center my-4 h-12 relative overflow-hidden">
              <div className="pendulum-arm w-1 bg-amber-700 h-10 rounded-full relative">
                <div className="absolute bottom-0 -left-2 w-5 h-5 bg-yellow-500 rounded-full border border-yellow-600"></div>
              </div>
            </div>

            {/* Focus pomodoro timer interface */}
            <div className="bg-stone-950/70 rounded-2xl p-3 border border-amber-900/30">
              <div className="flex justify-between text-[10px] text-orange-200/70 font-mono mb-2">
                <span>STAGE: {pomoMode.toUpperCase()}</span>
                <span>STATE: {pomoActive ? 'WORKING' : 'PAUSED'}</span>
              </div>

              <div className="text-center font-mono text-3xl font-bold tracking-widest my-1 text-amber-400">
                {String(pomoMinutes).padStart(2, '0')}:{String(pomoSeconds).padStart(2, '0')}
              </div>

              <div className="flex gap-2 justify-center mt-3">
                <button 
                  onClick={togglePomo} 
                  className={`px-3 py-1 rounded text-[10px] font-bold flex items-center gap-1 ${pomoActive ? 'bg-red-800 text-red-150 hover:bg-red-700' : 'bg-emerald-800 text-emerald-150 hover:bg-emerald-700'} cursor-pointer`}
                >
                  {pomoActive ? 'PAUSA' : 'START'}
                </button>
                <button onClick={resetPomo} className="bg-[#3d2a21] hover:bg-[#52382c] px-3 py-1 text-stone-200 rounded text-[10px] font-bold flex items-center gap-1">
                  RESET
                </button>
              </div>
            </div>
          </div>
          
          {/* CARD EXTRA: RETRO CRT MONITOR PORTAL ENTRÈE */}
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
                        className="matrix-link"
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
                        className="matrix-link"
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
                        className="matrix-link"
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
                        className="matrix-link"
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
          
           {/* CARD E: MOOD BOARD CORKBOARD */}
          <div className="desk-card card-mood hover-rot-1" style={{ '--hover-rot': '1deg' } as any}>
            <div className="font-bold text-white tracking-wide text-lg mb-3" style={{ textShadow: '1px 1.5px #5c4033' }}>
              Mood Board 🖼️
            </div>
            
            <div className="flex gap-1.5 mb-4">
              <input 
                type="text" 
                placeholder="URL Foto o Pensiero..." 
                value={moodInput}
                onChange={(e) => setMoodInput(e.target.value)}
                className="bg-white/95 text-xs text-stone-800 rounded px-2 py-1.5 flex-grow font-sans border border-amber-900/20 shadow-inner"
              />
              <button 
                onClick={addMoodItem}
                className="bg-green-700 hover:bg-green-600 font-bold px-3 py-1 text-white rounded cursor-pointer text-xs"
              >
                📌
              </button>
            </div>

            <div className="mood-display">
              {moods.map(item => {
                const isImg = item.text.startsWith('http') || item.text.includes('.png') || item.text.includes('.jpg') || item.text.includes('.jpeg') || item.text.includes('picsum');
                return (
                  <div key={item.id} className="mood-item" style={{ '--r': `${(item.id % 8) - 4}deg` } as any}>
                    <button 
                      onClick={() => deleteMood(item.id)}
                      className="remove-mood"
                    >
                      ✕
                    </button>
                    {isImg ? (
                      <img src={item.text} alt="Mood board snap" className="rounded-sm" />
                    ) : null}
                    <div className="caption truncate">
                      {isImg ? 'Inspiration' : item.text}
                    </div>
                  </div>
                );
              })}
              {moods.length === 0 && (
                <div className="col-span-2 text-center text-xs text-stone-100 italic py-6">Sughero vuoto</div>
              )}
            </div>
          </div>

          {/* CARD F: MACOS VSCODE DEVTOOLS EDITOR */}
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
   {/* CARD EXTRA: JSON EDITOR */}
          <div className="desk-card hover-rot-1" style={{ '--hover-rot': '1deg' } as any}>
            <div className="w-full bg-white border-4 border-stone-800 rounded-2xl shadow-[6px_6px_0_#292524] p-5 select-none text-stone-900 relative">
              {/* Badge JSON */}
              <div className="absolute -top-3.5 right-4 bg-pink-400 text-stone-900 border-2 border-stone-800 px-3 py-1 font-black uppercase tracking-wider rotate-6 text-2xs z-10">
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
                  className="text-2xs font-extrabold text-blue-600 hover:text-blue-800 underline cursor-pointer"
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
                  <p id="jsonStatusMsgSelector" className={`text-[10px] font-bold text-center p-1.5 rounded-lg border ${
                    isJsonError 
                      ? "text-red-800 bg-red-50 border-red-200" 
                      : "text-emerald-800 bg-emerald-50 border-emerald-200"
                  }`}>
                    {isJsonError ? "❌ " : "✅ "}
                    {jsonStatusMsg}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* EXTRA CARD 4: RETRO ARCADE TAMAGOTCHI PET */}
          <div className="desk-card bg-[#38bdf8] p-5 rounded-[2rem] border-4 border-[#0284c7] shadow-2xl relative w-full" style={{ '--hover-rot': '1.5deg' } as any}>
            <div className="flex justify-center mb-1">
              <span className="bg-[#0284c7] text-white font-mono font-black text-[9px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                Pocket Tamagotchi
              </span>
            </div>

            {/* Glowing pixel screen representation */}
            <div className="bg-[#a8a29e] rounded-xl p-3 border-4 border-stone-800 shadow-inner relative text-stone-900 min-h-[140px] font-mono">
              <div className="flex justify-between text-[8px] border-b border-stone-900/35 pb-1 mb-2 font-bold uppercase">
                <span>🍖 Cibo: {100 - petHunger}%</span>
                <span>❤️ Gioia: {petHappy}%</span>
              </div>

              <div className="flex flex-col items-center justify-center pt-2">
                {petAction === 'idle' && (
                  <div className="bouncing-pet text-4xl cursor-pointer" onClick={() => interactPet('play')}>
                    👾
                  </div>
                )}
                {petAction === 'eating' && (
                  <div className="bouncing-pet text-4xl">
                    🍕 👾
                  </div>
                )}
                {petAction === 'playing' && (
                  <div className="bouncing-pet text-4xl">
                    🎾 👾
                  </div>
                )}
                {petAction === 'sleeping' && (
                  <div className="text-4xl">
                    💤 👾
                  </div>
                )}
                <span className="text-[10px] font-bold tracking-widest mt-2">{petName.toUpperCase()}</span>
                {petAction === 'sleeping' && <span className="text-[7.5px] italic">Stanno riposando...</span>}
              </div>
            </div>

            {/* Retro Action buttons grid overlay */}
            <div className="grid grid-cols-3 gap-1.5 mt-4">
              <button 
                onClick={() => interactPet('feed')}
                disabled={petAction === 'sleeping'}
                className="bg-sky-900 hover:bg-sky-800 disabled:opacity-45 text-white rounded-lg p-1.5 text-[9px] font-bold cursor-pointer"
              >
                Cibo 🍉
              </button>
              <button 
                onClick={() => interactPet('play')}
                disabled={petAction === 'sleeping'}
                className="bg-sky-900 hover:bg-sky-800 disabled:opacity-45 text-white rounded-lg p-1.5 text-[9px] font-bold cursor-pointer"
              >
                Gioca 🎾
              </button>
              <button 
                onClick={() => interactPet('sleep')}
                className="bg-amber-900 hover:bg-amber-800 text-white rounded-lg p-1.5 text-[9px] font-bold cursor-pointer"
              >
                {petAction === 'sleeping' ? 'SVEGLIA' : 'SONNO'}
              </button>
            </div>
          </div>

          {/* EXTRA CARD 5: RETRO CASSETTE TAPE RECORDER */}
          <div className="desk-card bg-neutral-900 p-5 rounded-[1.8rem] border-4 border-neutral-750 shadow-2xl relative w-full" style={{ '--hover-rot': '-1deg' } as any}>
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-amber-500 font-mono text-xs tracking-wider">SOUND DECK CASSETTE</span>
              <button 
                onClick={toggleTapePlay}
                className={`py-1 px-3.5 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 shadow ${tapePlaying ? 'bg-amber-500 text-black animate-pulse' : 'bg-stone-800 text-amber-500'} cursor-pointer`}
              >
                {tapePlaying ? 'ACTIVE' : 'POWER'}
              </button>
            </div>

            {/* Simulated Tape reels graphic wrapper */}
            <div className="relative bg-stone-950 rounded-xl p-3 border-2 border-stone-850 h-[80px] flex justify-around items-center mb-4 overflow-hidden shadow-inner">
              <div className="w-10 h-10 rounded-full bg-slate-800 border-4 border-dashed border-slate-600 flex items-center justify-center">
                <div className={`w-3 h-3 bg-stone-950 rounded-full ${tapePlaying ? 'spinning-reel' : ''}`}></div>
              </div>
              <div className="w-[80px] h-2 bg-stone-900/80 rounded relative">
                <div className="absolute left-2 w-3 h-2 bg-red-600 rounded"></div>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 border-4 border-dashed border-slate-600 flex items-center justify-center">
                <div className={`w-3 h-3 bg-stone-950 rounded-full ${tapePlaying ? 'spinning-reel' : ''}`}></div>
              </div>
            </div>

            {/* Toggle ambient sounds */}
            <div className="flex flex-col gap-2 font-mono text-[9.5px]">
              <button 
                onClick={() => toggleSoundLayer('rain')}
                className={`flex justify-between items-center p-1.5 px-2.5 rounded transition-all ${activeAmbiences.rain ? 'bg-sky-900/60 text-sky-200 border border-sky-400/30' : 'bg-stone-850 text-stone-400 hover:text-stone-300'} cursor-pointer`}
              >
                <span>🌧️ Pioggia Autunnale</span>
                <span className="font-bold">{activeAmbiences.rain ? 'ON' : 'OFF'}</span>
              </button>

              <button 
                onClick={() => toggleSoundLayer('cafe')}
                className={`flex justify-between items-center p-1.5 px-2.5 rounded transition-all ${activeAmbiences.cafe ? 'bg-amber-900/60 text-amber-200 border border-amber-400/30' : 'bg-stone-850 text-stone-400 hover:text-stone-300'} cursor-pointer`}
              >
                <span>☕ Rumore Caffetteria</span>
                <span className="font-bold">{activeAmbiences.cafe ? 'ON' : 'OFF'}</span>
              </button>

              <button 
                onClick={() => toggleSoundLayer('keyboards')}
                className={`flex justify-between items-center p-1.5 px-2.5 rounded transition-all ${activeAmbiences.keyboards ? 'bg-purple-900/60 text-purple-200 border border-purple-400/30' : 'bg-stone-850 text-stone-400 hover:text-stone-300'} cursor-pointer`}
              >
                <span>⌨️ Tastiera Meccanica</span>
                <span className="font-bold">{activeAmbiences.keyboards ? 'ON' : 'OFF'}</span>
              </button>

              <button 
                onClick={() => toggleSoundLayer('vinyl')}
                className={`flex justify-between items-center p-1.5 px-2.5 rounded transition-all ${activeAmbiences.vinyl ? 'bg-emerald-900/60 text-emerald-200 border border-emerald-400/30' : 'bg-stone-850 text-stone-400 hover:text-stone-300'} cursor-pointer`}
              >
                <span>📻 Fruscio Vinile</span>
                <span className="font-bold">{activeAmbiences.vinyl ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>

          {/* EXTRA CARD 6: INTERACTIVE TIC-TAC-TOE ON TORN NOTEBOOK */}
          <div className="desk-card squared-paper p-5 rounded-md hover-rot-1" style={{ '--hover-rot': '1deg' } as any}>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-stone-800 font-sans tracking-wide leading-none">Tris del Gatto 🐾</span>
              <button onClick={resetGame} className="px-2 py-0.5 rounded bg-stone-200 hover:bg-stone-300 text-[9.5px] font-sans font-bold text-stone-800">
                Resetta
              </button>
            </div>

            <p className="text-[10px] text-stone-500 font-sans mb-3 leading-tight">
              Sfida Cat-Bot in questo vecchio quaderno caotico. Fai 3 segni consecutivi!
            </p>

            <div className="grid grid-cols-3 gap-1 bg-stone-300 rounded p-1 max-w-[180px] mx-auto">
              {board.map((cell, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCellClick(idx)}
                  className="w-14 h-14 bg-stone-50 hover:bg-stone-100 flex items-center justify-center font-sans font-black text-2xl text-stone-800 transition-all rounded cursor-pointer"
                >
                  {cell === 'X' && <span className="text-pink-600">X</span>}
                  {cell === 'O' && <span className="text-blue-600">O</span>}
                </button>
              ))}
            </div>

            {gameResult && (
              <div className="text-center font-bold text-xs text-stone-900 mt-3 font-sans leading-none">
                Risultato: {gameResult}
              </div>
            )}
          </div>

          {/* EXTRA CARD 7: DEVELOPER TAROTS & DIVINATIONS */}
          <div className="desk-card bg-indigo-950 p-5 rounded-3xl border-4 border-indigo-900 shadow-2xl text-center relative w-full overflow-hidden" style={{ '--hover-rot': '-1.5deg' } as any}>
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-pink-500 via-indigo-500 to-sky-500"></div>
            
            <div className="font-bold text-yellow-300 text-xs tracking-wider uppercase mb-3 mt-1 font-mono">
              🔮 Tarocchi del Programmatore
            </div>

            <div className="bg-gradient-to-tr from-indigo-900 to-slate-900 rounded-2xl p-4 border border-indigo-800 text-stone-100 min-h-[145px] flex flex-col justify-between mb-4 shadow-inner relative">
              <div>
                <span className="text-[10px] text-pink-400 font-semibold uppercase tracking-wider block mb-1">CARTA PRESENTE</span>
                <h4 className="font-extrabold text-base text-yellow-100 tracking-wide">{activeFortune.text}</h4>
                <p className="text-[11px] text-stone-300 italic leading-snug tracking-wider mt-3 font-medium">
                  "{activeFortune.motto}"
                </p>
              </div>
              <div className="text-[8px] border-t border-indigo-800/60 pt-2 text-indigo-300 font-mono tracking-wide uppercase">
                Stato astrale: {activeFortune.status}
              </div>
            </div>

            <button 
              onClick={shuffleFortune}
              className="w-full bg-indigo-700 hover:bg-indigo-600 active:translate-y-px text-white rounded-lg text-xs font-bold py-1.5 uppercase tracking-widest transition-all"
            >
              Pesca un'altra carta 🔮
            </button>
          </div>

          {/* EXTRA CARD 8: INTERACTIVE COFFEE DISH FORTUNE MUG */}
          <div className="desk-card bg-amber-900/10 p-5 rounded-3xl border-2 border-amber-900/20 shadow-xl relative w-full" style={{ '--hover-rot': '1deg' } as any}>
            {/* Coffee stain ring behind */}
            <div className="absolute top-4 left-4 w-24 h-24 rounded-full border-4 border-amber-900/10 pointer-events-none"></div>
            
            <div className="flex justify-between items-center mb-3 text-amber-300">
              <span className="font-bold text-stone-200 text-xs tracking-wider uppercase font-mono">Isola del Caffè ☕</span>
              <span className="text-[10px] font-mono text-amber-400/90 font-bold">CARICHE: {coffeeSips}/3</span>
            </div>

            <div className="flex justify-center items-center my-4 relative">
              {/* Cup container click to sip */}
              <button 
                onClick={sipCoffee} 
                className="w-20 h-20 bg-stone-890 hover:bg-stone-840 rounded-full border-4 border-amber-700 flex flex-col items-center justify-center transition-all active:scale-95 cursor-pointer relative shadow-lg"
              >
                <span className="text-3xl filter drop-shadow">☕</span>
                <div className="absolute top-1 rotate-12 flex space-x-1">
                  <span className="steam-smoke block w-0.5 h-3 bg-white/40 rounded"></span>
                  <span className="steam-smoke block w-0.5 h-4 bg-white/40 rounded delay-75"></span>
                  <span className="steam-smoke block w-0.5 h-3 bg-white/40 rounded delay-150"></span>
                </div>
              </button>
            </div>

            <div className="bg-stone-900/60 rounded-xl p-3 border border-amber-900/15 text-center min-h-[60px] flex items-center justify-center mb-3 select-none">
              <p className="text-[10px] font-sans italic text-stone-300 leading-normal">
                {coffeeQuote}
              </p>
            </div>

            {coffeeSips === 0 && (
              <button 
                onClick={refillCoffee}
                className="w-full bg-amber-800 hover:bg-amber-700 text-white rounded-lg text-xs font-bold py-1 font-mono uppercase tracking-widest"
              >
                Riempi tazza 🔄
              </button>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

