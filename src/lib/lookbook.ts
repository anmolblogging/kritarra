import images from './lookbook-images.json';

/*
 * Lookbook 2026: the two printed lookbooks (Liaison and The Emerald
 * Collection) as web spreads. Each spread is two pages, read left to right,
 * following the page grammar of the printed books.
 */

type ImageId = keyof typeof images;
export type LookbookImage = { src: string; srcSet: string; width: number; height: number; alt: string };

const image = (id: ImageId, alt: string): LookbookImage => ({ ...images[id], alt });

export type LookbookChapter = { id: string; en: string; hi: string };
export type LookbookPiece = { image: LookbookImage; type: string };
export type LookbookPage =
  | { kind: 'cover'; image: LookbookImage }
  | { kind: 'title' }
  | { kind: 'statement' }
  | { kind: 'photo'; image: LookbookImage; chapter?: LookbookChapter; position?: string }
  | { kind: 'still'; piece: LookbookPiece; position?: string }
  | { kind: 'pair'; pieces: [LookbookPiece, LookbookPiece] };
export type LookbookSpread = readonly [LookbookPage, LookbookPage];

export type LookbookCollection = {
  id: string;
  name: string;
  tagline: string;
  intro: readonly string[];
  /** Product stills are shot on white (Liaison) or studio grey (Emerald). */
  ground: 'white' | 'grey';
  chapters: readonly LookbookChapter[];
  spreads: readonly LookbookSpread[];
};

const piece = (id: ImageId, type: string, alt: string): LookbookPiece => ({ image: image(id, alt), type });

const liaisonChapters = {
  necklaces: { id: 'liaison-necklaces', en: 'Necklaces', hi: 'कंठहार' },
  bracelets: { id: 'liaison-bracelets', en: 'Bracelets', hi: 'कंगन' },
  headbands: { id: 'liaison-headbands', en: 'Headbands', hi: 'केशबंध' },
} as const;

const liaison: LookbookCollection = {
  id: 'liaison',
  name: 'Liaison',
  tagline: 'A collection shaped by movement, softness, and intimacy.',
  intro: [
    'Liaison explores the meeting point between high jewellery and couture. Sculpted gold forms set with diamonds are designed to move through silk, wrap around the wrist, gather at the neck, or settle into the hair with natural fluidity. Each piece becomes part ornament, part gesture.',
    'Chains curve like folds of silk. Openwork gold mirrors the delicacy of lace and embroidery. Diamond-set clasps and articulated structures allow every creation to be styled in multiple ways, transforming a scarf into jewellery, or jewellery into adornment for the body itself.',
  ],
  ground: 'white',
  chapters: Object.values(liaisonChapters),
  spreads: [
    [{ kind: 'cover', image: image('liaison-cover', 'A sculpted gold cuff tied at the wrist with green printed silk') }, { kind: 'title' }],
    [{ kind: 'statement' }, { kind: 'still', piece: piece('liaison-statement', 'Necklace', 'Openwork gold necklace with three articulated strands') }],
    [
      { kind: 'photo', chapter: liaisonChapters.necklaces, image: image('liaison-necklaces', 'A sculpted gold necklace threaded through printed silk at the neck') },
      { kind: 'still', piece: piece('liaison-wave-collar', 'Necklace', 'Undulating gold collar edged with diamonds') },
    ],
    [
      { kind: 'pair', pieces: [piece('liaison-oval-link-collar', 'Necklace', 'Gold collar of openwork oval links'), piece('liaison-floral-link-collar', 'Necklace', 'Gold collar of diamond-set floral links')] },
      { kind: 'photo', image: image('liaison-choker-model', 'An openwork gold choker worn with a navy silk scarf'), position: '50% 30%' },
    ],
    [
      { kind: 'still', piece: piece('liaison-wing-piece', 'Necklace', 'Winged openwork gold piece scattered with diamonds') },
      { kind: 'photo', image: image('liaison-choker-red', 'A diamond-set gold choker worn with red silk'), position: '50% 35%' },
    ],
    [
      { kind: 'still', piece: piece('liaison-lace-piece', 'Necklace', 'Lace-like openwork gold piece set with diamonds') },
      { kind: 'still', piece: piece('liaison-ladder-collar', 'Necklace', 'Articulated gold ladder collar') },
    ],
    [
      { kind: 'photo', chapter: liaisonChapters.bracelets, image: image('liaison-bracelets', 'Stacked sculpted gold bangles gathered with silk at the wrist'), position: '50% 25%' },
      { kind: 'still', piece: piece('liaison-sculpted-cuff', 'Bracelet', 'Sculpted gold cuff with diamond-set curves') },
    ],
    [
      { kind: 'pair', pieces: [piece('liaison-openwork-cuff', 'Bracelet', 'Openwork gold cuff with diamond-set links'), piece('liaison-buckle-cuff', 'Bracelet', 'Gold cuff with a diamond-set buckle')] },
      { kind: 'still', piece: piece('liaison-pierced-cuff', 'Bracelet', 'Pierced gold cuff set with diamonds') },
    ],
    [
      { kind: 'photo', chapter: liaisonChapters.headbands, image: image('liaison-headbands', 'A gold headband inlaid with lapis blue'), position: '50% 20%' },
      { kind: 'still', piece: piece('liaison-link-headband', 'Headband', 'Gold headband of diamond-set square links') },
    ],
    [
      { kind: 'still', piece: piece('liaison-leaf-headband', 'Headband', 'Gold leaf headband set with diamonds') },
      { kind: 'photo', image: image('liaison-leaf-headband-model', 'A gold leaf headband worn over red silk'), position: '50% 20%' },
    ],
  ],
};

