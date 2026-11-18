import pdp from './pdp-images.json';
import lookbook from './lookbook-images.json';

/*
 * Editorial content for the redesigned product page (gallery, story, related pieces).
 * Copy is taken from the client's Emerald Collection lookbook; anything the client has
 * not confirmed is shown as "on request" rather than guessed.
 */

export type ShowcaseImage = { src: string; srcSet: string; width: number; height: number; alt: string; caption?: string; position?: string };

const fromPdp = (id: keyof typeof pdp, alt: string, extra: Partial<ShowcaseImage> = {}): ShowcaseImage => ({ ...pdp[id], alt, ...extra });
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
  sizes: string[];
  story: { image: ShowcaseImage; eyebrow: string; heading: string; body: string; link: { label: string; href: string } };
  related: { name: string; note: string; href: string; image: ShowcaseImage }[];
};

export const productShowcases: ProductShowcaseData[] = [
  {
    slug: 'emerald-toi-et-moi-ring',
    collection: { name: 'The Emerald Collection', href: '/lookbook/#emerald' },
    gallery: [
      fromPdp('toi-et-moi-front', 'Emerald Toi et Moi Ring: two emerald-cut emeralds on a diamond-set gold band'),
      fromPdp('toi-et-moi-stone', 'Close view of the principal emerald-cut emerald and its claw setting'),
      fromPdp('toi-et-moi-accent', 'Close view of the second emerald framed by diamonds'),
      fromPdp('emerald-campaign-ring', 'An emerald ring worn in the Emerald Collection campaign', { caption: 'The Emerald Collection campaign', position: '50% 30%' }),
    ],
    subtitle: 'In emeralds and diamonds',
    summary: 'Two emerald-cut emeralds meet across the finger, held on a band set with diamonds: a piece built around the magnetism of exceptional stones.',
    highlights: ['Produced in extremely limited numbers', 'Viewing by private appointment'],
    description: [
      'Monumental emeralds anchor each piece in The Emerald Collection with depth and intensity, surrounded by diamonds arranged in sharp, luminous structures.',
      'Each creation is produced in extremely limited numbers, often no more than two or three pieces worldwide, making every jewel deeply personal and collectible.',
    ],
    specifications: [
      { label: 'Collection', value: 'The Emerald Collection' },
      { label: 'Principal stones', value: 'Two emerald-cut emeralds' },
      { label: 'Accent stones', value: 'Diamonds' },
      { label: 'Metal', value: 'Confirmed with the atelier on enquiry' },
      { label: 'Stone weights', value: 'Shared on request' },
      { label: 'Reference', value: 'To be assigned' },
    ],
    sizes: ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
    story: {
      image: fromLookbook('emerald-cover', 'Emerald and diamond jhumka earrings from The Emerald Collection'),
      eyebrow: 'The Emerald Collection',
      heading: 'A collection created around the magnetism of exceptional stones.',
      body: 'The collection explores the tension between precision and sensuality through bold compositions of emeralds, rubies and diamonds.',
      link: { label: 'Discover the lookbook', href: '/lookbook/#emerald' },
    },
    related: [
      { name: 'Monumental Emerald Ring', note: 'Pavé diamond band', href: '/lookbook/#emerald-rings', image: fromLookbook('emerald-pave-ring', 'A monumental emerald on a pavé diamond band') },
      { name: 'Ruby and Emerald Ring', note: 'Two-finger design', href: '/lookbook/#emerald-rings', image: fromLookbook('emerald-twin-ring', 'A ruby and emerald two-finger ring') },
      { name: 'Ruby Cluster Rings', note: 'As worn', href: '/lookbook/#emerald-rings', image: fromLookbook('emerald-rings', 'Ruby and emerald cluster rings worn on the hand') },
    ],
  },
];

export const getProductShowcase = (slug: string) => productShowcases.find(showcase => showcase.slug === slug);
