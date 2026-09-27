import { LunarInfo } from '../types';

/**
 * Calculate Astronomical Moon Phase & Illumination for a given Date
 */
export function calculateLunarPhase(date: Date = new Date()): LunarInfo {
  // Known reference new moon: Jan 11, 2024, 11:57 UTC
  const synodicMonth = 29.53058867; // Days in lunar cycle
  const refNewMoon = new Date(Date.UTC(2024, 0, 11, 11, 57)).getTime();

  const diffDays = (date.getTime() - refNewMoon) / (1000 * 60 * 60 * 24);
  const cycleAge = ((diffDays % synodicMonth) + synodicMonth) % synodicMonth;

  // Illumination percentage (approximate)
  const illumination = Math.round((1 - Math.cos((cycleAge / synodicMonth) * 2 * Math.PI)) * 50);

  // Phase categorization
  let phaseCode: LunarInfo['phaseCode'] = 'new';
  let phaseName = 'New Moon (Silens)';

  if (cycleAge < 1.84566) {
    phaseCode = 'new';
    phaseName = 'New Moon (Novilunium)';
  } else if (cycleAge < 5.53699) {
    phaseCode = 'waxing_crescent';
    phaseName = 'Waxing Crescent (Corniculata)';
  } else if (cycleAge < 9.22831) {
    phaseCode = 'first_quarter';
    phaseName = 'First Quarter (Half Moon)';
  } else if (cycleAge < 12.91963) {
    phaseCode = 'waxing_gibbous';
    phaseName = 'Waxing Gibbous (Plena Inchoata)';
  } else if (cycleAge < 16.61096) {
    phaseCode = 'full';
    phaseName = 'Full Moon (Plenilunium)';
  } else if (cycleAge < 20.30228) {
    phaseCode = 'waning_gibbous';
    phaseName = 'Waning Gibbous (Disseminating)';
  } else if (cycleAge < 23.99361) {
    phaseCode = 'last_quarter';
    phaseName = 'Last Quarter (Decrementum)';
  } else if (cycleAge < 27.68493) {
    phaseCode = 'waning_crescent';
    phaseName = 'Waning Crescent (Balsamic / Hecate)';
  } else {
    phaseCode = 'new';
    phaseName = 'Dark Moon of Hecate';
  }

  // Calculate Zodiac Sign of Moon (approx 2.3 days per sign)
  const zodiacSigns = [
    'Aries ♈', 'Taurus ♉', 'Gemini ♊', 'Cancer ♋',
    'Leo ♌', 'Virgo ♍', 'Libra ♎', 'Scorpio ♏',
    'Sagittarius ♐', 'Capricorn ♑', 'Aquarius ♒', 'Pisces ♓'
  ];
  const zodiacIdx = Math.floor((cycleAge / synodicMonth) * 12) % 12;
  const activeZodiac = zodiacSigns[zodiacIdx];

  // Planetary Hours calculation based on current hour of day
  const hour = date.getHours();
  const planetaryRulers = ['Saturn ♄', 'Jupiter ♃', 'Mars ♂', 'Sun ☉', 'Venus ♀', 'Mercury ☿', 'Moon ☽'];
  const planetaryRuler = planetaryRulers[(hour + date.getDay() * 3) % 7];
  const planetaryHour = `Hour ${hour}:00 - Ruled by ${planetaryRuler}`;

  // Next Full & New Moon estimated dates
  const daysUntilFull = (14.765 - cycleAge + synodicMonth) % synodicMonth;
  const daysUntilNew = (synodicMonth - cycleAge) % synodicMonth;

  const nextFullMoon = new Date(date.getTime() + daysUntilFull * 86400000);
  const nextNewMoon = new Date(date.getTime() + daysUntilNew * 86400000);

  // Recommended Magical Operations based on Moon Phase
  let recommendedOperations: string[] = [];
  switch (phaseCode) {
    case 'new':
      recommendedOperations = [
        'Consecration of new tools and talismans',
        'Banishment of old energetic attachments',
        'Invocations of Hecate, Lilith, and primordial dark deities',
        'Deep introspection & silent void meditation'
      ];
      break;
    case 'waxing_crescent':
    case 'first_quarter':
    case 'waxing_gibbous':
      recommendedOperations = [
        'Growth and attraction spellcraft',
        'Charging sigils for wealth, vital power, and mastery',
        'Invocations of Sol, Jupiter, and Venusian spirits',
        'Building momentum toward manifestation goals'
      ];
      break;
    case 'full':
      recommendedOperations = [
        'High Ceremonial Operations & Mass of the Phoenix',
        'Full lunar charging of crystals, waters, and sigils',
        'Scrying with black mirrors and obsidian spheres',
        'Lucid astral projection & direct spirit communion'
      ];
      break;
    case 'waning_gibbous':
    case 'last_quarter':
    case 'waning_crescent':
      recommendedOperations = [
        'Banishing curses, energy vampires, and obstacles',
        'Cleansing ritual space with sage, copal, and sulfur',
        'Binding working against malevolent influences',
        'Shadow work and confrontation of personal ego traps'
      ];
      break;
  }

  return {
    phaseName,
    phaseCode,
    illumination,
    ageDays: Math.round(cycleAge * 10) / 10,
    zodiacSign: activeZodiac,
    planetaryHour,
    planetaryRuler,
    nextFullMoonDate: nextFullMoon.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    nextNewMoonDate: nextNewMoon.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    recommendedOperations
  };
}
