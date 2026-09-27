import React, { useState } from 'react';
import { Sigil } from '../types';
import { Layers, Download, Trash2, Copy, Check, Sparkles, Filter } from 'lucide-react';
import { triggerHaptic } from '../lib/audio';

interface SigilGalleryProps {
  sigils: Sigil[];
  onDeleteSigil: (id: string) => void;
}

export const SigilGallery: React.FC<SigilGalleryProps> = ({ sigils, onDeleteSigil }) => {
  const [filterPlanet, setFilterPlanet] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredSigils = sigils.filter((s) => {
    if (filterPlanet === 'all') return true;
    return s.planetarySquare === filterPlanet;
  });

  const handleCopySVG = (sigil: Sigil) => {
    navigator.clipboard.writeText(sigil.svgContent);
    setCopiedId(sigil.id);
    triggerHaptic(60);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadSVG = (sigil: Sigil) => {
    const blob = new Blob([sigil.svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sigil_${sigil.cleanedIntent.toLowerCase()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    triggerHaptic(80);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-stone-900 p-6 rounded-2xl border border-amber-800/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Layers className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-serif font-bold text-amber-200">
              Sigil Vault & Gallery
            </h2>
          </div>
          <p className="text-sm text-amber-300/70 font-serif">
            Archived digital sigil manifestations ready for ceremonial operations, scrying, or export.
          </p>
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2 bg-stone-950 px-3 py-2 rounded-xl border border-amber-900/50">
          <Filter className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono text-stone-400">Filter:</span>
          <select
            value={filterPlanet}
            onChange={(e) => setFilterPlanet(e.target.value)}
            className="bg-transparent text-amber-200 text-xs font-serif focus:outline-none cursor-pointer"
          >
            <option value="all" className="bg-stone-900 text-amber-200">All Kameas</option>
            <option value="sun" className="bg-stone-900 text-amber-200">Sun ☉</option>
            <option value="jupiter" className="bg-stone-900 text-amber-200">Jupiter ♃</option>
            <option value="saturn" className="bg-stone-900 text-amber-200">Saturn ♄</option>
            <option value="mars" className="bg-stone-900 text-amber-200">Mars ♂</option>
            <option value="venus" className="bg-stone-900 text-amber-200">Venus ♀</option>
            <option value="mercury" className="bg-stone-900 text-amber-200">Mercury ☿</option>
            <option value="moon" className="bg-stone-900 text-amber-200">Moon ☽</option>
          </select>
        </div>
      </div>

      {/* Sigils Grid */}
      {filteredSigils.length === 0 ? (
        <div className="bg-stone-950/80 p-12 rounded-2xl border border-stone-800 text-center space-y-3">
          <Sparkles className="w-10 h-10 text-amber-500/40 mx-auto" />
          <h3 className="text-lg font-serif text-amber-300">No Sigils Found in Vault</h3>
          <p className="text-xs text-stone-400 font-mono max-w-md mx-auto">
            Synthesize your first manifestation formula in the Sigil Forge tab to save it directly to your gallery.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSigils.map((sigil) => (
            <div
              key={sigil.id}
              className="bg-stone-900/90 rounded-2xl border border-amber-900/40 p-5 flex flex-col justify-between hover:border-amber-500/50 transition-all shadow-lg group"
            >
              <div>
                {/* SVG Image */}
                <div 
                  className="w-full aspect-square bg-stone-950 rounded-xl p-3 mb-4 flex items-center justify-center border border-amber-900/30 group-hover:border-amber-500/40 transition-all"
                  dangerouslySetInnerHTML={{ __html: sigil.svgContent }}
                />

                {/* Intent Info */}
                <h4 className="font-serif font-bold text-amber-200 text-sm line-clamp-2 mb-1">
                  "{sigil.intent}"
                </h4>
                <div className="flex items-center gap-2 text-[11px] font-mono text-amber-400/80 mb-3">
                  <span className="uppercase bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/40">
                    Kamea: {sigil.planetarySquare}
                  </span>
                  <span>{new Date(sigil.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="pt-3 border-t border-amber-900/20 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleCopySVG(sigil)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-950 hover:bg-stone-800 text-xs font-mono text-amber-300 border border-stone-800 transition-all"
                >
                  {copiedId === sigil.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-400" />
                      <span>Copy SVG</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleDownloadSVG(sigil)}
                    className="p-2 rounded-lg bg-stone-950 hover:bg-stone-800 text-amber-400 border border-stone-800 transition-all"
                    title="Export SVG"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onDeleteSigil(sigil.id)}
                    className="p-2 rounded-lg bg-stone-950 hover:bg-red-950/80 text-red-400 border border-stone-800 hover:border-red-800/50 transition-all"
                    title="Delete Sigil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
