import React, { useState } from 'react';
import { CIPHER_MATRICES, translateToCipher } from '../lib/translationData';
import { Sparkles, Terminal, Cpu, Copy, Check, Feather, BookOpen, ShieldAlert } from 'lucide-react';
import { triggerHaptic } from '../lib/audio';

export const EsotericTranslationCompanion: React.FC = () => {
  const [inputText, setInputText] = useState('WILL IS THE LAW');
  const [selectedCipher, setSelectedCipher] = useState(CIPHER_MATRICES[0].id);
  const [copied, setCopied] = useState(false);

  const currentCipherObj = CIPHER_MATRICES.find(c => c.id === selectedCipher) || CIPHER_MATRICES[0];
  const translatedOutput = translateToCipher(inputText, selectedCipher);

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedOutput);
    setCopied(true);
    triggerHaptic(60);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 text-stone-200">
      
      {/* Main Header Banner */}
      <div className="border border-amber-500/30 bg-stone-900/80 p-6 sm:p-8 rounded-2xl shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 p-4 text-amber-500/10 pointer-events-none">
          <Terminal className="w-32 h-32" />
        </div>

        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-amber-500/10 border border-amber-500/40 rounded-xl">
            <Sparkles className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-wider text-amber-200 uppercase">
              Esoteric Translation Companion & Cipher Matrix
            </h2>
            <p className="text-xs font-mono text-amber-400/70">
              Multi-Tier Occult Script Encoding & Symbolic Transmission Engine
            </p>
          </div>
        </div>

        <p className="text-sm font-serif text-stone-300 max-w-3xl leading-relaxed mt-2">
          Translate sovereign formulas and sacred intent across multi-tier occult alphabets including Theban Witches' Runes, Kabbalistic Malachim Angelic Scripts, and Enochian Prime Glyphs. Zero-latency client-side encoding for ritual sealing and ceremonial sigil craftsmanship.
        </p>

        {/* Cipher Selection Matrix */}
        <div className="mt-8">
          <label className="block text-xs font-mono uppercase tracking-widest text-amber-400 mb-3 flex items-center gap-2">
            <Feather className="w-3.5 h-3.5" />
            <span>Select Active Cipher Matrix</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CIPHER_MATRICES.map((cipher) => {
              const isActive = selectedCipher === cipher.id;
              return (
                <button
                  key={cipher.id}
                  onClick={() => {
                    setSelectedCipher(cipher.id);
                    triggerHaptic(40);
                  }}
                  className={`p-5 rounded-xl border text-left transition-all relative overflow-hidden group ${
                    isActive
                      ? 'border-amber-500 bg-amber-950/40 text-amber-100 shadow-xl shadow-amber-900/20 ring-1 ring-amber-500/50'
                      : 'border-stone-800 bg-stone-950/60 text-stone-400 hover:border-amber-900/50 hover:text-stone-200'
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-bl-full pointer-events-none" />
                  )}
                  <div className="font-serif font-bold text-base mb-1.5 text-amber-300 flex items-center justify-between">
                    <span>{cipher.name}</span>
                    <span className="text-[10px] font-mono uppercase bg-amber-950 text-amber-400 px-2 py-0.5 rounded border border-amber-800/40">
                      {cipher.id}
                    </span>
                  </div>
                  <div className="text-xs font-serif text-stone-400 leading-relaxed line-clamp-3">
                    {cipher.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Field */}
        <div className="space-y-2 mt-8">
          <label className="text-xs font-mono uppercase tracking-widest text-amber-400 flex items-center justify-between">
            <span>Source Manifestation Formula / Intent Text</span>
            <span className="text-stone-500 text-[11px]">{inputText.length} Characters</span>
          </label>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500/80 rounded-xl px-4 py-3.5 text-amber-100 font-serif text-base focus:outline-none transition-all shadow-inner"
            placeholder="ENTER RITUAL INTENT OR SACRED FORMULA..."
          />
        </div>

        {/* Encoded Output Box */}
        <div className="space-y-3 mt-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-amber-400" />
              <span>Cipher Encoded Matrix Output ({currentCipherObj.name})</span>
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 text-xs font-serif bg-amber-950/80 hover:bg-amber-900 text-amber-200 border border-amber-800/60 px-3.5 py-1.5 rounded-lg transition-all shadow-md active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'GLYPHS SEALED' : 'COPY GLYPHS'}</span>
            </button>
          </div>
          
          <div className="bg-stone-950 border border-amber-500/40 rounded-xl p-8 font-mono text-2xl sm:text-3xl tracking-widest text-amber-200 min-h-[120px] flex items-center justify-center text-center shadow-inner select-all overflow-x-auto break-all">
            {translatedOutput || '---'}
          </div>
        </div>

        {/* Cipher Analytical Details */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-amber-900/20 text-xs">
          <div className="bg-stone-950/80 p-4 rounded-xl border border-stone-800/80 space-y-1">
            <div className="font-serif font-bold text-amber-300 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Historical Context</span>
            </div>
            <p className="font-serif text-stone-400 leading-relaxed text-[11px]">
              Utilized historically to obscure sacred texts from uninitiated eyes and focus astral intent during ceremonial operations.
            </p>
          </div>

          <div className="bg-stone-950/80 p-4 rounded-xl border border-stone-800/80 space-y-1">
            <div className="font-serif font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Energetic Resonance</span>
            </div>
            <p className="font-serif text-stone-400 leading-relaxed text-[11px]">
              Transmutes standard linguistic vibration into non-conceptual symbolic resonance for subconscious manifestation.
            </p>
          </div>

          <div className="bg-stone-950/80 p-4 rounded-xl border border-stone-800/80 space-y-1">
            <div className="font-serif font-bold text-amber-300 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Zero-Trace Privacy</span>
            </div>
            <p className="font-serif text-stone-400 leading-relaxed text-[11px]">
              100% localized execution. All translations remain entirely client-side within your sovereign local environment.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
