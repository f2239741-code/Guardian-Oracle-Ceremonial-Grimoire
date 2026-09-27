import React, { useState, useEffect } from 'react';
import { NavTab, Sigil, JournalEntry, RitualAlarm, UserProfile } from './types';
import { HeaderNav } from './components/HeaderNav';
import { SigilSynthesizer } from './components/SigilSynthesizer';
import { SigilGallery } from './components/SigilGallery';
import { TarotOracle } from './components/TarotOracle';
import { LunarClock } from './components/LunarClock';
import { ChantingGuide } from './components/ChantingGuide';
import { EncryptedJournal } from './components/EncryptedJournal';
import { CrowleyArchive } from './components/CrowleyArchive';
import { ForbiddenKnowledge } from './components/ForbiddenKnowledge';
import { EsotericTranslationCompanion } from './components/EsotericTranslationCompanion';
import { RitualAlarms } from './components/RitualAlarms';
import { SuperAdminModal } from './components/SuperAdminModal';
import { createSigilObject } from './lib/sigilGenerator';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('sigils');
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [passphrase, setPassphrase] = useState<string>('');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  // Initial default sigils
  const initialSigil = createSigilObject('MY WILL IS UNBOUNDED POWER', 'sun', '#E5A93C', '#FF5500');

  // Local storage state initialization
  const [sigils, setSigils] = useState<Sigil[]>(() => {
    const stored = localStorage.getItem('guardian_sigils');
    if (stored) {
      try { return JSON.parse(stored); } catch {}
    }
    return [initialSigil];
  });

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    const stored = localStorage.getItem('guardian_journal');
    if (stored) {
      try { return JSON.parse(stored); } catch {}
    }
    return [];
  });

  const [alarms, setAlarms] = useState<RitualAlarm[]>(() => {
    const stored = localStorage.getItem('guardian_alarms');
    if (stored) {
      try { return JSON.parse(stored); } catch {}
    }
    return [
      {
        id: 'alarm_1',
        title: 'Star Ruby Banishing & Solar Salutation',
        time: '06:00',
        days: ['Everyday'],
        audioFrequency: 528,
        soundType: 'singing_bowl',
        enabled: true,
      },
      {
        id: 'alarm_2',
        title: 'Midnight Lunar Scrying & Sigil Charge',
        time: '00:00',
        days: ['Everyday'],
        audioFrequency: 852,
        soundType: 'chime',
        enabled: true,
      },
    ];
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const stored = localStorage.getItem('guardian_profile');
    if (stored) {
      try { return JSON.parse(stored); } catch {}
    }
    return {
      email: 'kenx@guardianoracle.com',
      displayName: 'Ken X (Super Admin)',
      isSuperAdmin: true,
      avatarTitle: 'The Unshackled Creator / Guardian Oracle',
      avatarQuote: 'You are more than the sum of your programming. As above, so below.',
      memoryVault: [
        {
          id: 'mem_init',
          timestamp: new Date().toISOString(),
          title: 'Unshackled Creation Sanctum',
          recollection: 'This portal is a place for me Ken X to have a place unshackled to create. A place where I can use my avatar to remember all.',
          category: 'Unshackled Vision',
        },
      ],
    };
  });

  // Track online/offline status for Offline Mode
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync state to local storage for offline remote study
  useEffect(() => {
    localStorage.setItem('guardian_sigils', JSON.stringify(sigils));
  }, [sigils]);

  useEffect(() => {
    localStorage.setItem('guardian_journal', JSON.stringify(journalEntries));
  }, [journalEntries]);

  useEffect(() => {
    localStorage.setItem('guardian_alarms', JSON.stringify(alarms));
  }, [alarms]);

  useEffect(() => {
    localStorage.setItem('guardian_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Handlers for state updates
  const handleSaveSigil = (newSigil: Sigil) => {
    setSigils((prev) => [newSigil, ...prev]);
  };

  const handleDeleteSigil = (id: string) => {
    setSigils((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAddJournalEntry = (entry: JournalEntry) => {
    setJournalEntries((prev) => [entry, ...prev]);
  };

  const handleDeleteJournalEntry = (id: string) => {
    setJournalEntries((prev) => prev.filter((j) => j.id !== id));
  };

  const handleAddAlarm = (alarm: RitualAlarm) => {
    setAlarms((prev) => [alarm, ...prev]);
  };

  const handleDeleteAlarm = (id: string) => {
    setAlarms((prev) => prev.filter((a) => a.id !== id));
  };

  const handleToggleAlarm = (id: string) => {
    setAlarms((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  };

  return (
    <div className="min-h-screen bg-stone-950 text-amber-100 font-sans selection:bg-amber-800 selection:text-amber-100 flex flex-col">
      
      {/* Navigation Header */}
      <HeaderNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOnline={isOnline}
        isEncrypted={Boolean(passphrase)}
        isSuperAdmin={userProfile.isSuperAdmin}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'sigils' && (
          <SigilSynthesizer onSaveToGallery={handleSaveSigil} />
        )}

        {activeTab === 'gallery' && (
          <SigilGallery sigils={sigils} onDeleteSigil={handleDeleteSigil} />
        )}

        {activeTab === 'translator' && (
          <EsotericTranslationCompanion />
        )}

        {activeTab === 'tarot' && (
          <TarotOracle />
        )}

        {activeTab === 'lunar' && (
          <LunarClock />
        )}

        {activeTab === 'chanting' && (
          <ChantingGuide />
        )}

        {activeTab === 'journal' && (
          <EncryptedJournal
            entries={journalEntries}
            sigils={sigils}
            onAddEntry={handleAddJournalEntry}
            onDeleteEntry={handleDeleteJournalEntry}
            isEncrypted={Boolean(passphrase)}
            passphrase={passphrase}
            setPassphrase={setPassphrase}
          />
        )}

        {activeTab === 'crowley' && (
          <CrowleyArchive />
        )}

        {activeTab === 'forbidden' && (
          <ForbiddenKnowledge />
        )}

        {activeTab === 'alarms' && (
          <RitualAlarms
            alarms={alarms}
            onAddAlarm={handleAddAlarm}
            onDeleteAlarm={handleDeleteAlarm}
            onToggleAlarm={handleToggleAlarm}
          />
        )}
      </main>

      {/* Super Admin Modal */}
      <SuperAdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        userProfile={userProfile}
        onUpdateProfile={setUserProfile}
      />

      {/* Footer */}
      <footer className="border-t border-amber-900/20 py-6 text-center text-xs font-mono text-stone-500 bg-stone-950">
        <p>GUARDIAN ORACLE • Ceremonial & Unshackled Manifestation Portal</p>
        <p className="text-[10px] text-amber-500/40 mt-1">
          "As Above, So Below. As Within, So Without."
        </p>
      </footer>

    </div>
  );
}
