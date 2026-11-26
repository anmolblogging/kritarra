import images from './liaison-images.json';

/*
 * Liaison: the fifteen pieces in the client's "Product Detail Liaison" sheet.
 * Metal, diamond quality and weights are copied exactly from that sheet (one
 * page per piece, in the same order). Each piece has its studio still and,
 * where one was supplied, a photograph of it worn.
 *
 * The sheet gives no product names, so names are descriptive working names
 * until Kritarra supplies official ones.
 */

type ImageKey = keyof typeof images;
export type LiaisonImage = { src: string; srcSet: string; width: number; height: number; alt: string; position?: string };
export type LiaisonType = 'Earrings' | 'Bracelet' | 'Brooch' | 'Necklace / headband' | 'Necklace' | 'Brooches / hair clips';

export type LiaisonPiece = {
  slug: string;
  name: string;
  type: LiaisonType;
  /** Collection-page tabs this piece appears under. */
  categories: string[];
  metal: string;
  diamonds: string;
  diamondWeight: string;
  colourStones?: string;
  enamel?: string;
  grossWeight: string;
  netWeight: string;
  images: LiaisonImage[];
};

const still = (key: ImageKey, alt: string): LiaisonImage => ({ ...images[key], alt });
const worn = (key: ImageKey, alt: string, position = '50% 35%'): LiaisonImage => ({ ...images[key], alt, position });
const DIAMONDS = 'Natural diamonds, GH colour, VS clarity';

