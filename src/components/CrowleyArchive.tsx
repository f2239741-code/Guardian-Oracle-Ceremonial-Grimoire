import React, { useState } from 'react';
import { CROWLEY_QUOTES, HISTORICAL_OPERATIONS, MagicalOperationHistory } from '../lib/crowleyData';
import { triggerHaptic } from '../lib/audio';
import { Quote, BookOpen, ShieldAlert, Sparkles, RefreshCw, Search, Flame } from 'lucide-react';

export const CrowleyArchive: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'quotes' | 'operations'>('quotes');
  const [selectedOperation, setSelectedOperation] = useState<MagicalOperationHistory | null>(HISTORICAL_OPERATIONS[0]);
  const [randomQuote, setRandomQuote] = useState(CROWLEY_QUOTES[0]);

  const handleRandomizeQuote = () => {
    const idx = Math.floor(Math.random() * CROWLEY_QUOTES.length);
    setRandomQuote(CROWLEY_QUOTES[idx]);
    triggerHaptic(50);
  };

  const filteredQuotes = CROWLEY_QUOTES.filter((q) => {
    if (selectedCategory === 'all') return true;
    return q.category === selectedCategory;
  });

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950/40 to-stone-900 p-6 rounded-2xl border border-amber-800/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Quote className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-serif font-bold text-amber-200">
              Aleister Crowley & Magical Operations Archives
            </h2>
          </div>
          <p className="text-sm text-amber-300/70 font-serif">
            Axioms of Thelema, Liber AL vel Legis, and complete historical operational context for high ceremonial magic.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-stone-950 p-1.5 rounded-xl border border-amber-900/50">
          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-3 py-1.5 rounded-lg text-xs font-serif font-semibold transition-all ${
              activeTab === 'quotes'
                ? 'bg-amber-900 text-amber-100 shadow-md'
                : 'text-stone-400 hover:text-amber-200'
            }`}
          >
            Axioms & Quotes
          </button>
          <button
            onClick={() => setActiveTab('operations')}
            className={`px-3 py-1.5 rounded-lg text-xs font-serif font-semibold transition-all ${
              activeTab === 'operations'
                ? 'bg-amber-900 text-amber-100 shadow-md'
                : 'text-stone-400 hover:text-amber-200'
            }`}
          >
            Historical Operations Context
          </button>
        </div>
      </div>

      {/* Featured Quote Card */}
      <div className="bg-stone-900/90 p-6 rounded-2xl border border-amber-800/50 shadow-xl space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase text-amber-400 tracking-widest flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Featured Thelemic Oracle</span>
          </span>
          <button
            onClick={handleRandomizeQuote}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-950 hover:bg-stone-800 border border-amber-800/40 text-xs font-mono text-amber-300 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span>Randomize Oracle Axiom</span>
          </button>
        </div>

        <blockquote className="text-xl sm:text-2xl font-serif text-amber-100 italic leading-relaxed border-l-4 border-amber-500 pl-4 py-1">
          "{randomQuote.quote}"
        </blockquote>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-stone-400 pt-2">
          <span className="text-amber-300 font-semibold">{randomQuote.source} ({randomQuote.year})</span>
          <span className="bg-amber-950 text-amber-400 px-2 py-0.5 rounded border border-amber-800/40 uppercase">
            Context: {randomQuote.category}
          </span>
        </div>

        <div className="bg-stone-950 p-3 rounded-xl border border-amber-900/30 text-xs font-serif text-amber-200/80 mt-2">
          <strong className="text-amber-400">Historical Operational Context:</strong> {randomQuote.operationContext}
        </div>
      </div>

      {/* Quotes Tab View */}
      {activeTab === 'quotes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-serif font-bold text-amber-200">
              Thelemic Axiom Library
            </h3>
            <div className="flex items-center gap-2 text-xs font-mono">
              {['all', 'Thelema', 'Magick', 'Will', 'Invocation', 'Astral'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg border uppercase transition-all ${
                    selectedCategory === cat
                      ? 'bg-amber-950 border-amber-500 text-amber-200'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-amber-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredQuotes.map((q) => (
              <div
                key={q.id}
                className="bg-stone-900/90 p-5 rounded-2xl border border-amber-900/40 space-y-3 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <p className="font-serif text-amber-100 text-sm italic mb-2">
                    "{q.quote}"
                  </p>
                  <p className="text-xs font-mono text-amber-400 font-semibold">
                    — {q.source}
                  </p>
                </div>
                <div className="text-[11px] font-serif text-stone-300 bg-stone-950 p-2.5 rounded-xl border border-stone-800">
                  {q.operationContext}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Historical Operations Tab View */}
      {activeTab === 'operations' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-5 space-y-2">
            <label className="block text-xs font-mono uppercase text-amber-400 mb-2">
              Select Grimoire / Operation
            </label>
            {HISTORICAL_OPERATIONS.map((op) => (
              <button
                key={op.id}
                onClick={() => setSelectedOperation(op)}
                className={`w-full p-3.5 rounded-xl text-left border text-xs font-serif transition-all ${
                  selectedOperation?.id === op.id
                    ? 'bg-amber-950/90 border-amber-500 text-amber-100 shadow-md'
                    : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:border-amber-900/50'
                }`}
              >
                <div className="font-bold text-amber-200 text-sm mb-0.5">{op.title}</div>
                <div className="text-[11px] text-stone-400 font-mono">{op.grimoireOrigin}</div>
              </button>
            ))}
          </div>

          {selectedOperation && (
            <div className="lg:col-span-7 bg-stone-900/90 p-6 rounded-2xl border border-amber-800/40 space-y-4 shadow-xl">
              <h3 className="text-xl font-serif font-bold text-amber-200">
                {selectedOperation.title}
              </h3>
              <p className="text-xs font-mono text-amber-400">
                Source Lineage: {selectedOperation.grimoireOrigin}
              </p>

              <div className="space-y-3 font-serif text-xs text-stone-200">
                <div className="bg-stone-950 p-3.5 rounded-xl border border-amber-900/30">
                  <strong className="text-amber-400 block font-mono text-[11px] uppercase mb-1">
                    Historical Operational Context
                  </strong>
                  <p className="leading-relaxed">{selectedOperation.historicalContext}</p>
                </div>

                <div className="bg-stone-950 p-3.5 rounded-xl border border-amber-900/30">
                  <strong className="text-amber-400 block font-mono text-[11px] uppercase mb-1">
                    Ritual Purpose & Manifestation
                  </strong>
                  <p className="leading-relaxed">{selectedOperation.ritualPurpose}</p>
                </div>

                <div className="bg-stone-950 p-3.5 rounded-xl border border-amber-900/30">
                  <strong className="text-amber-400 block font-mono text-[11px] uppercase mb-1">
                    Key Ceremonial Formula
                  </strong>
                  <p className="font-mono text-amber-200">{selectedOperation.keyFormula}</p>
                </div>

                <div className="bg-red-950/60 p-3.5 rounded-xl border border-red-800/40 text-red-200 flex items-start gap-2.5">
                  <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-mono text-[11px] uppercase text-red-400 block">
                      Initiatory Notice
                    </strong>
                    <p className="text-xs">{selectedOperation.warningNotice}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
