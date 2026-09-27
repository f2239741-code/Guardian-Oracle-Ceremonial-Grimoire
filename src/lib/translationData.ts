export interface CipherMatrix {
  id: string;
  name: string;
  description: string;
  glyphMap: Record<string, string>; // Standard char -> Cipher glyph representation
}

export interface EsotericTranslation {
  sourceText: string;
  cipherId: string;
  literalTranslation: string;
  historicalContext: string;
  energeticSignature: string;
  planetaryRuler: string;
}

export const CIPHER_MATRICES: CipherMatrix[] = [
  {
    id: 'theban',
    name: "Theban Alphabet (Witches' Runes)",
    description: 'Ancient occult script attributed to Honorius of Thebes, optimized for ritual carving and sigil formulation.',
    glyphMap: {
      a: '𝚫', b: '𝛃', c: '𝚲', d: '𝚭', e: '𝚬', f: '𝚽', g: '𝚪', h: '𝚮', i: '𝚰', j: '𝐉',
      k: '𝚱', l: '𝚲', m: '𝚳', n: '𝚴', o: '𝚯', p: '𝚷', q: '𝚀', r: '𝚸', s: '𝚺', t: '𝚻',
      u: '𝚼', v: '𝚾', w: '𝛀', x: '𝚾', y: '𝚼', z: '𝚭', ' ': ' '
    }
  },
  {
    id: 'malachim',
    name: 'Malachim (Angles of Speech)',
    description: 'Kabbalistic alphabet derived from Hebrew and Greek alphabets, used for angelic communication.',
    glyphMap: {
      a: 'ℵ', b: 'beth', c: 'ג', d: 'ד', e: 'ℯ', f: '𝔣', g: '𝔤', h: '𝔥', i: '℩', j: '𝔧',
      k: '𝔨', l: 'ℓ', m: '𝔪', n: '𝔫', o: '𝔬', p: '𝔭', q: '𝔮', r: '𝔯', s: '𝔰', t: '𝔱',
      u: '𝔲', v: '𝔳', w: '𝔴', x: '𝔵', y: '𝔶', z: '𝔷', ' ': ' '
    }
  },
  {
    id: 'enochian',
    name: 'Enochian Prime Glyphs',
    description: 'The angelic language of the watchtowers received by John Dee and Edward Kelley.',
    glyphMap: {
      a: '𐤀', b: '𐤁', c: '𐤂', d: '𐤃', e: '𐤄', f: '𐤅', g: '𐤆', h: '𐤇', i: '𐤈', j: '𐤉',
      k: '𐤊', l: '𐤋', m: '𐤌', n: '𐤍', o: '𐤎', p: '𐤏', q: '𐤐', r: '𐤑', s: '𐤒', t: '𐤓',
      u: '𐤔', v: '𐤕', w: '𐤖', x: '𐤗', y: '𐤘', z: '𐤙', ' ': ' '
    }
  }
];

export function translateToCipher(text: string, cipherId: string): string {
  const cipher = CIPHER_MATRICES.find(c => c.id === cipherId) || CIPHER_MATRICES[0];
  return text
    .toLowerCase()
    .split('')
    .map(char => cipher.glyphMap[char] || char)
    .join('');
}