export const liaisonPieces: LiaisonPiece[] = [
  {
    slug: 'liaison-enamel-bird-earrings', name: 'Enamel Bird Earrings', type: 'Earrings', categories: ['earrings'],
    metal: '18KT yellow gold', diamonds: DIAMONDS, diamondWeight: '0.90 ct', colourStones: '0.63 ct', enamel: '0.13 ct', grossWeight: '16.810 g', netWeight: '16.478 g',
    images: [still('enamel-bird-earrings-still', 'Diamond-framed gold earrings with enamelled birds and flowers'), worn('enamel-bird-earrings-worn', 'The enamel bird earrings worn', '50% 25%')],
  },
  {
    slug: 'liaison-openwork-link-cuff', name: 'Openwork Link Cuff', type: 'Bracelet', categories: ['bracelets'],
    metal: '14KT yellow gold', diamonds: DIAMONDS, diamondWeight: '2.84 ct', grossWeight: '16.020 g', netWeight: '15.452 g',
    images: [still('openwork-link-cuff-still', 'Gold cuff with openwork diamond-set links'), worn('openwork-link-cuff-worn', 'The openwork link cuff worn with a silk scarf threaded through it', '50% 55%')],
  },
  {
    slug: 'liaison-buckle-cuff', name: 'Buckle Cuff', type: 'Bracelet', categories: ['bracelets'],
    metal: '14KT yellow gold', diamonds: DIAMONDS, diamondWeight: '3.12 ct', grossWeight: '18.870 g', netWeight: '18.246 g',
    images: [still('buckle-cuff-still', 'Gold cuff with a diamond-edged buckle'), worn('buckle-cuff-worn', 'The buckle cuff worn with a green silk scarf', '40% 60%')],
  },
  {
    slug: 'liaison-sculpted-cuff', name: 'Sculpted Cuff', type: 'Bracelet', categories: ['bracelets'],
    metal: '14KT yellow gold', diamonds: DIAMONDS, diamondWeight: '1.58 ct', grossWeight: '17.380 g', netWeight: '17.064 g',
    images: [still('sculpted-cuff-still', 'Sculpted gold cuff with diamond-set curves'), worn('sculpted-cuff-worn', 'The sculpted cuff worn at the wrist with a silk scarf', '40% 50%')],
  },
  {
    slug: 'liaison-winged-brooch', name: 'Winged Openwork Brooch', type: 'Brooch', categories: ['brooches'],
    metal: '14KT yellow gold', diamonds: DIAMONDS, diamondWeight: '1.81 ct', grossWeight: '15.720 g', netWeight: '15.358 g',
    images: [still('winged-brooch-still', 'Winged openwork gold brooch scattered with diamonds'), worn('winged-brooch-worn', 'The winged brooch fastening a silk scarf at the neck', '50% 55%')],
  },
  {
    slug: 'liaison-leaf-headband', name: 'Leaf Necklace & Headband', type: 'Necklace / headband', categories: ['necklaces', 'hair-jewellery'],
    metal: '14KT yellow gold', diamonds: DIAMONDS, diamondWeight: '2.39 ct', grossWeight: '21.170 g', netWeight: '20.692 g',
    images: [still('leaf-headband-still', 'Gold piece of diamond-set leaves, worn as a necklace or headband'), worn('leaf-headband-worn', 'The leaf piece worn as a headband over a silk scarf', '50% 20%')],
  },
  {
    slug: 'liaison-floral-square-bracelet', name: 'Floral Square-Link Bracelet', type: 'Bracelet', categories: ['bracelets'],
    metal: '14KT yellow gold', diamonds: DIAMONDS, diamondWeight: '3.80 ct', grossWeight: '29.710 g', netWeight: '28.950 g',
    images: [
      still('floral-square-bracelet-still', 'Gold bracelet of square diamond-set links with flower studs'),
      worn('floral-square-bracelet-worn', 'The floral square-link piece worn in the hair with a blue silk scarf', '50% 20%'),
      worn('floral-square-bracelet-worn2', 'The floral square-link piece worn at the neck with green silk', '50% 45%'),
    ],
  },
  {
    slug: 'liaison-ladder-necklace', name: 'Ladder Necklace & Headband', type: 'Necklace / headband', categories: ['necklaces', 'hair-jewellery'],
    metal: '14KT yellow gold', diamonds: DIAMONDS, diamondWeight: '3.03 ct', grossWeight: '25.900 g', netWeight: '25.294 g',
    images: [still('ladder-necklace-still', 'Articulated gold ladder piece set with diamonds'), worn('ladder-necklace-worn', 'The ladder piece worn as a choker with a red silk scarf', '50% 45%')],
  },
  {
    slug: 'liaison-oval-link-necklace', name: 'Oval Link Necklace & Headband', type: 'Necklace / headband', categories: ['necklaces', 'hair-jewellery'],
    metal: '14KT yellow gold', diamonds: DIAMONDS, diamondWeight: '2.39 ct', grossWeight: '26.940 g', netWeight: '26.462 g',
    images: [still('oval-link-necklace-still', 'Gold piece of openwork oval links'), worn('oval-link-necklace-worn', 'The oval link piece worn as a choker with a navy silk scarf', '50% 50%')],
  },
  {
    slug: 'liaison-floral-link-necklace', name: 'Floral Link Necklace & Headband', type: 'Necklace / headband', categories: ['necklaces', 'hair-jewellery'],
    metal: '14KT yellow gold', diamonds: DIAMONDS, diamondWeight: '1.39 ct', grossWeight: '18.330 g', netWeight: '18.052 g',
    images: [still('floral-link-necklace-still', 'Gold piece of diamond-set floral links'), worn('floral-link-necklace-worn', 'The floral link piece worn as a choker tied with an orange silk scarf', '50% 45%')],
  },
  {
    slug: 'liaison-scroll-necklace', name: 'Scroll Necklace & Headband', type: 'Necklace / headband', categories: ['necklaces', 'hair-jewellery'],
    metal: '14KT yellow gold', diamonds: DIAMONDS, diamondWeight: '2.35 ct', grossWeight: '24.130 g', netWeight: '23.660 g',
    images: [still('scroll-necklace-still', 'Gold piece of diamond-set scrolls around an open centre'), worn('scroll-necklace-worn', 'The scroll piece worn as a choker over a yellow silk scarf', '50% 50%')],
  },
  {
    slug: 'liaison-three-strand-necklace', name: 'Three-Strand Necklace', type: 'Necklace', categories: ['necklaces'],
    metal: '14KT yellow gold', diamonds: DIAMONDS, diamondWeight: '1.20 ct', grossWeight: '18.620 g', netWeight: '18.380 g',
    images: [still('three-strand-necklace-still', 'Openwork gold necklace with three articulated strands'), worn('three-strand-necklace-worn', 'The three-strand necklace worn with a silk scarf', '50% 45%')],
  },
  {
    slug: 'liaison-pierced-cuff', name: 'Pierced Cuff', type: 'Bracelet', categories: ['bracelets'],
    metal: '14KT yellow gold', diamonds: DIAMONDS, diamondWeight: '1.07 ct', grossWeight: '16.260 g', netWeight: '16.046 g',
    images: [still('pierced-cuff-still', 'Pierced gold cuff set with diamonds'), worn('pierced-cuff-worn', 'The pierced cuff worn over a burgundy silk scarf', '55% 50%')],
  },
  {
    slug: 'liaison-wave-necklace', name: 'Wave Necklace', type: 'Necklace', categories: ['necklaces'],
    metal: '14KT yellow gold', diamonds: DIAMONDS, diamondWeight: '1.53 ct', grossWeight: '16.430 g', netWeight: '16.124 g',
    images: [still('wave-necklace-still', 'Undulating gold necklace edged with diamonds')],
  },
  {
    slug: 'liaison-shell-brooches', name: 'Shell Brooches & Hair Clips', type: 'Brooches / hair clips', categories: ['brooches', 'hair-jewellery'],
    metal: '14KT yellow gold', diamonds: DIAMONDS, diamondWeight: '2.100 ct', grossWeight: '32.98 g', netWeight: '32.570 g',
    images: [still('shell-brooches-still', 'Pair of sculpted gold shell brooches set with diamonds'), worn('shell-brooches-worn', 'The shell pieces worn as hair clips', '60% 25%')],
  },
];

