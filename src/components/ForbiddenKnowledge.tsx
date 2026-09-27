import React, { useState } from 'react';
import { FORBIDDEN_TEXTS } from '../lib/loreData';
import { ForbiddenText } from '../types';
import { triggerHaptic } from '../lib/audio';
import { ShieldCheck, BookOpen, Eye, Search, Flame, Lock } from 'lucide-react';

export const ForbiddenKnowledge: React.FC = () => {
  const [selectedText, setSelectedText] = useState<ForbiddenText>(FORBIDDEN_TEXTS[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTexts = FORBIDDEN_TEXTS.filter((t) => {
    if (!searchQuery) return true;
    return (
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.origin.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-red-950/50 to-stone-900 p-6 rounded-2xl border border-red-800/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <ShieldCheck className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-serif font-bold text-amber-200">
              Forbidden Knowledge & Ways of the Old Ones
            </h2>
          </div>
          <p className="text-sm text-red-300/70 font-serif">
            Primordial void archives, Hermetic axioms, antediluvian tablets, and Nag Hammadi esoteric revelations.
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-stone-950 px-3 py-2 rounded-xl border border-red-900/50">
          <Search className="w-4 h-4 text-red-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lore archives..."
            className="bg-transparent text-amber-100 text-xs font-serif focus:outline-none w-36"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Lore Selection List */}
        <div className="lg:col-span-4 space-y-2">
          <label className="block text-xs font-mono uppercase text-red-400 mb-2">
            Archived Codices ({filteredTexts.length})
          </label>

          {filteredTexts.map((txt) => (
            <button
              key={txt.id}
              onClick={() => {
                setSelectedText(txt);
                triggerHaptic(50);
              }}
              className={`w-full p-3.5 rounded-xl text-left border text-xs font-serif transition-all ${
                selectedText.id === txt.id
                  ? 'bg-red-950/90 border-red-500 text-amber-100 shadow-lg'
                  : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:border-red-900/50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-amber-200 text-sm line-clamp-1">{txt.title}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-950 text-red-400 border border-red-900/40">
                  {txt.secretLevel}
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-mono line-clamp-2">{txt.summary}</p>
            </button>
          ))}
        </div>

        {/* Lore Reader Column */}
        {selectedText && (
          <div className="lg:col-span-8 bg-stone-900/90 p-6 rounded-2xl border border-red-900/40 space-y-5 shadow-2xl">
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono uppercase bg-red-950 text-red-300 px-2 py-0.5 rounded border border-red-800/40">
                  Category: {selectedText.category}
                </span>
                <span className="text-xs font-mono text-stone-400">
                  Origin: {selectedText.origin} ({selectedText.era})
                </span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-amber-200 mt-2">
                {selectedText.title}
              </h3>
            </div>

            {/* Key Axioms / Principles */}
            <div className="bg-stone-950 p-4 rounded-xl border border-red-900/30 space-y-2">
              <h4 className="text-xs font-mono uppercase text-amber-400 flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Key Arcane Principles & Formulae</span>
              </h4>
              <ul className="space-y-1.5 text-xs font-serif text-amber-100/90 list-disc list-inside">
                {selectedText.keyPrinciples.map((kp, idx) => (
                  <li key={idx} className="leading-relaxed">{kp}</li>
                ))}
              </ul>
            </div>

            {/* Full Text Reader Frame */}
            <div className="bg-stone-950/80 p-5 rounded-xl border border-stone-800 space-y-2">
              <h4 className="text-xs font-mono uppercase text-stone-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Unshackled Codex Text</span>
              </h4>
              <p className="text-sm font-serif text-amber-100/90 whitespace-pre-wrap leading-relaxed tracking-wide font-sans">
                {selectedText.fullText}
              </p>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
