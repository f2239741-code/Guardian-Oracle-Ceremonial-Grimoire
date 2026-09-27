import React, { useState } from 'react';
import { RitualAlarm } from '../types';
import { playSolfeggioTone, strikeSingingBowl, triggerHaptic } from '../lib/audio';
import { Clock, Plus, Trash2, Bell, BellOff, Volume2, Check } from 'lucide-react';

interface RitualAlarmsProps {
  alarms: RitualAlarm[];
  onAddAlarm: (alarm: RitualAlarm) => void;
  onDeleteAlarm: (id: string) => void;
  onToggleAlarm: (id: string) => void;
}

export const RitualAlarms: React.FC<RitualAlarmsProps> = ({
  alarms,
  onAddAlarm,
  onDeleteAlarm,
  onToggleAlarm,
}) => {
  const [newTitle, setNewTitle] = useState<string>('Star Ruby Banishing Operation');
  const [newTime, setNewTime] = useState<string>('06:00');
  const [newFrequency, setNewFrequency] = useState<number>(528);
  const [newSoundType, setNewSoundType] = useState<RitualAlarm['soundType']>('singing_bowl');

  const handleCreateAlarm = () => {
    const alarm: RitualAlarm = {
      id: 'alarm_' + Date.now(),
      title: newTitle,
      time: newTime,
      days: ['Everyday'],
      audioFrequency: newFrequency,
      soundType: newSoundType,
      enabled: true,
    };
    onAddAlarm(alarm);
    triggerHaptic([100, 50, 100]);

    // Test preview tone
    if (newSoundType === 'singing_bowl') {
      strikeSingingBowl(216);
    } else {
      playSolfeggioTone(newFrequency, 3, 0.3);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-cyan-950/40 to-stone-900 p-6 rounded-2xl border border-cyan-800/40 shadow-xl flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Clock className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-serif font-bold text-amber-200">
              Custom Ritual Alarm & Planetary Timers
            </h2>
          </div>
          <p className="text-sm text-cyan-300/70 font-serif">
            Schedule frequency-tuned ceremonial alarms, planetary hour notifications, and ritual timers with audio bowls.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Alarm Creation Form */}
        <div className="lg:col-span-5 bg-stone-900/90 p-5 rounded-2xl border border-cyan-900/40 space-y-4">
          <h3 className="text-sm font-serif font-bold text-amber-200 uppercase tracking-wider flex items-center gap-2">
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>Set New Ceremonial Alarm</span>
          </h3>

          <div>
            <label className="block text-xs font-mono text-cyan-300 mb-1">Ritual Operation Name</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-stone-950 border border-cyan-900/50 rounded-xl px-4 py-2.5 text-amber-100 font-serif text-sm focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-cyan-300 mb-1">Alarm Time (24h)</label>
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full bg-stone-950 border border-cyan-900/50 rounded-xl px-3 py-2 text-amber-100 font-mono text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-cyan-300 mb-1">Frequency (Hz)</label>
              <select
                value={newFrequency}
                onChange={(e) => setNewFrequency(Number(e.target.value))}
                className="w-full bg-stone-950 border border-cyan-900/50 rounded-xl px-3 py-2.5 text-amber-200 font-mono text-xs"
              >
                <option value={528}>528 Hz (Manifestation)</option>
                <option value={432}>432 Hz (Cosmic Geometry)</option>
                <option value={852}>852 Hz (Third Eye)</option>
                <option value={963}>963 Hz (Crown Void)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-cyan-300 mb-1">Audio Sound Resonator</label>
            <select
              value={newSoundType}
              onChange={(e) => setNewSoundType(e.target.value as RitualAlarm['soundType'])}
              className="w-full bg-stone-950 border border-cyan-900/50 rounded-xl px-3 py-2.5 text-amber-200 font-serif text-xs"
            >
              <option value="singing_bowl">Tibetan Singing Bowl Strike 🔔</option>
              <option value="chime">Solfeggio Frequency Drone 🎼</option>
              <option value="binaural_beat">Binaural Theta Wave Pulse 〰️</option>
            </select>
          </div>

          <button
            onClick={handleCreateAlarm}
            className="w-full py-3 px-4 rounded-xl bg-cyan-800 hover:bg-cyan-700 text-cyan-100 font-serif font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <Bell className="w-4 h-4 text-cyan-300" />
            <span>Schedule Ceremonial Alarm</span>
          </button>
        </div>

        {/* Scheduled Alarms List */}
        <div className="lg:col-span-7 space-y-3">
          <h3 className="text-base font-serif font-bold text-amber-200">
            Active Scheduled Alarms ({alarms.length})
          </h3>

          {alarms.length === 0 ? (
            <div className="bg-stone-950 p-8 rounded-2xl border border-stone-800 text-center text-stone-400 text-xs font-mono">
              No active ritual alarms scheduled. Create an alarm for planetary hours or daily banishing practices above.
            </div>
          ) : (
            <div className="space-y-3">
              {alarms.map((alarm) => (
                <div
                  key={alarm.id}
                  className="bg-stone-900/90 rounded-2xl border border-cyan-900/40 p-4 flex items-center justify-between gap-4 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onToggleAlarm(alarm.id)}
                      className={`p-2.5 rounded-xl border transition-all ${
                        alarm.enabled
                          ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                          : 'bg-stone-950 border-stone-800 text-stone-500'
                      }`}
                    >
                      {alarm.enabled ? <Bell className="w-4 h-4 text-cyan-400" /> : <BellOff className="w-4 h-4 text-stone-500" />}
                    </button>

                    <div>
                      <h4 className="font-serif font-bold text-amber-200 text-sm">{alarm.title}</h4>
                      <p className="text-xs font-mono text-cyan-400">
                        {alarm.time} | {alarm.audioFrequency} Hz ({alarm.soundType})
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteAlarm(alarm.id)}
                    className="p-2 rounded-lg bg-stone-950 hover:bg-red-950/80 text-red-400 border border-stone-800 transition-all"
                    title="Delete Alarm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