/** "Bracelet in 14KT yellow gold with natural diamonds" style subtitle. */
export const liaisonSubtitle = (piece: LiaisonPiece) => `${piece.type} in ${piece.metal}, with natural diamonds`;

/** One-line description built only from the sheet's facts. */
const wornAs: Partial<Record<LiaisonType, string>> = {
  'Necklace / headband': ' Worn as a necklace or as a headband.',
  'Brooches / hair clips': ' Worn as brooches or as hair clips.',
};
export const liaisonSummary = (piece: LiaisonPiece) =>
  `In ${piece.metal}, set with ${piece.diamondWeight} of natural diamonds (GH colour, VS clarity)${piece.colourStones ? `, ${piece.colourStones} of coloured stones and enamel` : ''}.${wornAs[piece.type] ?? ''}`;

export const liaisonSpecifications = (piece: LiaisonPiece) => [
  { label: 'Collection', value: 'Liaison' },
  { label: 'Piece', value: piece.type },
  { label: 'Metal', value: piece.metal },
  { label: 'Diamonds', value: piece.diamonds },
  { label: 'Diamond weight', value: piece.diamondWeight },
  ...(piece.colourStones ? [{ label: 'Coloured stones', value: piece.colourStones }] : []),
  ...(piece.enamel ? [{ label: 'Enamel', value: piece.enamel }] : []),
  { label: 'Gross weight', value: piece.grossWeight },
  { label: 'Net weight', value: piece.netWeight },
];

/** Client copy from the Liaison lookbook. */
export const liaisonStory = {
  tagline: 'A collection shaped by movement, softness, and intimacy.',
  body: 'Liaison explores the meeting point between high jewellery and couture. Sculpted gold forms set with diamonds are designed to move through silk, wrap around the wrist, gather at the neck, or settle into the hair with natural fluidity.',
};
