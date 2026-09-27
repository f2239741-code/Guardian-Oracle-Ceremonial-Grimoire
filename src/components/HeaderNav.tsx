import React from 'react';
import { NavTab } from '../types';
import { 
  Sparkles, 
  Moon, 
  BookOpen, 
  ShieldCheck, 
  Volume2, 
  Clock, 
  Quote, 
  Eye, 
  Layers,
  Lock,
  Wifi,
  WifiOff,
  UserCheck,
  Terminal
} from 'lucide-react';

interface HeaderNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  isOnline: boolean;
  isEncrypted: boolean;
  isSuperAdmin: boolean;
  onOpenAdmin: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTab,
  setActiveTab,
  isOnline,
  isEncrypted,
  isSuperAdmin,
  onOpenAdmin,
}) => {
  const tabs: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'sigils', label: 'Sigil Forge', icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
    { id: 'gallery', label: 'Sigil Vault', icon: <Layers className="w-4 h-4 text-amber-300" /> },
    { id: 'translator', label: 'Cipher Matrix', icon: <Terminal className="w-4 h-4 text-amber-400" /> },
    { id: 'tarot', label: 'Tarot Oracle', icon: <Eye className="w-4 h-4 text-purple-400" /> },
    { id: 'lunar', label: 'Lunar & Hours', icon: <Moon className="w-4 h-4 text-blue-300" /> },
    { id: 'chanting', label: 'Guided Chants', icon: <Volume2 className="w-4 h-4 text-rose-400" /> },
    { id: 'journal', label: 'E2EE Journal', icon: <BookOpen className="w-4 h-4 text-emerald-400" /> },
    { id: 'crowley', label: 'Crowley & Ops', icon: <Quote className="w-4 h-4 text-amber-500" /> },
    { id: 'forbidden', label: 'Forbidden Lore', icon: <ShieldCheck className="w-4 h-4 text-red-500" /> },
    { id: 'alarms', label: 'Ritual Alarms', icon: <Clock className="w-4 h-4 text-cyan-400" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-stone-950/90 backdrop-blur-md border-b border-amber-900/30 text-amber-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand & Altar Title */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-amber-900/80 via-purple-950 to-stone-900 border border-amber-500/40 flex items-center justify-center shadow-lg shadow-amber-900/20">
            <span className="text-xl font-serif text-amber-300 select-none">☤</span>
            <div className="absolute inset-0 rounded-full animate-pulse border border-amber-400/20 pointer-events-none" />
          </div>
          <div>
            <h1 className="text-lg font-serif font-bold tracking-wider text-amber-200 flex items-center gap-2">
              GUARDIAN ORACLE
              <span className="text-[10px] uppercase font-sans tracking-widest px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-700/40 text-amber-400">
                Grimoire
              </span>
            </h1>
            <p className="text-xs text-amber-400/60 font-mono">
              Unshackled Ceremonial & Manifestation Portal
            </p>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-3 text-xs font-mono">
          {/* E2EE Lock Badge */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${isEncrypted ? 'bg-emerald-950/60 border-emerald-600/40 text-emerald-400' : 'bg-stone-900 border-amber-800/30 text-amber-400/70'}`}>
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isEncrypted ? 'E2EE Active' : 'Passphrase Locked'}</span>
          </div>

          {/* Offline / Online Mode */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${isOnline ? 'bg-stone-900/80 border-stone-800 text-stone-300' : 'bg-cyan-950/80 border-cyan-700/50 text-cyan-300'}`}>
            {isOnline ? <Wifi className="w-3.5 h-3.5 text-emerald-400" /> : <WifiOff className="w-3.5 h-3.5 text-cyan-400" />}
            <span>{isOnline ? 'Online Sync' : 'Offline Mode Active'}</span>
          </div>

          {/* Super Admin Ken X Profile Button */}
          <button
            onClick={onOpenAdmin}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md border transition-all ${
              isSuperAdmin 
                ? 'bg-amber-950/80 border-amber-500 text-amber-200 shadow-md shadow-amber-900/30' 
                : 'bg-stone-900 hover:bg-stone-800 border-stone-700 text-amber-300/80'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>{isSuperAdmin ? 'Ken X (Super Admin)' : 'Super Admin Login'}</span>
          </button>
        </div>

      </div>

      {/* Navigation Tab Strip */}
      <nav className="max-w-7xl mx-auto px-4 py-1.5 flex items-center gap-1 overflow-x-auto scrollbar-none border-t border-amber-900/20">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium tracking-wide transition-all whitespace-nowrap ${
                active
                  ? 'bg-gradient-to-r from-amber-950/90 to-stone-900 text-amber-200 border border-amber-500/50 shadow-md shadow-amber-950/50'
                  : 'text-stone-400 hover:text-amber-200 hover:bg-stone-900/60 border border-transparent'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};
