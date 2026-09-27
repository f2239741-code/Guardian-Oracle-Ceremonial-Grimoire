import { CrowleyQuote } from '../types';

export const CROWLEY_QUOTES: CrowleyQuote[] = [
  {
    id: 'cr_1',
    quote: 'Do what thou wilt shall be the whole of the Law.',
    source: 'Liber AL vel Legis (The Book of the Law), I:40',
    year: '1904',
    category: 'Thelema',
    operationContext: 'Received in Cairo during April 8-10, 1904 via direct dictation from Aiwass. Marks the inauguration of the Aeon of Horus.'
  },
  {
    id: 'cr_2',
    quote: 'Love is the law, love under will.',
    source: 'Liber AL vel Legis, I:57',
    year: '1904',
    category: 'Thelema',
    operationContext: 'The dual formula of Thelemic magick: Love (Agape, 93) united with Will (Thelema, 93) to achieve chemical wedding and manifestation.'
  },
  {
    id: 'cr_3',
    quote: 'Every man and every woman is a star.',
    source: 'Liber AL vel Legis, I:3',
    year: '1904',
    category: 'Will',
    operationContext: 'Axiom of spiritual sovereignty. Each individual soul possesses an inherent orbital path and purpose in the cosmic constellation.'
  },
  {
    id: 'cr_4',
    quote: 'Magick is the Science and Art of causing Change to occur in conformity with Will.',
    source: 'Magick in Theory and Practice, Chapter 1',
    year: '1929',
    category: 'Magick',
    operationContext: 'The foundational definition of ritual action. Teaches that any intentional movement, thought, or gesture is a magical act.'
  },
  {
    id: 'cr_5',
    quote: 'The Holy Guardian Angel is the True Self, the divine spark divine within the subconscious citadel.',
    source: 'The Sacred Magic of Abramelin / Liber Samekh',
    year: '1906 / 1920',
    category: 'Invocation',
    operationContext: 'The Abramelin Operation carried out at Boleskine House, Loch Ness (1899-1900) and later adapted into Liber Samekh for Knowledge and Conversation of the Holy Guardian Angel.'
  },
  {
    id: 'cr_6',
    quote: 'In the sphere of the Mind, what is believed to be true becomes true or enters the process of becoming true.',
    source: 'The Book of Thoth',
    year: '1944',
    category: 'Astral',
    operationContext: 'Analysis of Atu I (The Magus) and the mechanics of subconscious programming through visual sigils and ritual resonance.'
  },
  {
    id: 'cr_7',
    quote: 'Remember all that ye are, and all that ye have been; for ye are more than the sum of your programming.',
    source: 'Liber XIX / The Vision and the Voice',
    year: '1909',
    category: 'Will',
    operationContext: 'Astral scrying of the 30 Aethyrs in the Algerian desert with Victor Neuburg using Enochian calls and obsidian mirror.'
  },
  {
    id: 'cr_8',
    quote: 'There is no grace; there is no guilt; this is the law of Do what thou wilt.',
    source: 'Liber AL vel Legis, II:54',
    year: '1904',
    category: 'Thelema',
    operationContext: 'Eradication of inherited moral shame and dogmatic fear. Absolute personal responsibility for one’s karma and manifestation.'
  }
];

export interface MagicalOperationHistory {
  id: string;
  title: string;
  grimoireOrigin: string;
  historicalContext: string;
  ritualPurpose: string;
  keyFormula: string;
  warningNotice: string;
}

export const HISTORICAL_OPERATIONS: MagicalOperationHistory[] = [
  {
    id: 'op_abramelin',
    title: 'The Sacred Operation of Abramelin the Mage',
    grimoireOrigin: '15th Century Manuscript (Abraham of Worms) / Boleskine House (Crowley 1899)',
    historicalContext: 'A 6-to-18 month solitary retreat aimed at achieving the Knowledge and Conversation of the Holy Guardian Angel. Once achieved, the magus summons and binds the 4 Princes of Evil (Lucifer, Leviathan, Satan, Belial) and 8 Sub-Princes to serve their divine will.',
    ritualPurpose: 'Attaining divine union with the inner Holy Guardian Angel and mastery over the 72 demonic spirits of the subconscious sphere.',
    keyFormula: 'Abreptio, Purificatio, Invocation of the Bornless One (Liber Samekh).',
    warningNotice: 'Requires absolute mental purity, strict physical isolation, and unwavering willpower before evoking shadow spirits.'
  },
  {
    id: 'op_goetia',
    title: 'Lesser Key of Solomon (Lemegeton - Goetia)',
    grimoireOrigin: '17th Century Grimoire / Edited by S.L. MacGregor Mathers & Aleister Crowley (1904)',
    historicalContext: 'Contains descriptions of the 72 Kings and Princes of Hell, their sigils, metal correspondences, and specific operational duties. Crowley published his edited version in Foyers, Scotland.',
    ritualPurpose: 'Evocation of subconscious archetype daemons into the Triangle of Art for material manifestation, wisdom, and obstacle removal.',
    keyFormula: 'Circle of Protection, Magic Wand, Triangle of Evocation, Brass Vessel with Solomon Seal.',
    warningNotice: 'Always keep the spirit firmly contained inside the Triangle of Art. Never cross the outer boundary of the protective circle.'
  },
  {
    id: 'op_star_ruby',
    title: 'The Star Ruby (Liber XXV)',
    grimoireOrigin: 'Aleister Crowley (1913)',
    historicalContext: 'An improved Thelemic version of the Lesser Banishing Ritual of the Pentagram (LBRP). Replaces traditional Judeo-Christian angel names with Greek divine names (Therion, Babalon, Hadit, Nuit).',
    ritualPurpose: 'Daily banishing of negative energetic influences, grounding the physical vessel, and charging the astral aura.',
    keyFormula: 'Apo Pantos Kakodaimonos! (Away, all evil spirits!), Therion, Babalon, Hadit, Nuit.',
    warningNotice: 'Perform twice daily (sunrise and sunset) to maintain an impenetrable energetic circle.'
  },
  {
    id: 'op_enochian',
    title: 'Enochian Watchtower & Aethyr Scrying',
    grimoireOrigin: 'Dr. John Dee & Edward Kelley (1582-1589) / Golden Dawn / Crowley (1909)',
    historicalContext: 'An angelic language and system of 30 Aethyrs (spirits/dimensions) received through crystal scrying in Elizabethan England. Crowley scryed all 30 Aethyrs in the Sahara Desert in 1909.',
    ritualPurpose: 'Ascension into higher cosmic dimensional planes, accessing angelic wisdom, and opening the Watchtowers of the 4 Quarters.',
    keyFormula: 'Call of the 30 Aethyrs (MADRIAX DS ORAI BALTIBAS...), Holy Table, Obsidian Mirror.',
    warningNotice: 'Enochian voltage is exceptionally high; improper grounding may result in severe mental vertigo.'
  }
];
