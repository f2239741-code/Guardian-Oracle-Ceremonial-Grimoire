import React, { useState, useEffect } from 'react';
import { 
  SOLFEGGIO_FREQUENCIES, 
  playSolfeggioTone, 
  stopAllAudio, 
  strikeSingingBowl, 
  triggerHaptic 
} from '../lib/audio';
import { Volume2, VolumeX, Flame, Activity, Zap, Play, Square, Bell, Sparkles } from 'lucide-react';

export const ChantingGuide: React.FC = () => {
  const [selectedFreq, setSelectedFreq] = useState<number>(528);
  const [binauralHz, setBinauralHz] = useState<number>(4); // Theta 4Hz
  const [volume, setVolume] = useState<number>(0.3);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Pause'>('Inhale');
  const [breathCount, setBreathCount] = useState<number>(4);

  // Rhythmic breathing pacer effect (Box breathing 4-4-4-4)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setBreathCount((prev) => {
          if (prev > 1) return prev - 1;

          // Transition phase
          setBreathPhase((currentPhase) => {
            let nextPhase: 'Inhale' | 'Hold' | 'Exhale' | 'Pause' = 'Inhale';
            if (currentPhase === 'Inhale') nextPhase = 'Hold';
            else if (currentPhase === 'Hold') nextPhase = 'Exhale';
            else if (currentPhase === 'Exhale') nextPhase = 'Pause';
            else nextPhase = 'Inhale';

            // Trigger haptic vibration on phase transition
            triggerHaptic([60, 30, 60]);
            return nextPhase;
          });

          return 4; // Reset to 4 seconds
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleStart = () => {
    playSolfeggioTone(selectedFreq, 0, volume, binauralHz);
    setIsPlaying(true);
    triggerHaptic([100, 50, 100]);
  };

  const handleStop = () => {
    stopAllAudio();
    setIsPlaying(false);
    triggerHaptic(50);
  };

  const handleBowlStrike = () => {
    strikeSingingBowl(216);
  };

  const currentFreqObj = SOLFEGGIO_FREQUENCIES.find((f) => f.freq === selectedFreq) || SOLFEGGIO_FREQUENCIES[4];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-rose-950/40 to-stone-900 p-6 rounded-2xl border border-rose-800/40 shadow-xl flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Volume2 className="w-6 h-6 text-rose-400" />
            <h2 className="text-2xl font-serif font-bold text-amber-200">
              Guided Meditation & Ceremonial Chants
            </h2>
          </div>
          <p className="text-sm text-rose-300/70 font-serif">
            Synthesize Solfeggio frequency drones, theta binaural waves, and tactile haptic vibration rhythms to align the subtle body.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Breathing Visualizer Column */}
        <div className="lg:col-span-6 bg-stone-900/90 rounded-2xl border border-rose-900/40 p-6 flex flex-col items-center justify-center text-center shadow-2xl relative min-h-[380px]">
          
          {/* Pulsing Breathing Ring */}
          <div className="relative w-64 h-64 flex items-center justify-center my-4">
            <div 
              className={`absolute inset-0 rounded-full border-2 border-rose-500/50 transition-all duration-1000 ${
                isPlaying && breathPhase === 'Inhale' 
                  ? 'scale-110 border-amber-400 shadow-[0_0_40px_rgba(244,63,94,0.4)]' 
                  : isPlaying && breathPhase === 'Exhale' 
                  ? 'scale-90 border-rose-700' 
                  : 'scale-100'
              }`}
            />
            
            <div className="w-48 h-48 rounded-full bg-stone-950/90 border border-rose-900/60 flex flex-col items-center justify-center p-4">
              <span className="text-xs font-mono uppercase text-rose-400 tracking-widest mb-1">
                {isPlaying ? breathPhase : 'Ready'}
              </span>
              <span className="text-4xl font-serif font-bold text-amber-200">
                {isPlaying ? breathCount : '4:4'}
              </span>
              <span className="text-[11px] font-mono text-stone-400 mt-2">
                {currentFreqObj.freq} Hz Active
              </span>
            </div>
          </div>

          {/* Master Play Controls */}
          <div className="flex items-center gap-3 w-full max-w-xs mt-2">
            {!isPlaying ? (
              <button
                onClick={handleStart}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-800 to-rose-950 hover:from-rose-700 hover:to-rose-900 text-amber-100 font-serif font-bold text-sm flex items-center justify-center gap-2 border border-rose-500/50 shadow-lg shadow-rose-950/80 transition-all"
              >
                <Play className="w-4 h-4 text-amber-300" />
                <span>Begin Guided Meditation</span>
              </button>
            ) : (
              <button
                onClick={handleStop}
                className="w-full py-3 px-4 rounded-xl bg-stone-950 hover:bg-stone-800 text-amber-300 font-serif font-bold text-sm flex items-center justify-center gap-2 border border-rose-800/60 transition-all"
              >
                <Square className="w-4 h-4 text-rose-400" />
                <span>Silence Frequency Synth</span>
              </button>
            )}

            <button
              onClick={handleBowlStrike}
              className="p-3 rounded-xl bg-stone-950 hover:bg-stone-800 text-amber-300 border border-amber-800/40 transition-all"
              title="Strike Singing Bowl"
            >
              <Bell className="w-5 h-5 text-amber-400" />
            </button>
          </div>

        </div>

        {/* Frequency & Audio Controls Column */}
        <div className="lg:col-span-6 space-y-5 bg-stone-900/90 p-6 rounded-2xl border border-rose-900/40">
          
          {/* Solfeggio Selection */}
          <div>
            <label className="block text-xs font-mono uppercase text-rose-400 mb-2">
              Solfeggio Resonance Frequency
            </label>
            <div className="grid grid-cols-1 gap-2 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
              {SOLFEGGIO_FREQUENCIES.map((f) => (
                <button
                  key={f.freq}
                  onClick={() => {
                    setSelectedFreq(f.freq);
                    if (isPlaying) {
                      playSolfeggioTone(f.freq, 0, volume, binauralHz);
                    }
                  }}
                  className={`p-3 rounded-xl text-left border text-xs transition-all ${
                    selectedFreq === f.freq
                      ? 'bg-rose-950/90 border-rose-500 text-amber-100 shadow-md shadow-rose-950/80'
                      : 'bg-stone-950/60 border-stone-800 text-stone-300 hover:border-rose-900/50'
                  }`}
                >
                  <div className="font-semibold text-amber-200">{f.label}</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">{f.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Binaural Beat Offset Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-mono text-rose-300 mb-1">
              <span>Binaural Theta Wave Offset</span>
              <span className="text-amber-300 font-bold">{binauralHz} Hz (Theta Phase)</span>
            </div>
            <input
              type="range"
              min="0"
              max="12"
              step="1"
              value={binauralHz}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setBinauralHz(val);
                if (isPlaying) {
                  playSolfeggioTone(selectedFreq, 0, volume, val);
                }
              }}
              className="w-full accent-rose-500 bg-stone-950 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] font-mono text-stone-400 mt-1">
              0Hz = Pure Tone | 4-7Hz = Deep Astral Theta State | 8-12Hz = Calm Alpha State
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
