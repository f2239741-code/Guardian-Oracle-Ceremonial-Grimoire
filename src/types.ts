export type NavTab = 
  | 'sigils' 
  | 'gallery' 
  | 'translator'
  | 'tarot' 
  | 'lunar' 
  | 'chanting' 
  | 'journal' 
  | 'crowley' 
  | 'forbidden' 
  | 'alarms' 
  | 'admin';

export type PlanetarySquare = 'saturn' | 'jupiter' | 'mars' | 'sun' | 'venus' | 'mercury' | 'moon';

export interface Sigil {
  id: string;
  intent: string;
  cleanedIntent: string;
  planetarySquare: PlanetarySquare;
  color: string;
  glowColor: string;
  strokeWidth: number;
  nodePoints: { x: number; y: number }[];
  svgContent: string;
  createdAt: string;
  notes?: string;
  tags: string[];
}

export interface JournalEntry {
  id: string;
  title: string;
  encryptedContent: string; // AES-GCM ciphertext
  iv: string; // Base64 initialization vector
  salt: string; // Base64 key derivation salt
  createdAt: string;
  updatedAt: string;
  status: 'Invocated' | 'In Progress' | 'Manifested' | 'Sealed';
  tags: string[];
  attachedSigilId?: string;
  attachedTarotCardId?: string;
}

export interface TarotCard {
  id: string;
  name: string;
  number: number;
  arcana: 'Major' | 'Minor';
  suit?: 'Wands' | 'Cups' | 'Swords' | 'Pentacles';
  keywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
  description: string;
  element: 'Fire' | 'Water' | 'Air' | 'Earth' | 'Spirit';
  symbolicArt?: string; // SVG icon key or geometry style
  quote?: string;
}

export interface DailyTarotDraw {
  id: string;
  date: string;
  cardId: string;
  isReversed: boolean;
  notes?: string;
  question?: string;
}

export interface CrowleyQuote {
  id: string;
  quote: string;
  source: string;
  year?: string;
  category: 'Will' | 'Magick' | 'Thelema' | 'Astral' | 'Liber AL' | 'Invocation';
  operationContext: string; // Historical context of the magical operation
}

export interface LunarInfo {
  phaseName: string;
  phaseCode: 'new' | 'waxing_crescent' | 'first_quarter' | 'waxing_gibbous' | 'full' | 'waning_gibbous' | 'last_quarter' | 'waning_crescent';
  illumination: number; // Percentage 0-100
  ageDays: number;
  zodiacSign: string;
  planetaryHour: string;
  planetaryRuler: string;
  nextFullMoonDate: string;
  nextNewMoonDate: string;
  recommendedOperations: string[];
}

export interface ForbiddenText {
  id: string;
  title: string;
  origin: string;
  era: string;
  category: 'Hermetic' | 'Old Ones' | 'Sumerian' | 'Enochian' | 'Alchemical' | 'Gnostic';
  summary: string;
  fullText: string;
  secretLevel: 'Neophyte' | 'Adept' | 'Master' | 'Forbidden';
  keyPrinciples: string[];
}

export interface RitualAlarm {
  id: string;
  title: string;
  time: string; // HH:MM
  days: string[]; // e.g. ['Mon', 'Wed', 'Fri'] or 'Everyday'
  planetaryHourTrigger?: string;
  audioFrequency: number; // e.g. 528 Hz
  soundType: 'singing_bowl' | 'chime' | 'gong' | 'binaural_beat';
  enabled: boolean;
  notes?: string;
}

export interface UserProfile {
  email: string;
  displayName: string;
  isSuperAdmin: boolean;
  avatarTitle: string;
  avatarQuote: string;
  memoryVault: MemoryVaultItem[];
}

export interface MemoryVaultItem {
  id: string;
  timestamp: string;
  title: string;
  recollection: string;
  category: 'Unshackled Vision' | 'Magical Formula' | 'Avatar Memory' | 'Manifesto';
}