const emeraldChapters = {
  necklaces: { id: 'emerald-necklaces', en: 'Necklaces', hi: 'कंठहार' },
  earrings: { id: 'emerald-earrings', en: 'Earrings', hi: 'झुमके' },
  bracelets: { id: 'emerald-bracelets', en: 'Bracelets', hi: 'कंगन' },
  rings: { id: 'emerald-rings', en: 'Rings', hi: 'अंगूठी' },
  maangTikka: { id: 'emerald-maang-tikka', en: 'Maang tikka', hi: 'मांग टीका' },
} as const;

const emerald: LookbookCollection = {
  id: 'emerald',
  name: 'The Emerald Collection',
  tagline: 'A collection created around the magnetism of exceptional stones.',
  intro: [
    'The collection explores the tension between precision and sensuality through bold compositions of emeralds, rubies, and diamonds.',
    'Monumental emeralds anchor each piece with depth and intensity, surrounded by emerald-cut, baguette, square, and brilliant-cut diamonds arranged in sharp, luminous structures.',
  ],
  ground: 'grey',
  chapters: Object.values(emeraldChapters),
  spreads: [
    [{ kind: 'cover', image: image('emerald-cover', 'Emerald and diamond jhumka earrings with pearl drops') }, { kind: 'title' }],
    [{ kind: 'statement' }, { kind: 'still', piece: piece('emerald-statement', 'Maang tikka', 'Emerald and diamond maang tikka on a gold chain') }],
    [
      { kind: 'photo', chapter: emeraldChapters.necklaces, image: image('emerald-necklaces', 'An emerald, diamond and pearl necklace worn with black tulle'), position: '50% 30%' },
      { kind: 'still', piece: piece('emerald-pearl-necklace', 'Necklace', 'Emerald and diamond necklace with pearl drops') },
    ],
    [
      { kind: 'photo', chapter: emeraldChapters.earrings, image: image('emerald-earrings', 'A ruby earring framed in emeralds and pearls'), position: '50% 30%' },
      { kind: 'pair', pieces: [piece('emerald-bird-earrings', 'Earrings', 'Enamelled gold bird earrings'), piece('emerald-ruby-studs', 'Earrings', 'Ruby earrings framed in pearls and emeralds')] },
    ],
    [
      { kind: 'photo', image: image('emerald-veil-earring', 'A long emerald, diamond and pearl earring worn with a veil'), position: '50% 30%' },
      { kind: 'still', piece: piece('emerald-long-jhumkas', 'Earrings', 'Long emerald and diamond earrings with pearl jhumkas') },
    ],
    [
      { kind: 'still', piece: piece('emerald-jhumkas', 'Earrings', 'Emerald and diamond jhumka earrings with pearl drops') },
      { kind: 'photo', image: image('emerald-jhumka-model', 'Emerald and diamond jhumkas framing the face'), position: '50% 30%' },
    ],
    [
      { kind: 'pair', pieces: [piece('emerald-frame-earrings', 'Earrings', 'Emerald-cut emeralds in diamond frames'), piece('emerald-pear-drops', 'Earrings', 'Pear-shaped emerald drop earrings')] },
      { kind: 'still', piece: piece('emerald-line-drops', 'Earrings', 'Long emerald and diamond line earrings') },
    ],
    [
      { kind: 'photo', chapter: emeraldChapters.bracelets, image: image('emerald-bracelets', 'An emerald and diamond hand bracelet worn across the wrist'), position: '50% 40%' },
      { kind: 'still', piece: piece('emerald-wrap-bracelet', 'Bracelet', 'Emerald and diamond wrap bracelet') },
    ],
    [
      { kind: 'photo', image: image('emerald-bangle-model', 'Ruby bangles crowned with an emerald flower'), position: '50% 40%' },
      { kind: 'still', piece: piece('emerald-flower-bangle', 'Bracelet', 'Ruby bangle with an emerald flower') },
    ],
    [
      { kind: 'still', piece: piece('emerald-ruby-cuff', 'Bracelet', 'Ruby and diamond floral cuff in gold') },
      { kind: 'photo', image: image('emerald-cuff-model', 'A ruby cuff and emerald ring worn together'), position: '50% 35%' },
    ],
    [
      { kind: 'photo', chapter: emeraldChapters.rings, image: image('emerald-rings', 'Ruby and emerald cluster rings on the hand'), position: '50% 40%' },
      { kind: 'still', piece: piece('emerald-twin-ring', 'Ring', 'Ruby and emerald two-finger ring') },
    ],
    [
      { kind: 'pair', pieces: [piece('emerald-cut-ring', 'Ring', 'Emerald-cut emerald ring with diamonds'), piece('emerald-pave-ring', 'Ring', 'Monumental emerald on a pavé diamond band')] },
      { kind: 'photo', image: image('emerald-ring-model', 'An emerald ring and earring worn together'), position: '50% 30%' },
    ],
    [
      { kind: 'photo', chapter: emeraldChapters.maangTikka, image: image('emerald-maang-tikka', 'A diamond maang tikka beneath a sheer veil'), position: '50% 25%' },
      { kind: 'still', piece: piece('emerald-pendant-tikka', 'Maang tikka', 'Emerald and diamond maang tikka') },
    ],
    [
      { kind: 'still', piece: piece('emerald-chain-tikka', 'Maang tikka', 'Emerald and diamond maang tikka on a gold chain') },
      { kind: 'photo', image: image('emerald-tikka-model', 'An emerald maang tikka worn at the parting'), position: '50% 25%' },
    ],
    [
      { kind: 'photo', image: image('emerald-shell-model', 'Sculpted gold shell ornaments worn in the hair'), position: '50% 30%' },
      { kind: 'still', piece: piece('emerald-shell-ornaments', 'Hair ornament', 'Sculpted gold shell hair ornaments') },
    ],
  ],
};

export const lookbookCollections: readonly LookbookCollection[] = [liaison, emerald];
