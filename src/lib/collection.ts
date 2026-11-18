import lookbookImages from './lookbook-images.json';
import pdpImages from './pdp-images.json';

/*
 * The collection listing: every piece photographed for the Liaison and
 * Emerald lookbooks, plus catalogue products that have their own page.
 * Names are descriptive working names taken from the lookbook captions until
 * Kritarra supplies official names and prices.
 */

export type CollectionImage = { src: string; srcSet: string; width: number; height: number };
export type CollectionCategory = { slug: string; label: string };
export type CollectionPiece = {
  id: string;
  name: string;
  category: string; // CollectionCategory slug
  collection: 'liaison' | 'emerald';
  images: CollectionImage[];
  alt: string;
  /** Catalogue product slug when the piece has its own product page. */
  productSlug?: string;
  /** Background behind the still: Liaison is shot on white, Emerald on studio grey. */
  ground: string;
};

export const collectionCategories: CollectionCategory[] = [
  { slug: 'rings', label: 'Rings' },
  { slug: 'necklaces', label: 'Necklaces' },
  { slug: 'earrings', label: 'Earrings' },
  { slug: 'bracelets', label: 'Bracelets' },
  { slug: 'hair-jewellery', label: 'Hair Jewellery' },
];

export const lookbookNames = { liaison: 'Liaison', emerald: 'The Emerald Collection' } as const;

type LookbookId = keyof typeof lookbookImages;
const WHITE = '#efefef';
const GREY = '#ababab';

const still = (id: LookbookId, name: string, category: string, alt: string): CollectionPiece => {
  const collection = id.startsWith('liaison') ? 'liaison' : 'emerald';
  return { id, name, category, collection, alt, images: [lookbookImages[id]], ground: collection === 'liaison' ? WHITE : GREY };
};

export const collectionPieces: CollectionPiece[] = [
  {
    id: 'emerald-toi-et-moi-ring', name: 'Emerald Toi et Moi Ring', category: 'rings', collection: 'emerald',
    alt: 'Two emerald-cut emeralds set face to face on a diamond-set band', productSlug: 'emerald-toi-et-moi-ring', ground: GREY,
    images: [pdpImages['toi-et-moi-front'], pdpImages['toi-et-moi-stone'], pdpImages['toi-et-moi-accent']],
  },
  still('emerald-pave-ring', 'Emerald Pavé Ring', 'rings', 'Monumental emerald on a pavé diamond band'),
  still('liaison-statement', 'Three-Strand Openwork Necklace', 'necklaces', 'Openwork gold necklace with three articulated strands'),
  still('emerald-jhumkas', 'Emerald Pearl Jhumkas', 'earrings', 'Emerald and diamond jhumka earrings with pearl drops'),
  still('liaison-sculpted-cuff', 'Sculpted Cuff', 'bracelets', 'Sculpted gold cuff with diamond-set curves'),
  still('emerald-pearl-necklace', 'Emerald Pearl Drop Necklace', 'necklaces', 'Emerald and diamond necklace with pearl drops'),
  still('liaison-leaf-headband', 'Leaf Headband', 'hair-jewellery', 'Gold leaf headband set with diamonds'),
  still('emerald-ruby-cuff', 'Ruby Floral Cuff', 'bracelets', 'Ruby and diamond floral cuff in gold'),
  still('emerald-twin-ring', 'Ruby & Emerald Twin Ring', 'rings', 'Ruby and emerald two-finger ring'),
  still('liaison-wave-collar', 'Wave Collar', 'necklaces', 'Undulating gold collar edged with diamonds'),
  still('emerald-frame-earrings', 'Framed Emerald Earrings', 'earrings', 'Emerald-cut emeralds in diamond frames'),
  still('liaison-openwork-cuff', 'Openwork Link Cuff', 'bracelets', 'Openwork gold cuff with diamond-set links'),
  still('emerald-chain-tikka', 'Emerald Chain Maang Tikka', 'hair-jewellery', 'Emerald and diamond maang tikka on a gold chain'),
  still('liaison-oval-link-collar', 'Oval Link Collar', 'necklaces', 'Gold collar of openwork oval links'),
  still('emerald-pear-drops', 'Emerald Pear Drops', 'earrings', 'Pear-shaped emerald drop earrings'),
  still('emerald-wrap-bracelet', 'Emerald Wrap Bracelet', 'bracelets', 'Emerald and diamond wrap bracelet'),
  still('liaison-floral-link-collar', 'Floral Link Collar', 'necklaces', 'Gold collar of diamond-set floral links'),
  still('emerald-long-jhumkas', 'Long Emerald Jhumkas', 'earrings', 'Long emerald and diamond earrings with pearl jhumkas'),
  still('liaison-link-headband', 'Square Link Headband', 'hair-jewellery', 'Gold headband of diamond-set square links'),
  still('liaison-pierced-cuff', 'Pierced Cuff', 'bracelets', 'Pierced gold cuff set with diamonds'),
  still('emerald-bird-earrings', 'Enamelled Bird Earrings', 'earrings', 'Enamelled gold bird earrings'),
  still('liaison-wing-piece', 'Winged Openwork Necklace', 'necklaces', 'Winged openwork gold piece scattered with diamonds'),
  still('emerald-flower-bangle', 'Ruby Bangle with Emerald Flower', 'bracelets', 'Ruby bangle with an emerald flower'),
  still('emerald-line-drops', 'Emerald Line Earrings', 'earrings', 'Long emerald and diamond line earrings'),
  still('liaison-lace-piece', 'Lace Openwork Necklace', 'necklaces', 'Lace-like openwork gold piece set with diamonds'),
  still('emerald-pendant-tikka', 'Emerald Pendant Maang Tikka', 'hair-jewellery', 'Emerald and diamond maang tikka'),
  still('liaison-buckle-cuff', 'Buckle Cuff', 'bracelets', 'Gold cuff with a diamond-set buckle'),
  still('emerald-ruby-studs', 'Ruby, Pearl & Emerald Earrings', 'earrings', 'Ruby earrings framed in pearls and emeralds'),
  still('liaison-ladder-collar', 'Ladder Collar', 'necklaces', 'Articulated gold ladder collar'),
  still('emerald-shell-ornaments', 'Gold Shell Hair Ornaments', 'hair-jewellery', 'Sculpted gold shell hair ornaments'),
];

export const pieceHref = (piece: CollectionPiece) =>
  piece.productSlug ? `/products/${piece.productSlug}/` : `/contact/?interest=${encodeURIComponent(piece.name)}`;
