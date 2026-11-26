import { liaisonPieces } from './liaison';

/*
 * The collection listing: the Liaison pieces from the client's product sheet,
 * each with its own product page. Names are descriptive working names until
 * Kritarra supplies official names and prices.
 */

export type CollectionImage = { src: string; srcSet: string; width: number; height: number; position?: string };
export type CollectionCategory = { slug: string; label: string };
export type CollectionPiece = {
  id: string;
  name: string;
  /** CollectionCategory slugs this piece is listed under. */
  categories: string[];
  collection: 'liaison';
  images: CollectionImage[];
  alt: string;
  /** Catalogue product slug when the piece has its own product page. */
  productSlug?: string;
  /** Background behind the still: Liaison is shot on white. */
  ground: string;
};

export const lookbookNames = { liaison: 'Liaison' } as const;

const WHITE = '#efefef';

// Liaison comes from the client's product sheet: studio still first, then the piece worn.
export const collectionPieces: CollectionPiece[] = liaisonPieces.map(piece => ({
  id: piece.slug, name: piece.name, categories: [...piece.categories, 'liaison'], collection: 'liaison', alt: piece.images[0].alt,
  images: piece.images, productSlug: piece.slug, ground: WHITE,
}));

const allCategories: CollectionCategory[] = [
  { slug: 'rings', label: 'Rings' },
  { slug: 'necklaces', label: 'Necklaces' },
  { slug: 'earrings', label: 'Earrings' },
  { slug: 'bracelets', label: 'Bracelets' },
  // The Liaison collection as its own tab (it replaced Hair Jewellery).
  { slug: 'liaison', label: 'Liaison' },
];

/** Only categories that currently hold pieces get a tab and a page. */
export const collectionCategories = allCategories.filter(category => collectionPieces.some(piece => piece.categories.includes(category.slug)));

export const pieceHref = (piece: CollectionPiece) =>
  piece.productSlug ? `/products/${piece.productSlug}/` : `/contact/?interest=${encodeURIComponent(piece.name)}`;
