import React, { useState } from 'react';
import { JournalEntry, Sigil } from '../types';
import { encryptText, decryptText, hashPassphrase } from '../lib/crypto';
import { triggerHaptic } from '../lib/audio';
import { BookOpen, Lock, Unlock, Key, Plus, Trash2, Tag, ShieldCheck, Check, Search, Eye } from 'lucide-react';

interface EncryptedJournalProps {
  entries: JournalEntry[];
  sigils: Sigil[];
  onAddEntry: (entry: JournalEntry) => void;
  onDeleteEntry: (id: string) => void;
  isEncrypted: boolean;
  passphrase: string;
  setPassphrase: (p: string) => void;
}

export const EncryptedJournal: React.FC<EncryptedJournalProps> = ({
  entries,
  sigils,
  onAddEntry,
  onDeleteEntry,
  isEncrypted,
  passphrase,
  setPassphrase,
}) => {
  const [passInput, setPassInput] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [newStatus, setNewStatus] = useState<JournalEntry['status']>('Invocated');
  const [newTags, setNewTags] = useState<string>('manifestation, ritual');
  const [selectedSigilId, setSelectedSigilId] = useState<string>('');
  const [decryptedCache, setDecryptedCache] = useState<{ [id: string]: string }>({});
  const [decryptError, setDecryptError] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleUnlock = async () => {
    if (!passInput) return;
    try {
      const hash = await hashPassphrase(passInput);
      setPassphrase(passInput);
      setDecryptError('');
      triggerHaptic([80, 40, 120]);

      // Attempt decrypting existing entries
      const newCache: { [id: string]: string } = {};
      for (const entry of entries) {
        try {
          const plain = await decryptText(entry.encryptedContent, entry.iv, entry.salt, passInput);
          newCache[entry.id] = plain;
        } catch {
          // invalid pass
        }
      }
      setDecryptedCache(newCache);
    } catch {
      setDecryptError('Invalid encryption passphrase.');
    }
  };

  const handleCreateEntry = async () => {
    if (!passphrase) {
      setDecryptError('Please enter a secret passphrase first to initialize zero-knowledge E2EE.');
      return;
    }
    if (!newTitle || !newContent) return;

    try {
      const { ciphertext, iv, salt } = await encryptText(newContent, passphrase);
      const newEntry: JournalEntry = {
        id: 'journal_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        title: newTitle,
        encryptedContent: ciphertext,
        iv,
        salt,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: newStatus,
        tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
        attachedSigilId: selectedSigilId || undefined,
      };

      onAddEntry(newEntry);
      setDecryptedCache((prev) => ({ ...prev, [newEntry.id]: newContent }));
      setNewTitle('');
      setNewContent('');
      setSelectedSigilId('');
      triggerHaptic([100, 50, 150]);
    } catch (err) {
      setDecryptError('Encryption failed. Check browser crypto settings.');
    }
  };

  const filteredEntries = entries.filter((e) => {
    if (!searchQuery) return true;
    return e.title.toLowerCase().includes(searchQuery.toLowerCase()) || e.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-emerald-950/40 to-stone-900 p-6 rounded-2xl border border-emerald-800/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <BookOpen className="w-6 h-6 text-emerald-400" />
            <h2 className="text-2xl font-serif font-bold text-amber-200">
              Encrypted Manifestation Journal (AES-GCM-256)
            </h2>
          </div>
          <p className="text-sm text-emerald-300/70 font-serif">
            Zero-knowledge client-side end-to-end encryption. Your manifestation goals and ritual logs are encrypted in browser memory before storage.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-600/50 text-xs font-mono text-emerald-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{passphrase ? 'Vault Unlocked & Decrypted' : 'Passphrase Locked'}</span>
        </div>
      </div>

      {/* Passphrase Unlock Bar if not unlocked */}
      {!passphrase && (
        <div className="bg-stone-900 p-6 rounded-2xl border border-amber-800/40 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-amber-300 text-sm font-serif font-bold">
            <Key className="w-4 h-4 text-amber-400" />
            <span>Enter Secret Key / Passphrase to Unlock E2EE Journal</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="password"
              value={passInput}
              onChange={(e) => setPassInput(e.target.value)}
              placeholder="Enter your secret encryption key..."
              className="flex-1 bg-stone-950 border border-amber-800/50 rounded-xl px-4 py-2.5 text-amber-100 font-mono text-sm focus:outline-none focus:border-amber-400"
            />
            <button
              onClick={handleUnlock}
              className="py-2.5 px-6 rounded-xl bg-amber-700 hover:bg-amber-600 text-stone-950 font-serif font-bold text-sm flex items-center justify-center gap-2 transition-all"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Vault</span>
            </button>
          </div>

          {decryptError && (
            <p className="text-xs font-mono text-red-400">{decryptError}</p>
          )}
        </div>
      )}

      {/* Journal Creation Form (Unlocked) */}
      {passphrase && (
        <div className="bg-stone-900/90 p-6 rounded-2xl border border-emerald-900/40 space-y-4 shadow-xl">
          <h3 className="text-sm font-serif font-bold text-amber-200 uppercase tracking-wider flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>New Encrypted Manifestation Entry</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Entry Title / Ritual Name..."
              className="bg-stone-950 border border-emerald-900/50 rounded-xl px-4 py-2.5 text-amber-100 font-serif text-sm focus:outline-none"
            />

            <div className="grid grid-cols-2 gap-2">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as JournalEntry['status'])}
                className="bg-stone-950 border border-emerald-900/50 rounded-xl px-3 py-2.5 text-amber-200 font-serif text-xs"
              >
                <option value="Invocated">Status: Invocated 🕯️</option>
                <option value="In Progress">Status: In Progress 🌀</option>
                <option value="Manifested">Status: Manifested ✨</option>
                <option value="Sealed">Status: Sealed 🔒</option>
              </select>

              <select
                value={selectedSigilId}
                onChange={(e) => setSelectedSigilId(e.target.value)}
                className="bg-stone-950 border border-emerald-900/50 rounded-xl px-3 py-2.5 text-amber-200 font-serif text-xs"
              >
                <option value="">Attach Sigil (Optional)</option>
                {sigils.map((s) => (
                  <option key={s.id} value={s.id}>"{s.intent.substring(0, 20)}..."</option>
                ))}
              </select>
            </div>
          </div>

          <textarea
            rows={4}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Write manifestation goals, ritual observations, dream logs, or magical intentions (encrypted locally)..."
            className="w-full bg-stone-950 border border-emerald-900/50 rounded-xl p-4 text-amber-100 font-serif text-sm focus:outline-none"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <input
              type="text"
              value={newTags}
              onChange={(e) => setNewTags(e.target.value)}
              placeholder="Tags (comma separated)..."
              className="w-full sm:w-auto flex-1 bg-stone-950 border border-emerald-900/50 rounded-xl px-4 py-2 text-stone-300 font-mono text-xs"
            />

            <button
              onClick={handleCreateEntry}
              className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-emerald-100 font-serif font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Lock className="w-4 h-4 text-emerald-300" />
              <span>Encrypt & Save Entry</span>
            </button>
          </div>
        </div>
      )}

      {/* Entries List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-base font-serif font-bold text-amber-200">
            Archived Encrypted Entries ({filteredEntries.length})
          </h3>

          <div className="flex items-center gap-2 bg-stone-950 px-3 py-1.5 rounded-xl border border-stone-800 text-xs">
            <Search className="w-3.5 h-3.5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search entries..."
              className="bg-transparent text-amber-100 focus:outline-none w-32 font-mono text-xs"
            />
          </div>
        </div>

        {filteredEntries.length === 0 ? (
          <div className="bg-stone-950 p-8 rounded-2xl border border-stone-800 text-center text-stone-400 text-xs font-mono">
            No journal entries recorded. Unlock vault and create your first manifestation goal above.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEntries.map((entry) => {
              const decryptedText = decryptedCache[entry.id];
              const attachedSigil = sigils.find((s) => s.id === entry.attachedSigilId);

              return (
                <div
                  key={entry.id}
                  className="bg-stone-900/90 rounded-2xl border border-emerald-900/40 p-5 space-y-3 shadow-lg"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-2">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-emerald-400" />
                      <h4 className="font-serif font-bold text-amber-200 text-base">{entry.title}</h4>
                      <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800/40">
                        {entry.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-stone-400">
                      <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
                      <button
                        onClick={() => onDeleteEntry(entry.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                        title="Delete Entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Decrypted Body or Ciphertext Banner */}
                  {decryptedText ? (
                    <p className="text-sm font-serif text-amber-100/90 whitespace-pre-wrap leading-relaxed bg-stone-950 p-4 rounded-xl border border-stone-800/60">
                      {decryptedText}
                    </p>
                  ) : (
                    <div className="bg-stone-950 p-4 rounded-xl border border-red-900/30 text-xs font-mono text-stone-500 break-all">
                      [AES-GCM CIPHERTEXT]: {entry.encryptedContent.substring(0, 80)}... (Locked)
                    </div>
                  )}

                  {/* Attached Sigil Preview */}
                  {attachedSigil && (
                    <div className="flex items-center gap-3 bg-stone-950 p-2.5 rounded-xl border border-amber-900/30 max-w-sm">
                      <div 
                        className="w-12 h-12 shrink-0" 
                        dangerouslySetInnerHTML={{ __html: attachedSigil.svgContent }} 
                      />
                      <div className="text-xs font-serif text-amber-200">
                        <div className="font-bold">Attached Sigil: "{attachedSigil.intent}"</div>
                        <div className="text-[10px] text-stone-400 font-mono">Kamea: {attachedSigil.planetarySquare}</div>
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {entry.tags.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono bg-stone-950 text-emerald-400/80 px-2 py-0.5 rounded border border-emerald-900/30"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
};
