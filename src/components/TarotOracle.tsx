import React, { useState } from 'react';
import { TarotCard, DailyTarotDraw } from '../types';
import { drawRandomTarot } from '../lib/tarotData';
import { triggerHaptic } from '../lib/audio';
import { Eye, RefreshCw, Save, Sparkles, Check, Flame, Compass, HelpCircle } from 'lucide-react';

interface TarotOracleProps {
  onSaveDrawToJournal?: (draw: { card: TarotCard; isReversed: boolean; notes?: string }) => void;
}

export const TarotOracle: React.FC<TarotOracleProps> = ({ onSaveDrawToJournal }) => {
  const [spreadMode, setSpreadMode] = useState<'single' | 'three'>('single');
  const [drawnCards, setDrawnCards] = useState<{ card: TarotCard; isReversed: boolean }[]>([]);
  const [question, setQuestion] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleDraw = () => {
    const count = spreadMode === 'single' ? 1 : 3;
    const result = drawRandomTarot(count);
    setDrawnCards(result);
    setIsFlipped(false);
    setIsSaved(false);
    triggerHaptic([80, 40, 120]);

    // Flip animation delay
    setTimeout(() => {
      setIsFlipped(true);
      triggerHaptic(100);
    }, 300);
  };

  const handleSaveToJournal = () => {
    if (drawnCards.length > 0 && onSaveDrawToJournal) {
      drawnCards.forEach((d) => {
        onSaveDrawToJournal({
          card: d.card,
          isReversed: d.isReversed,
          notes: `${question ? `Question: ${question}\n` : ''}${notes}`
        });
      });
      setIsSaved(true);
      triggerHaptic([100, 50, 150]);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-purple-950/40 to-stone-900 p-6 rounded-2xl border border-purple-800/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Eye className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-serif font-bold text-amber-200">
              Daily Tarot Oracle & Divination
            </h2>
          </div>
          <p className="text-sm text-purple-300/70 font-serif">
            Draw from the 78-card Hermetic & Thoth deck. Receive immediate interpretations, elemental correspondences, and magical wisdom.
          </p>
        </div>

        {/* Spread Selector */}
        <div className="flex items-center gap-1.5 bg-stone-950 p-1.5 rounded-xl border border-purple-800/40">
          <button
            onClick={() => setSpreadMode('single')}
            className={`px-3 py-1.5 rounded-lg text-xs font-serif font-semibold transition-all ${
              spreadMode === 'single'
                ? 'bg-purple-900 text-amber-200 shadow-md'
                : 'text-stone-400 hover:text-amber-200'
            }`}
          >
            Daily 1-Card Draw
          </button>
          <button
            onClick={() => setSpreadMode('three')}
            className={`px-3 py-1.5 rounded-lg text-xs font-serif font-semibold transition-all ${
              spreadMode === 'three'
                ? 'bg-purple-900 text-amber-200 shadow-md'
                : 'text-stone-400 hover:text-amber-200'
            }`}
          >
            3-Card Trinity Spread
          </button>
        </div>
      </div>

      {/* Question & Draw Trigger Box */}
      <div className="bg-stone-900/90 p-5 rounded-2xl border border-purple-900/30 space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase text-purple-300 mb-1.5 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span>Optional Inquiry / Manifestation Question for the Deck</span>
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. What forces align with my manifestation goal today?"
            className="w-full bg-stone-950 border border-purple-900/50 rounded-xl px-4 py-2.5 text-amber-100 font-serif text-sm focus:outline-none focus:border-purple-400"
          />
        </div>

        <button
          onClick={handleDraw}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-800 via-purple-950 to-stone-900 hover:from-purple-700 hover:to-stone-800 border border-purple-500/50 text-amber-100 font-serif font-bold text-base shadow-lg shadow-purple-950/80 flex items-center justify-center gap-3 transition-all"
        >
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>{drawnCards.length === 0 ? 'Draw Daily Tarot Pull' : 'Reshuffle & Draw New Pull'}</span>
        </button>
      </div>

      {/* Cards Display Section */}
      {drawnCards.length > 0 && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className={`grid grid-cols-1 ${spreadMode === 'three' ? 'md:grid-cols-3' : 'max-w-md mx-auto'} gap-6`}>
            {drawnCards.map((item, idx) => {
              const spreadLabels = ['Past Origin / Force', 'Present Vessel / Action', 'Manifestation Outcome'];
              return (
                <div
                  key={idx}
                  className={`bg-stone-900/90 rounded-2xl border border-purple-800/40 p-5 shadow-2xl flex flex-col justify-between transition-all duration-500 ${
                    isFlipped ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                >
                  <div>
                    {/* Spread Position Tag */}
                    {spreadMode === 'three' && (
                      <div className="text-[11px] font-mono text-purple-300/80 uppercase tracking-widest text-center bg-stone-950 py-1 px-2 rounded mb-3 border border-purple-900/40">
                        Position {idx + 1}: {spreadLabels[idx]}
                      </div>
                    )}

                    {/* Visual Card Artwork Frame */}
                    <div className="w-full aspect-[2/3] bg-gradient-to-b from-stone-950 via-purple-950/60 to-stone-950 rounded-xl p-4 border-2 border-amber-500/50 shadow-inner flex flex-col justify-between items-center text-center relative overflow-hidden group">
                      
                      {/* Element Badge */}
                      <div className="w-full flex items-center justify-between text-[11px] font-mono text-amber-400/80">
                        <span className="uppercase tracking-widest">{item.card.element}</span>
                        <span className="text-amber-300 font-bold">{item.isReversed ? '↺ REVERSED' : '🡅 UPRIGHT'}</span>
                      </div>

                      {/* Central Symbolic Glyph */}
                      <div className={`my-auto text-center ${item.isReversed ? 'rotate-180 transition-transform' : ''}`}>
                        <div className="text-5xl mb-2 text-amber-300 font-serif drop-shadow-[0_0_15px_rgba(225,169,60,0.5)]">
                          🎴
                        </div>
                        <h3 className="font-serif font-bold text-amber-200 text-base">
                          {item.card.name}
                        </h3>
                        <p className="text-xs text-purple-300/70 font-serif mt-1 italic">
                          Arcana: {item.card.arcana}
                        </p>
                      </div>

                      {/* Keywords */}
                      <div className="w-full flex flex-wrap gap-1 justify-center">
                        {item.card.keywords.map((kw, kIdx) => (
                          <span
                            key={kIdx}
                            className="text-[10px] font-mono bg-purple-950/90 text-purple-200 border border-purple-700/40 px-1.5 py-0.5 rounded"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>

                    </div>

                    {/* Interpretation Text */}
                    <div className="mt-4 space-y-2">
                      <div className="bg-stone-950 p-3 rounded-xl border border-purple-900/30">
                        <h4 className="text-xs font-mono uppercase text-amber-400 mb-1">
                          {item.isReversed ? 'Reversed Interpretation' : 'Upright Interpretation'}
                        </h4>
                        <p className="text-xs font-serif text-stone-200 leading-relaxed">
                          {item.isReversed ? item.card.reversedMeaning : item.card.uprightMeaning}
                        </p>
                      </div>

                      {item.card.quote && (
                        <div className="text-[11px] font-serif italic text-purple-300/80 bg-purple-950/40 p-2.5 rounded-lg border-l-2 border-amber-400">
                          "{item.card.quote}"
                        </div>
                      )}
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

          {/* Notes & Journal Attachment */}
          <div className="bg-stone-900 p-5 rounded-2xl border border-purple-900/30 space-y-3">
            <label className="block text-xs font-mono uppercase text-purple-300">
              Divination Reflection Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add personal insights or manifestation syncs regarding this draw..."
              className="w-full bg-stone-950 border border-purple-900/50 rounded-xl p-3 text-amber-100 font-serif text-sm focus:outline-none"
            />

            {onSaveDrawToJournal && (
              <button
                onClick={handleSaveToJournal}
                className={`w-full py-2.5 px-4 rounded-xl font-serif text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  isSaved
                    ? 'bg-emerald-900 text-emerald-200 border border-emerald-500'
                    : 'bg-purple-950 hover:bg-purple-900 text-amber-200 border border-purple-600/50'
                }`}
              >
                {isSaved ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Card Draw Saved to Encrypted Journal!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 text-amber-300" />
                    <span>Save Card Draw & Notes to Journal</span>
                  </>
                )}
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
