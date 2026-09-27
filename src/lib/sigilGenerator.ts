import { PlanetarySquare, Sigil } from '../types';

/**
 * Remove vowels, spaces, and duplicate characters from intent string
 */
export function processIntentString(intent: string): string {
  const cleaned = intent
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .replace(/[AEIOU]/g, '');

  const uniqueChars: string[] = [];
  for (const char of cleaned) {
    if (!uniqueChars.includes(char)) {
      uniqueChars.push(char);
    }
  }

  return uniqueChars.length > 0 ? uniqueChars.join('') : 'MAGICK';
}

/**
 * Map letter (A-Z) to circle or grid coordinates
 */
export function generateSigilNodes(
  letters: string,
  width: number = 400,
  height: number = 400,
  planet: PlanetarySquare = 'saturn'
): { x: number; y: number }[] {
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.36;

  const points: { x: number; y: number }[] = [];
  const totalLetters = letters.length;

  for (let i = 0; i < totalLetters; i++) {
    const charCode = letters.charCodeAt(i) - 65; // 0 to 25
    let angle = 0;

    if (planet === 'saturn') {
      // 3x3 Grid distribution
      const step = (charCode % 9);
      const row = Math.floor(step / 3);
      const col = step % 3;
      const x = cx + (col - 1) * (radius * 0.7);
      const y = cy + (row - 1) * (radius * 0.7);
      points.push({ x, y });
    } else if (planet === 'sun' || planet === 'jupiter') {
      // Radial Astrological Nodal Ring
      angle = ((charCode % 12) / 12) * Math.PI * 2 - Math.PI / 2;
      const rRatio = 0.4 + ((charCode % 5) / 5) * 0.6;
      points.push({
        x: cx + Math.cos(angle) * (radius * rRatio),
        y: cy + Math.sin(angle) * (radius * rRatio)
      });
    } else {
      // Circular Rose Wheel distribution
      angle = (i / totalLetters) * Math.PI * 2 - Math.PI / 2;
      const jitter = ((charCode % 7) - 3) * 8;
      points.push({
        x: cx + Math.cos(angle) * (radius + jitter),
        y: cy + Math.sin(angle) * (radius + jitter)
      });
    }
  }

  return points;
}

/**
 * Generate complete SVG markup for a Sigil
 */
export function buildSigilSVG(
  intent: string,
  planet: PlanetarySquare = 'sun',
  color: string = '#E5A93C',
  glowColor: string = '#FF5500',
  strokeWidth: number = 3
): { svg: string; nodes: { x: number; y: number }[]; cleaned: string } {
  const cleaned = processIntentString(intent);
  const nodes = generateSigilNodes(cleaned, 400, 400, planet);

  const cx = 200;
  const cy = 200;
  const outerR = 180;
  const innerR = 168;

  // Build Sigil Node Path with Bezier curves
  let pathD = '';
  if (nodes.length > 0) {
    pathD = `M ${nodes[0].x} ${nodes[0].y}`;
    for (let i = 1; i < nodes.length; i++) {
      const prev = nodes[i - 1];
      const curr = nodes[i];
      const midX = (prev.x + curr.x) / 2;
      const midY = (prev.y + curr.y) / 2;
      pathD += ` Q ${midX + (i % 2 === 0 ? 15 : -15)} ${midY + (i % 2 === 0 ? -15 : 15)}, ${curr.x} ${curr.y}`;
    }
  }

  // Construct SVG elements
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <filter id="sigilGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <radialGradient id="sigilBg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#180c1e" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#05020a" stop-opacity="0.98" />
    </radialGradient>
  </defs>

  <!-- Background Altar Circle -->
  <rect width="400" height="400" fill="url(#sigilBg)" rx="16" />

  <!-- Sacred Geometry Outer Ring -->
  <circle cx="${cx}" cy="${cy}" r="${outerR}" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.6" />
  <circle cx="${cx}" cy="${cy}" r="${innerR}" fill="none" stroke="${color}" stroke-width="0.8" stroke-dasharray="4 4" opacity="0.8" />
  <circle cx="${cx}" cy="${cy}" r="120" fill="none" stroke="${color}" stroke-width="0.5" opacity="0.3" />

  <!-- Cardinal Ritual Crosshair Marks -->
  <line x1="${cx}" y1="${cy - outerR - 10}" x2="${cx}" y2="${cy - outerR + 10}" stroke="${color}" stroke-width="2" />
  <line x1="${cx}" y1="${cy + outerR - 10}" x2="${cx}" y2="${cy + outerR + 10}" stroke="${color}" stroke-width="2" />
  <line x1="${cx - outerR - 10}" y1="${cy}" x2="${cx - outerR + 10}" y2="${cy}" stroke="${color}" stroke-width="2" />
  <line x1="${cx + outerR - 10}" y1="${cy}" x2="${cx + outerR + 10}" y2="${cy}" stroke="${color}" stroke-width="2" />

  <!-- Central Sigil Path -->
  <path d="${pathD}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" filter="url(#sigilGlow)" />

  <!-- Node Terminals (First Ring, Last Cross) -->
  ${nodes.map((n, idx) => {
    if (idx === 0) {
      // Initial Circle Terminal
      return `<circle cx="${n.x}" cy="${n.y}" r="6" fill="${glowColor}" stroke="${color}" stroke-width="2" />`;
    } else if (idx === nodes.length - 1) {
      // Terminal Cross
      return `
        <line x1="${n.x - 7}" y1="${n.y - 7}" x2="${n.x + 7}" y2="${n.y + 7}" stroke="${color}" stroke-width="3" />
        <line x1="${n.x - 7}" y1="${n.y + 7}" x2="${n.x + 7}" y2="${n.y - 7}" stroke="${color}" stroke-width="3" />
      `;
    } else {
      // Inner Node Dots
      return `<circle cx="${n.x}" cy="${n.y}" r="3.5" fill="${color}" opacity="0.8" />`;
    }
  }).join('\n')}

  <!-- Center Eye / Diamond Glyph -->
  <polygon points="${cx},${cy - 8} ${cx + 8},${cy} ${cx},${cy + 8} ${cx - 8},${cy}" fill="none" stroke="${color}" stroke-width="1.2" opacity="0.5" />
</svg>
  `.trim();

  return { svg, nodes, cleaned };
}

/**
 * Generate Sigil object ready to save to gallery
 */
export function createSigilObject(
  intent: string,
  planet: PlanetarySquare = 'sun',
  color: string = '#E5A93C',
  glowColor: string = '#FF5500'
): Sigil {
  const { svg, nodes, cleaned } = buildSigilSVG(intent, planet, color, glowColor);

  return {
    id: 'sigil_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    intent,
    cleanedIntent: cleaned,
    planetarySquare: planet,
    color,
    glowColor,
    strokeWidth: 3,
    nodePoints: nodes,
    svgContent: svg,
    createdAt: new Date().toISOString(),
    tags: [planet, 'manifestation', 'sigil']
  };
}
