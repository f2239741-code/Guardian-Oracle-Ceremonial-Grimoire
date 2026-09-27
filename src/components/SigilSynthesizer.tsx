import React, { useState } from 'react';
import { PlanetarySquare, Sigil } from '../types';
import { createSigilObject } from '../lib/sigilGenerator';
import { triggerHaptic } from '../lib/audio';
import { Sparkles, Download, Save, RefreshCw, Eye, Shield, Check } from 'lucide-react';

interface SigilSynthesizerProps {
  onSaveToGallery: (sigil: Sigil) => void;
}

export const SigilSynthesizer: React.FC<SigilSynthesizerProps> = ({ onSaveToGallery }) => {
  const [intent, setIntent] = useState<string>('MY WILL IS UNBOUNDED POWER');
  const [planet, setPlanet] = useState<PlanetarySquare>('sun');
  const [primaryColor, setPrimaryColor] = useState<string>('#E5A93C');
  const [glowColor, setGlowColor] = useState<string>('#FF5500');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const currentSigil = createSigilObject(intent, planet, primaryColor, glowColor);

  const handlePlanetChange = (p: PlanetarySquare) => {
    setPlanet(p);
    setIsSaved(false);
    triggerHaptic(50);
  };

  const handleSave = () => {
    onSaveToGallery(currentSigil);
    setIsSaved(true);
    triggerHaptic([100, 50, 150]);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleDownloadSVG = () => {
    const blob = new Blob([currentSigil.svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sigil_${currentSigil.cleanedIntent.toLowerCase()}_${planet}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    triggerHaptic(80);
  };

  const planetaryOptions: { id: PlanetarySquare; label: string; symbol: string; desc: string }[] = [
    { id: 'sun', label: 'Sun ☉', symbol: '☉', desc: 'Solar Vitality, Sovereignty & Radiance' },
    { id: 'jupiter', label: 'Jupiter ♃', symbol: '♃', desc: 'Expansion, Prosperity & Higher Law' },
    { id: 'saturn', label: 'Saturn ♄', symbol: '♄', desc: 'Form, Boundary, Protection & Time' },
    { id: 'mars', label: 'Mars ♂', symbol: '♂', desc: 'Courage, Force, Victory & Banishment' },
    { id: 'venus', label: 'Venus ♀', symbol: '♀', desc: 'Harmony, Attraction & Chemical Union' },
    { id: 'mercury', label: 'Mercury ☿', symbol: '☿', desc: 'Intellect, Sigil Craft & Alchemy' },
    { id: 'moon', label: 'Moon ☽', symbol: '☽', desc: 'Subconscious, Dreams & Astral Energy' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950/40 to-stone-900 p-6 rounded-2xl border border-amber-800/40 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-6 h-6 text-amber-400" />
          <h2 className="text-2xl font-serif font-bold text-amber-200">
            Digital Sigil Synthesis Forge
          </h2>
        </div>
        <p className="text-sm text-amber-300/70 max-w-3xl font-serif">
          Convert your statement of manifestation into condensed letter glyphs mapped to planetary kamea matrices and sacred geometry nodal vectors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-5 bg-stone-900/80 p-5 rounded-2xl border border-amber-900/30">
          
          {/* Intent Input */}
          <div>
            <label className="block text-xs font-mono uppercase text-amber-400 mb-2">
              1. Statement of Intent / Manifestation Formula
            </label>
            <input
              type="text"
              value={intent}
              onChange={(e) => {
                setIntent(e.target.value);
                setIsSaved(false);
              }}
              placeholder="e.g. MY WILL IS UNBOUNDED POWER"
              className="w-full bg-stone-950 border border-amber-700/50 rounded-xl px-4 py-3 text-amber-100 font-serif focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm shadow-inner"
            />
            <div className="mt-2 text-xs font-mono text-stone-400 flex items-center justify-between">
              <span>Condensed Formula Glyphs:</span>
              <span className="text-amber-400 font-bold tracking-widest bg-stone-950 px-2 py-0.5 rounded border border-amber-900/50">
                {currentSigil.cleanedIntent}
              </span>
            </div>
          </div>

          {/* Planetary Kamea Matrix Selection */}
          <div>
            <label className="block text-xs font-mono uppercase text-amber-400 mb-2">
              2. Planetary Kamea Matrix Alignment
            </label>
            <div className="grid grid-cols-1 gap-2 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
              {planetaryOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handlePlanetChange(opt.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-left border text-xs transition-all ${
                    planet === opt.id
                      ? 'bg-amber-950/90 border-amber-500 text-amber-100 shadow-md shadow-amber-950/80'
                      : 'bg-stone-950/60 border-stone-800 text-stone-300 hover:border-amber-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg text-amber-400 font-serif w-6 text-center">{opt.symbol}</span>
                    <div>
                      <div className="font-semibold">{opt.label}</div>
                      <div className="text-[11px] text-stone-400">{opt.desc}</div>
                    </div>
                  </div>
                  {planet === opt.id && <Shield className="w-4 h-4 text-amber-400 shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Color & Aesthetic Customization */}
          <div>
            <label className="block text-xs font-mono uppercase text-amber-400 mb-2">
              3. Aura & Glyph Pigments
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-stone-400 font-mono block mb-1">Primary Ink</span>
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-full h-10 bg-stone-950 rounded-lg border border-amber-800/40 cursor-pointer p-1"
                />
              </div>
              <div>
                <span className="text-[11px] text-stone-400 font-mono block mb-1">Astral Glow</span>
                <input
                  type="color"
                  value={glowColor}
                  onChange={(e) => setGlowColor(e.target.value)}
                  className="w-full h-10 bg-stone-950 rounded-lg border border-amber-800/40 cursor-pointer p-1"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={handleSave}
              className={`w-full py-3 px-4 rounded-xl font-serif text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                isSaved 
                  ? 'bg-emerald-900 border border-emerald-500 text-emerald-200' 
                  : 'bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 text-amber-100 shadow-lg shadow-amber-950/60'
              }`}
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Saved to Sigil Vault Gallery!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-amber-200" />
                  <span>Save Creation to Sigil Gallery</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadSVG}
              className="w-full py-2.5 px-4 rounded-xl bg-stone-950 hover:bg-stone-800 border border-amber-800/40 text-amber-300 font-mono text-xs flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Export Raw Vector (.SVG)</span>
            </button>
          </div>

        </div>

        {/* Live Canvas Preview Column */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-stone-950/90 p-6 rounded-2xl border border-amber-900/40 relative shadow-2xl min-h-[420px]">
          
          <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-mono text-amber-400/80 bg-stone-900/90 px-3 py-1.5 rounded-full border border-amber-800/30">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Altar Viewport</span>
          </div>

          {/* Render SVG Sigil */}
          <div 
            className="w-full max-w-md aspect-square flex items-center justify-center p-4 drop-shadow-[0_0_25px_rgba(229,169,60,0.25)]"
            dangerouslySetInnerHTML={{ __html: currentSigil.svgContent }}
          />

          <div className="mt-4 text-center">
            <p className="text-xs font-mono text-stone-400 uppercase tracking-widest">
              Nodal Coordinates Generated: {currentSigil.nodePoints.length} Nodes
            </p>
            <p className="text-[11px] font-serif text-amber-400/70 mt-1 italic">
              "Focus gaze upon central diamond glyph while silently vibrating formula"
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
