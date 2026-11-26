import lookbook from './lookbook-images.json';
import { liaisonPieces, liaisonSpecifications, liaisonStory, liaisonSubtitle, liaisonSummary } from './liaison';

/*
 * Editorial content for the redesigned product page (gallery, story, related pieces).
 * Copy and specifications come from the client's Liaison lookbook and product sheet;
 * anything the client has not confirmed is shown as "on request" rather than guessed.
 */

export type ShowcaseImage = { src: string; srcSet: string; width: number; height: number; alt: string; caption?: string; position?: string };

const fromLookbook = (id: keyof typeof lookbook, alt: string): ShowcaseImage => ({ ...lookbook[id], alt });

export type ProductShowcaseData = {
  slug: string;
  collection: { name: string; href: string };
  gallery: ShowcaseImage[];
  subtitle: string;
  summary: string;
  highlights: string[];
  description: string[];
  specifications: { label: string; value: string }[];
  /** Ring sizes; empty for pieces that need no size. */
  sizes: string[];
  /** Small print under the enquiry buttons. */
  note: string;
  relatedLink: { label: string; href: string };
  story: { image: ShowcaseImage; eyebrow: string; heading: string; body: string; link: { label: string; href: string } };
  related: { name: string; note: string; href: string; image: ShowcaseImage }[];
};

export const productShowcases: ProductShowcaseData[] = [];

// Liaison: every piece from the client's product sheet, with its confirmed specifications.
const liaisonCover = fromLookbook('liaison-cover', 'A sculpted gold cuff tied at the wrist with green printed silk');
productShowcases.push(...liaisonPieces.map((piece, index) => {
  const others = [...liaisonPieces.slice(index + 1), ...liaisonPieces.slice(0, index)];
  const related = [...others.filter(other => other.categories.some(c => piece.categories.includes(c))), ...others.filter(other => !other.categories.some(c => piece.categories.includes(c)))].slice(0, 3);
  return {
    slug: piece.slug,
    collection: { name: 'Liaison', href: '/lookbook/#liaison' },
    gallery: piece.images,
    subtitle: liaisonSubtitle(piece),
    summary: liaisonSummary(piece),
    highlights: [],
    description: [liaisonStory.body],
    specifications: liaisonSpecifications(piece),
    sizes: [],
    note: 'Price and availability on request. Weights are as recorded by the atelier for this piece.',
    relatedLink: { label: 'View the Liaison pieces', href: '/collections/liaison/' },
    story: {
      image: liaisonCover,
      eyebrow: 'Liaison',
      heading: liaisonStory.tagline,
      body: liaisonStory.body,
      link: { label: 'Discover the lookbook', href: '/lookbook/#liaison' },
    },
    related: related.map(other => ({ name: other.name, note: other.type, href: `/products/${other.slug}/`, image: other.images[0] })),
  };
}));

export const getProductShowcase = (slug: string) => productShowcases.find(showcase => showcase.slug === slug);
