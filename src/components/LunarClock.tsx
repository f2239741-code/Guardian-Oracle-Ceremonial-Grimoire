import React, { useState, useEffect } from 'react';
import { LunarInfo } from '../types';
import { calculateLunarPhase } from '../lib/lunar';
import { Moon, Sun, Clock, Compass, Sparkles, Calendar, Shield } from 'lucide-react';

export const LunarClock: React.FC = () => {
  const [lunarInfo, setLunarInfo] = useState<LunarInfo>(calculateLunarPhase());

  useEffect(() => {
    const timer = setInterval(() => {
      setLunarInfo(calculateLunarPhase());
    }, 60000); // refresh every minute
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-blue-950/40 to-stone-900 p-6 rounded-2xl border border-blue-800/40 shadow-xl flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Moon className="w-6 h-6 text-blue-300" />
            <h2 className="text-2xl font-serif font-bold text-amber-200">
              Astronomical Lunar Clock & Planetary Hours
            </h2>
          </div>
          <p className="text-sm text-blue-300/70 font-serif">
            Live astronomical calculation of lunar phase, illumination, active zodiac constellation, and planetary hour rulers for optimal ceremonial timing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Lunar Graphic Card */}
        <div className="lg:col-span-5 bg-stone-900/90 rounded-2xl border border-blue-800/40 p-6 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
          
          {/* Background Astro Ring */}
          <div className="w-56 h-56 rounded-full border border-blue-500/20 flex items-center justify-center relative my-4">
            <div className="w-48 h-48 rounded-full border border-dashed border-amber-500/30 animate-spin-slow" />
            
            {/* Visual Moon Orb Representation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-32 h-32 rounded-full border-2 border-amber-300/50 shadow-[0_0_30px_rgba(147,197,253,0.3)] flex items-center justify-center text-5xl font-serif text-blue-200"
                style={{
                  background: `linear-gradient(90deg, #0f172a ${100 - lunarInfo.illumination}%, #38bdf8 ${100 - lunarInfo.illumination}%)`
                }}
              >
                ☽
              </div>
            </div>
          </div>

          <h3 className="text-xl font-serif font-bold text-amber-200 mt-2">
            {lunarInfo.phaseName}
          </h3>
          <p className="text-xs font-mono text-blue-300 mt-1">
            Illumination: <span className="text-amber-300 font-bold">{lunarInfo.illumination}%</span> | Cycle Age: {lunarInfo.ageDays} Days
          </p>

          <div className="mt-4 w-full grid grid-cols-2 gap-2 text-xs font-mono pt-4 border-t border-blue-900/30">
            <div className="bg-stone-950 p-2.5 rounded-xl border border-blue-900/40">
              <span className="text-stone-400 block text-[10px] uppercase">Next Full Moon</span>
              <span className="text-blue-300 font-semibold">{lunarInfo.nextFullMoonDate}</span>
            </div>
            <div className="bg-stone-950 p-2.5 rounded-xl border border-blue-900/40">
              <span className="text-stone-400 block text-[10px] uppercase">Next New Moon</span>
              <span className="text-blue-300 font-semibold">{lunarInfo.nextNewMoonDate}</span>
            </div>
          </div>

        </div>

        {/* Planetary Hours & Operations Column */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Planetary Hour Card */}
          <div className="bg-stone-900/90 rounded-2xl border border-amber-800/40 p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 text-sm font-serif font-bold">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Current Planetary Hour & Zodiac Alignment</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              <div className="bg-stone-950 p-3 rounded-xl border border-amber-900/30">
                <span className="text-stone-400 block text-[10px] uppercase">Planetary Ruler</span>
                <span className="text-amber-200 font-bold text-sm">{lunarInfo.planetaryRuler}</span>
              </div>
              <div className="bg-stone-950 p-3 rounded-xl border border-amber-900/30">
                <span className="text-stone-400 block text-[10px] uppercase">Moon Zodiac House</span>
                <span className="text-amber-200 font-bold text-sm">{lunarInfo.zodiacSign}</span>
              </div>
            </div>

            <div className="text-xs text-stone-300 font-mono bg-stone-950 p-3 rounded-xl border border-stone-800">
              {lunarInfo.planetaryHour}
            </div>
          </div>

          {/* Recommended Magical Operations */}
          <div className="bg-stone-900/90 rounded-2xl border border-blue-800/40 p-5 space-y-3">
            <div className="flex items-center gap-2 text-blue-200 text-sm font-serif font-bold">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Recommended Ritual Operations for Current Lunar Phase</span>
            </div>

            <div className="space-y-2">
              {lunarInfo.recommendedOperations.map((op, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-950 border border-blue-900/30 text-xs font-serif text-stone-200"
                >
                  <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{op}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
