/**
 * Web Audio API Synthesizer & Haptic Vibration Engine
 * Generates Solfeggio frequencies, binaural beats, Tibetan singing bowls,
 * ambient ritual drones, and syncs tactile haptic feedback.
 */

let audioCtx: AudioContext | null = null;
let currentOscillators: OscillatorNode[] = [];
let currentGainNodes: GainNode[] = [];

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Trigger physical device haptic vibration if supported by device browser
 */
export function triggerHaptic(pattern: number | number[] = [80, 40, 80]) {
  if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      // Ignore if permission denied or unsupported
    }
  }
}

/**
 * Stop all active synthesizer sounds
 */
export function stopAllAudio() {
  currentOscillators.forEach((osc) => {
    try {
      osc.stop();
      osc.disconnect();
    } catch {
      // ignore
    }
  });
  currentGainNodes.forEach((gain) => {
    try {
      gain.disconnect();
    } catch {
      // ignore
    }
  });
  currentOscillators = [];
  currentGainNodes = [];
}

/**
 * Solfeggio Frequencies mapping with ritual meanings
 */
export const SOLFEGGIO_FREQUENCIES = [
  { freq: 174, label: '174 Hz - Anesthetic & Foundation', desc: 'Somatic grounding and physical tension release' },
  { freq: 285, label: '285 Hz - Quantum Cognition', desc: 'Restoration of energy fields and cellular memory' },
  { freq: 396, label: '396 Hz - Liberating Guilt & Fear', desc: 'Root chakra resonance for turning grief into joy' },
  { freq: 417, label: '417 Hz - Transmutation & Facilitating Change', desc: 'Clearing stagnant energy & traumatic blocks' },
  { freq: 528, label: '528 Hz - Transformation & Miracles', desc: 'Dyna-frequency for intention manifestation & clarity' },
  { freq: 639, label: '639 Hz - Harmonizing Relationships', desc: 'Connecting spiritual planes & interpersonal warmth' },
  { freq: 741, label: '741 Hz - Awakening Intuition', desc: 'Solvent for energetic toxins and illusion' },
  { freq: 852, label: '852 Hz - Returning to Spiritual Order', desc: 'Third Eye activation and higher self alignment' },
  { freq: 963, label: '963 Hz - Crown Consciousness (Sahasrara)', desc: 'Pure light awakening & Old Ones cosmic communion' },
  { freq: 432, label: '432 Hz - Harmonic Natural Geometry', desc: 'Cosmic tuning pitch aligned with sacred mathematics' },
  { freq: 136.1, label: '136.1 Hz - Cosmic Om Resonance', desc: 'Earth annual orbit frequency for deep ritual chanting' }
];

/**
 * Play a Solfeggio Tone or Binaural Frequency with smooth envelope
 */
export function playSolfeggioTone(
  freq: number,
  durationSeconds: number = 0,
  volume: number = 0.3,
  binauralBeatHz: number = 0
) {
  stopAllAudio();
  const ctx = getAudioContext();

  const mainGain = ctx.createGain();
  mainGain.gain.setValueAtTime(0.01, ctx.currentTime);
  mainGain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 1.5);

  mainGain.connect(ctx.destination);
  currentGainNodes.push(mainGain);

  // Left Channel Oscillator
  const osc1 = ctx.createOscillator();
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(freq, ctx.currentTime);
  osc1.connect(mainGain);
  osc1.start();
  currentOscillators.push(osc1);

  // Right Channel / Binaural Offset Oscillator if requested
  if (binauralBeatHz > 0) {
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq + binauralBeatHz, ctx.currentTime);
    osc2.connect(mainGain);
    osc2.start();
    currentOscillators.push(osc2);
  }

  // Harmonic Sub-Drone for ceremonial atmosphere
  const subOsc = ctx.createOscillator();
  subOsc.type = 'triangle';
  subOsc.frequency.setValueAtTime(freq / 2, ctx.currentTime);
  const subGain = ctx.createGain();
  subGain.gain.value = volume * 0.25;
  subOsc.connect(subGain);
  subGain.connect(mainGain);
  subOsc.start();
  currentOscillators.push(subOsc);

  triggerHaptic([100, 50, 100]);

  if (durationSeconds > 0) {
    setTimeout(() => {
      mainGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
      setTimeout(() => {
        stopAllAudio();
      }, 1600);
    }, durationSeconds * 1000);
  }
}

/**
 * Strike a ceremonial Tibetan Singing Bowl sound
 */
export function strikeSingingBowl(baseFreq: number = 216) {
  const ctx = getAudioContext();

  const now = ctx.currentTime;
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.5, now);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 8.0);
  masterGain.connect(ctx.destination);

  // Fundamental pitch + harmonics
  const harmonics = [1, 2.76, 5.4, 8.9];
  harmonics.forEach((mult, index) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq * mult, now);

    const harmGain = ctx.createGain();
    harmGain.gain.setValueAtTime(0.4 / (index + 1), now);
    harmGain.gain.exponentialRampToValueAtTime(0.0001, now + 8.0 / (index + 1));

    osc.connect(harmGain);
    harmGain.connect(masterGain);
    osc.start(now);
    osc.stop(now + 8.5);
  });

  triggerHaptic([150, 80, 200, 80, 300]);
}
