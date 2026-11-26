import images from './lookbook-images.json';

/*
 * Lookbook 2026: the printed Liaison lookbook as web spreads. Each spread is two pages, read left to right,
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
    [{ kind: 'statement' }, { kind: 'photo', image: image('liaison-scarves', 'The printed silk scarves that Liaison pieces are styled with') }],
    [
      { kind: 'photo', chapter: liaisonChapters.necklaces, image: image('liaison-necklaces', 'A sculpted gold necklace threaded through printed silk at the neck') },
      { kind: 'still', piece: piece('liaison-statement', 'Necklace', 'Openwork gold necklace with three articulated strands') },
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
      { kind: 'pair', pieces: [piece('liaison-lace-piece', 'Necklace', 'Lace-like openwork gold piece set with diamonds'), piece('liaison-ladder-collar', 'Necklace', 'Articulated gold ladder collar')] },
      { kind: 'still', piece: piece('liaison-wave-collar', 'Necklace', 'Undulating gold collar edged with diamonds') },
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

export const lookbookCollections: readonly LookbookCollection[] = [liaison];
