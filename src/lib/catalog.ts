import {campaign} from './imagery';
export type Category = 'Rings' | 'Necklaces' | 'Earrings' | 'Bracelets';
export type Product = {
  id: string; slug: string; name: string; category: Category; description: string;
  price: number | null; images: string[]; variants: { id: string; label: string; checkoutVariantId?: string }[];
  specifications: { label: string; value: string }[]; preview: boolean;
};

// Reference entries establish the catalogue experience. They are not products offered for sale.
// Replace with approved catalogue data before enabling purchases. Never infer materials or prices.
export const products: Product[] = [
  { id: 'reference-ring', slug: 'rings', name: 'Rings', category: 'Rings', description: 'A personal expression, held in the smallest of details.', price: null, images: [campaign['Dc-ogQ-vgSm'].src], variants: [{id: 'enquire', label: 'Discuss your preferences'}], specifications: [], preview: true },
  // Showcase product: the layout every product page will follow once approved. Specifications the
  // client has not confirmed (metal caratage, stone weights, price) stay "on request".
  { id: 'emerald-toi-et-moi-ring', slug: 'emerald-toi-et-moi-ring', name: 'Emerald Toi et Moi Ring', category: 'Rings', description: 'Two emerald-cut emeralds set face to face on a diamond-set band, from The Emerald Collection.', price: null, images: ['/images/pdp/toi-et-moi-front-1200.webp', '/images/pdp/toi-et-moi-stone-1200.webp', '/images/pdp/toi-et-moi-accent-1120.webp'], variants: [...['8','9','10','11','12','13','14','15','16','17','18','19','20'].map(size => ({ id: `size-${size}`, label: `Ring size ${size}` })), { id: 'size-to-confirm', label: 'Size to be confirmed' }], specifications: [], preview: true },
  { id: 'reference-necklace', slug: 'necklaces', name: 'Necklaces', category: 'Necklaces', description: 'Discover a different perspective on adornment.', price: null, images: [campaign.DRE3aGHDKCw.src,campaign.DNCz7r3vGng.src,campaign.DdDpJ8EMryv.src], variants: [{id: 'enquire', label: 'Discuss your preferences'}], specifications: [], preview: true },
  { id: 'reference-earrings', slug: 'earrings', name: 'Earrings', category: 'Earrings', description: 'An accent of individuality. An expression all your own.', price: null, images: [campaign.DQRYf7QDNzm.src,campaign.DPGjXdTjAn_.src,campaign.DLM9X0OMU3M.src], variants: [{id: 'enquire', label: 'Discuss your preferences'}], specifications: [], preview: true },
  { id: 'reference-bracelet', slug: 'bracelets', name: 'Bracelets', category: 'Bracelets', description: 'Thoughtful details, worn close.', price: null, images: [campaign.DLK5DXfNPGi.src], variants: [{id: 'enquire', label: 'Discuss your preferences'}], specifications: [], preview: true },
];
export const categories: Category[] = ['Rings', 'Necklaces', 'Earrings', 'Bracelets'];
export const instagram = 'https://www.instagram.com/kritarraofficial/';
export const contactEmail = 'info@kritarra.in';
export const priceLabel = (price: number | null) => price === null ? 'Details on request' : new Intl.NumberFormat('en-IN', {style:'currency', currency:'INR', maximumFractionDigits:0}).format(price);
