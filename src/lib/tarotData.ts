import { TarotCard } from '../types';

export const TAROT_DECK: TarotCard[] = [
  {
    id: 'tarot_0',
    name: '0 - The Fool (The Spirit Unbound)',
    number: 0,
    arcana: 'Major',
    keywords: ['Pure Potential', 'The Infinite Step', 'Divine Madness', 'Original Will'],
    uprightMeaning: 'Step fearlessly off the precipice into the abyss of creation. Unconditioned spirit embarking on infinite magical potential.',
    reversedMeaning: 'Hesitation, fear of leap, recklessness without ritual intention, energy scattered without purpose.',
    description: 'The Fool stands at the edge of the cosmic abyss, holding the white rose of pure intention and the staff of the Magus.',
    element: 'Air',
    symbolicArt: 'sparkles',
    quote: 'Doubt is the threshold of illumination; step into the void without fear.'
  },
  {
    id: 'tarot_1',
    name: 'I - The Magus (Aleister Crowley / Hermes)',
    number: 1,
    arcana: 'Major',
    keywords: ['Will Made Manifest', 'Elemental Mastery', 'Hermetic Axiom', 'The Conduit'],
    uprightMeaning: 'As Above, So Below. Conscious directing of the universal life force. You hold the wand, cup, sword, and pentacle.',
    reversedMeaning: 'Deception, illusion without substance, manipulation of magical principles for petty ego.',
    description: 'The Magus stands surrounded by the sacred symbols of elemental force, directing infinite voltage from the macrocosm.',
    element: 'Air',
    quote: 'Magick is the Science and Art of causing Change to occur in conformity with Will.'
  },
  {
    id: 'tarot_2',
    name: 'II - The High Priestess (Veil of Isis / Shekhinah)',
    number: 2,
    arcana: 'Major',
    keywords: ['Intuition', 'Secret Science', 'The Subconscious Sanctum', 'Lunar Oracle'],
    uprightMeaning: 'Access the hidden archives of the occult mind. Trust the inner whisper beyond surface reality.',
    reversedMeaning: 'Secrets kept out of fear, ignoring dreams, emotional turmoil, superficial knowledge.',
    description: 'Seated between the pillars of light and darkness (Jachin & Boaz), holding the scroll of secret law.',
    element: 'Water',
    quote: 'Behind the veil lies the mirror of your true eternal self.'
  },
  {
    id: 'tarot_3',
    name: 'III - The Empress (Babalon / Mother Matrix)',
    number: 3,
    arcana: 'Major',
    keywords: ['Creativity', 'Abundance', 'Sensual Alchemy', 'Nature Matrix'],
    uprightMeaning: 'The fertile soil of creation. Manifesting raw spiritual energy into lush tangible form.',
    reversedMeaning: 'Creative block, over-indulgence, neglect of ritual matrix, dependence.',
    description: 'Crowned with twelve stars, seated on the velvet throne of manifestation surrounded by golden wheat.',
    element: 'Earth',
    quote: 'Every intent planted in the fertile womb of the abyss shall bear cosmic fruit.'
  },
  {
    id: 'tarot_4',
    name: 'IV - The Emperor (Hadit / The Sovereign)',
    number: 4,
    arcana: 'Major',
    keywords: ['Structure', 'Mastery', 'Divine Authority', 'Will Order'],
    uprightMeaning: 'Establishing order in the chaos of existence. Sovereign dominion over one’s magical sphere.',
    reversedMeaning: 'Tyranny, rigidity, loss of control, submission to false authorities.',
    description: 'Throned upon granite ram heads, wielding the Ankh scepter of eternal authority.',
    element: 'Fire',
    quote: 'There is no law beyond Do what thou wilt.'
  },
  {
    id: 'tarot_5',
    name: 'V - The Hierophant (The Magus of the Eternal)',
    number: 5,
    arcana: 'Major',
    keywords: ['Secret Wisdom', 'Initiation', 'Lineage', 'Tradition Transcended'],
    uprightMeaning: 'The bridge between mystery and comprehension. Initiation into the higher mysteries.',
    reversedMeaning: 'Dogma, blind belief, obsolete rituals, spiritual corruption.',
    description: 'Seated in temple robes with triple cross, revealing the secret keys of heaven and earth to initiates.',
    element: 'Earth',
    quote: 'Listen not to dogma, but to the living voice of the Master within.'
  },
  {
    id: 'tarot_6',
    name: 'VI - The Lovers (Chemical Wedding / Syzygy)',
    number: 6,
    arcana: 'Major',
    keywords: ['Alchemical Union', 'Dual Synthesis', 'Polarity', 'Sacred Marriage'],
    uprightMeaning: 'The sacred union of opposing forces (Sol and Luna, Animus and Anima) yielding the divine third spark.',
    reversedMeaning: 'Conflict between desire and duty, internal division, betrayal of the true oath.',
    description: 'The divine couple stands beneath the outstretched wings of Raphael, synthesized by the serpent of wisdom.',
    element: 'Air',
    quote: 'Love is the law, love under will.'
  },
  {
    id: 'tarot_7',
    name: 'VII - The Chariot (The Vehicle of Triumph)',
    number: 7,
    arcana: 'Major',
    keywords: ['Triumph of Will', 'Self-Control', 'Cosmic Motion', 'Steering Dual Spheres'],
    uprightMeaning: 'Victorious advancement. Controlling opposing sphinxes through pure mental laser-focus.',
    reversedMeaning: 'Lack of control, losing direction, destructive force, ego collision.',
    description: 'An armored warrior steers a stellar chariot drawn by black and white sphinxes without reins.',
    element: 'Water',
    quote: 'Drive the chariot of intention through the fires of resistance.'
  },
  {
    id: 'tarot_8',
    name: 'VIII - Fortitude / Strength (Babalon Riding the Beast)',
    number: 8,
    arcana: 'Major',
    keywords: ['Raw Will Power', 'Kundalini Awakening', 'Fearlessness', 'Sensual Mastery'],
    uprightMeaning: 'Subduing the fiery beast within not through violence, but through supreme love and mastery.',
    reversedMeaning: 'Self-doubt, explosive anger, instinctual weakness, giving up.',
    description: 'A maiden calmly holds open the jaws of a fiery lion with golden serenity and infinite force.',
    element: 'Fire',
    quote: 'He who conquers himself is sovereign over the cosmos.'
  },
  {
    id: 'tarot_9',
    name: 'IX - The Hermit (The Lantern of Ptah)',
    number: 9,
    arcana: 'Major',
    keywords: ['Solitary Way', 'Internal Illumination', 'The Old Wise One', 'Search for Truth'],
    uprightMeaning: 'Withdrawal from profane noise into the inner sanctum. The lone lamp illuminating the secret path.',
    reversedMeaning: 'Isolation, paranoia, refusing guidance, spiritual loneliness.',
    description: 'An cloaked sage stands on the icy peak of wisdom, holding a star-lit lantern.',
    element: 'Earth',
    quote: 'In the stillness of solitary meditation, the whisper of the Old Ones is heard.'
  },
  {
    id: 'tarot_10',
    name: 'X - The Wheel of Fortune (Rota Fortunae)',
    number: 10,
    arcana: 'Major',
    keywords: ['Cycles of Karma', 'Destiny', 'Cosmic Rhythm', 'Planetary Shift'],
    uprightMeaning: 'The turning wheel of time and cause-and-effect. Adaptability to cosmic tides.',
    reversedMeaning: 'Bad luck streak, resistance to change, feeling victimized by circumstances.',
    description: 'The golden wheel adorned with Hebrew, Alchemy, and Egyptian glyphs turns through cosmic space.',
    element: 'Fire',
    quote: 'Stand at the center hub where the wheel turns, yet you remain motionless.'
  },
  {
    id: 'tarot_13',
    name: 'XIII - Death (Transmutation / Phoenix)',
    number: 13,
    arcana: 'Major',
    keywords: ['Alchemical Death', 'Radical Renewal', 'Banishment of False Self', 'Rebirth'],
    uprightMeaning: 'Necessary dissolution of the old vessel so the glorious immortal spirit may be reborn.',
    reversedMeaning: 'Stagnation, holding onto dead weight, fear of change, slow decay.',
    description: 'The skeletal knight rides across the dawn horizon while the golden sun rises between twin towers.',
    element: 'Water',
    quote: 'Die daily to that which is temporary, and awaken to that which is eternal.'
  },
  {
    id: 'tarot_15',
    name: 'XV - The Devil (Baphomet / Lord of the Gates)',
    number: 15,
    arcana: 'Major',
    keywords: ['Baphomet', 'Material Mastery', 'Liberation from Shame', 'Primal Voltage'],
    uprightMeaning: 'Unshackling the instinctual wild nature. Reclaiming shadow energy without fear or guilt.',
    reversedMeaning: 'Addiction, self-sabotage, bondage to false illusions, ignorance of one’s own power.',
    description: 'Baphomet with the Torch of Dual Equilibrium sits upon the altar, unbinding the chained seekers.',
    element: 'Earth',
    quote: 'Solve et Coagula: Dissolve the chains of illusion, coagulate raw power.'
  },
  {
    id: 'tarot_18',
    name: 'XVIII - The Moon (Hecate / Astral Gate)',
    number: 18,
    arcana: 'Major',
    keywords: ['Astral Realm', 'Dream Work', 'Deep Shadow', 'Subconscious Scrying'],
    uprightMeaning: 'Navigating the uncanny dark waters of the astral realm. Dreams, premonitions, intuition.',
    reversedMeaning: 'Nightmares, deception, fear of darkness, mental fog.',
    description: 'The lobster emerges from the primordial ocean toward twin towers while dogs howl at the dripping moon.',
    element: 'Water',
    quote: 'Enter the nocturnal abyss, where dreams take physical form.'
  },
  {
    id: 'tarot_19',
    name: 'XIX - The Sun (Sol Invictus / Ra)',
    number: 19,
    arcana: 'Major',
    keywords: ['Vital Radiance', 'Illumination', 'Solar Will', 'Triumphant Life'],
    uprightMeaning: 'Unrestricted clarity, joy, vitality, and solar power illuminating every secret corner.',
    reversedMeaning: 'Over-exposure, ego inflation, temporary shadow clouding the vision.',
    description: 'A radiant child rides a white steed under the blazing solar disk surrounded by sunflowers.',
    element: 'Fire',
    quote: 'I am the Sun in radiant splendor; my light dispels all darkness.'
  },
  {
    id: 'tarot_21',
    name: 'XXI - The World (The Universe / Aeon)',
    number: 21,
    arcana: 'Major',
    keywords: ['Completion', 'Cosmic Cosmic Unity', 'Great Work Accomplished', 'Nirvana'],
    uprightMeaning: 'The culmination of the Great Work. Complete synthesis of all four elements into spiritual perfection.',
    reversedMeaning: 'Incomplete circle, delayed achievement, missing final key, hesitation.',
    description: 'The cosmic dancer dances inside the green laurel wreath surrounded by the four elemental Kerubim.',
    element: 'Earth',
    quote: 'The Great Work is finished; you are the universe observing itself.'
  }
];

/**
 * Draw random Tarot card(s) from deck
 */
export function drawRandomTarot(count: number = 1): { card: TarotCard; isReversed: boolean }[] {
  const shuffled = [...TAROT_DECK].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);

  return selected.map((card) => ({
    card,
    isReversed: Math.random() > 0.75 // 25% chance of reversed draw
  }));
}
