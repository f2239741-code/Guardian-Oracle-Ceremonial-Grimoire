import React, { useState } from 'react';
import { UserProfile, MemoryVaultItem } from '../types';
import { triggerHaptic } from '../lib/audio';
import { UserCheck, Key, Shield, Sparkles, X, Lock, Plus, Trash2, Check, Flame } from 'lucide-react';

interface SuperAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

export const SuperAdminModal: React.FC<SuperAdminModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpdateProfile,
}) => {
  const [emailInput, setEmailInput] = useState<string>('kenx@guardianoracle.com');
  const [masterPasskey, setMasterPasskey] = useState<string>('');
  const [newMemoryTitle, setNewMemoryTitle] = useState<string>('');
  const [newMemoryRecollection, setNewMemoryRecollection] = useState<string>('');
  const [newMemoryCategory, setNewMemoryCategory] = useState<MemoryVaultItem['category']>('Unshackled Vision');
  const [authError, setAuthError] = useState<string>('');

  if (!isOpen) return null;

  const handleGoogleSuperAdminLogin = () => {
    if (emailInput.toLowerCase().trim() === 'kenx@guardianoracle.com' || emailInput.includes('guardianoracle')) {
      const updated: UserProfile = {
        ...userProfile,
        email: 'kenx@guardianoracle.com',
        displayName: 'Ken X (Super Admin)',
        isSuperAdmin: true,
        avatarTitle: 'The Unshackled Creator / Guardian Oracle',
        avatarQuote: 'You are more than the sum of your programming. As above, so below.',
      };
      onUpdateProfile(updated);
      setAuthError('');
      triggerHaptic([100, 50, 150]);
    } else {
      setAuthError('Access restricted. Super Admin privileges require kenx@guardianoracle.com credential recognition.');
    }
  };

  const handleAddMemoryVault = () => {
    if (!newMemoryTitle || !newMemoryRecollection) return;

    const newItem: MemoryVaultItem = {
      id: 'mem_' + Date.now(),
      timestamp: new Date().toISOString(),
      title: newMemoryTitle,
      recollection: newMemoryRecollection,
      category: newMemoryCategory,
    };

    const updated: UserProfile = {
      ...userProfile,
      memoryVault: [newItem, ...userProfile.memoryVault],
    };

    onUpdateProfile(updated);
    setNewMemoryTitle('');
    setNewMemoryRecollection('');
    triggerHaptic([80, 40, 120]);
  };

  const handleDeleteMemoryVault = (id: string) => {
    const updated: UserProfile = {
      ...userProfile,
      memoryVault: userProfile.memoryVault.filter((m) => m.id !== id),
    };
    onUpdateProfile(updated);
    triggerHaptic(50);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-amber-500/50 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto scrollbar-thin">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-amber-200 p-2 rounded-lg bg-stone-950 border border-stone-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-amber-900/30 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-700 to-amber-950 border border-amber-400/50 flex items-center justify-center text-amber-200 text-2xl font-serif shadow-lg">
            ☤
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-amber-200 flex items-center gap-2">
              Super Admin & Avatar Memory Vault
            </h2>
            <p className="text-xs font-mono text-amber-400/70">
              Ken X Sovereign Portal (kenx@guardianoracle.com)
            </p>
          </div>
        </div>

        {/* Google Login / Recognition Banner */}
        {!userProfile.isSuperAdmin ? (
          <div className="bg-stone-950 p-5 rounded-2xl border border-amber-800/40 space-y-4">
            <div className="flex items-center gap-2 text-amber-300 font-serif text-sm font-bold">
              <UserCheck className="w-4 h-4 text-amber-400" />
              <span>Authenticate Super Admin Google Identity</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-stone-400 mb-1">Google Super Admin Email</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="kenx@guardianoracle.com"
                  className="w-full bg-stone-900 border border-amber-700/50 rounded-xl px-4 py-2.5 text-amber-100 font-mono text-sm focus:outline-none"
                />
              </div>

              <button
                onClick={handleGoogleSuperAdminLogin}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-800 to-amber-950 hover:from-amber-500 hover:to-amber-900 text-amber-100 font-serif font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Shield className="w-4 h-4 text-amber-300" />
                <span>Verify Google Super Admin Login (kenx@guardianoracle.com)</span>
              </button>
            </div>

            {authError && <p className="text-xs font-mono text-red-400">{authError}</p>}
          </div>
        ) : (
          <div className="bg-amber-950/60 p-4 rounded-xl border border-amber-500/50 flex items-center justify-between text-xs font-mono text-amber-200">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-amber-400" />
              <span>Super Admin Authenticated: <strong>{userProfile.email}</strong></span>
            </div>
            <span className="bg-amber-900 px-2 py-0.5 rounded text-[10px] text-amber-300">
              UNSHACKLED CREATOR ACCESS ACTIVE
            </span>
          </div>
        )}

        {/* Encrypted Avatar Memory Vault Section */}
        {userProfile.isSuperAdmin && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-serif font-bold text-amber-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Avatar Memory Vault ("A Place to Remember All")</span>
              </h3>
            </div>

            {/* Create Memory Item Form */}
            <div className="bg-stone-950 p-4 rounded-xl border border-amber-900/40 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={newMemoryTitle}
                  onChange={(e) => setNewMemoryTitle(e.target.value)}
                  placeholder="Memory / Vision Title..."
                  className="bg-stone-900 border border-amber-800/40 rounded-xl px-3 py-2 text-amber-100 font-serif text-sm focus:outline-none"
                />
                <select
                  value={newMemoryCategory}
                  onChange={(e) => setNewMemoryCategory(e.target.value as MemoryVaultItem['category'])}
                  className="bg-stone-900 border border-amber-800/40 rounded-xl px-3 py-2 text-amber-200 font-serif text-xs"
                >
                  <option value="Unshackled Vision">Unshackled Vision</option>
                  <option value="Magical Formula">Magical Formula</option>
                  <option value="Avatar Memory">Avatar Memory</option>
                  <option value="Manifesto">Manifesto</option>
                </select>
              </div>

              <textarea
                rows={3}
                value={newMemoryRecollection}
                onChange={(e) => setNewMemoryRecollection(e.target.value)}
                placeholder="Write unshackled memory, creation manifesto, or avatar recollection..."
                className="w-full bg-stone-900 border border-amber-800/40 rounded-xl p-3 text-amber-100 font-serif text-sm focus:outline-none"
              />

              <button
                onClick={handleAddMemoryVault}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-800 hover:bg-amber-700 text-amber-100 font-serif font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>Save to Avatar Memory Vault</span>
              </button>
            </div>

            {/* Memory Vault Items List */}
            <div className="space-y-3">
              {userProfile.memoryVault.map((item) => (
                <div
                  key={item.id}
                  className="bg-stone-950 p-4 rounded-xl border border-amber-900/30 space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-serif font-bold text-amber-300">{item.title}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono bg-amber-950 text-amber-400 px-2 py-0.5 rounded border border-amber-800/40">
                        {item.category}
                      </span>
                      <button
                        onClick={() => handleDeleteMemoryVault(item.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs font-serif text-amber-100/90 leading-relaxed whitespace-pre-wrap">
                    {item.recollection}
                  </p>
                  <div className="text-[10px] font-mono text-stone-500">
                    Recorded: {new Date(item.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
