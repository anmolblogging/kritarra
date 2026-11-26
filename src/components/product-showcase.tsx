'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Gem, Heart, Mail, Minus, Plus, Sparkles, X } from 'lucide-react';
import { useStore } from './store';
import { contactEmail, priceLabel, type Product } from '@/lib/catalog';
import type { ProductShowcaseData, ShowcaseImage } from '@/lib/product-showcase';
import './product-showcase.css';

function Picture({ image, sizes, eager = false }: { image: ShowcaseImage; sizes: string; eager?: boolean }) {
  return <img src={image.src} srcSet={image.srcSet} sizes={sizes} width={image.width} height={image.height} alt={image.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" style={image.position ? { objectPosition: image.position } : undefined} />;
}

/* Full-screen viewer for the gallery: arrows, Escape and swipe-free keyboard navigation. */
function Lightbox({ images, index, onClose, onStep }: { images: ShowcaseImage[]; index: number; onClose: () => void; onStep: (delta: number) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onStep(1);
      if (event.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = overflow; previous?.focus(); };
  }, [onClose, onStep]);
  const image = images[index];
  return <div className="pdp-lightbox" role="dialog" aria-modal="true" aria-label="Product images" onClick={onClose}>
    <button ref={closeRef} className="pdp-lightbox-close" onClick={onClose} aria-label="Close images"><X size={22} /></button>
    <figure onClick={event => event.stopPropagation()}>
      <img key={image.src} src={image.srcSet.split(', ').at(-1)?.split(' ')[0] ?? image.src} alt={image.alt} />
      {image.caption && <figcaption>{image.caption}</figcaption>}
    </figure>
    <button className="pdp-lightbox-step prev" onClick={event => { event.stopPropagation(); onStep(-1); }} aria-label="Previous image"><ArrowLeft size={20} /></button>
    <button className="pdp-lightbox-step next" onClick={event => { event.stopPropagation(); onStep(1); }} aria-label="Next image"><ArrowRight size={20} /></button>
    <span className="pdp-lightbox-count">{index + 1} / {images.length}</span>
  </div>;
}

function SizeGuide({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return <div className="pdp-sheet-backdrop" onClick={onClose}>
    <div className="pdp-sheet" role="dialog" aria-modal="true" aria-labelledby="size-guide-title" onClick={event => event.stopPropagation()}>
      <button ref={closeRef} className="pdp-sheet-close" onClick={onClose} aria-label="Close size guide"><X size={20} /></button>
      <span className="pdp-eyebrow">Ring sizing</span>
      <h2 id="size-guide-title">Finding your size</h2>
      <ol>
        <li>Wrap a thin strip of paper around the base of the finger you will wear the ring on.</li>
        <li>Mark where it overlaps and measure the length in millimetres: this is the circumference.</li>
        <li>Measure at the end of the day, when fingers are at their fullest, and around the knuckle if it is wider.</li>
      </ol>
      <p>Sizes shown are Indian ring sizes. If you are unsure, choose <strong>Not sure</strong>: the atelier confirms the fit with you before a piece is finished.</p>
      <Link href="/contact/" className="pdp-text-link">Arrange a sizing appointment <ArrowUpRight size={14} /></Link>
    </div>
  </div>;
}

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = `pdp-${title.toLowerCase().replace(/[^a-z]+/g, '-')}`;
  return <div className={`pdp-accordion${open ? ' is-open' : ''}`}>
    <h3><button aria-expanded={open} aria-controls={id} onClick={() => setOpen(value => !value)}>{title}{open ? <Minus size={15} /> : <Plus size={15} />}</button></h3>
    <div id={id} className="pdp-accordion-body" role="region"><div>{children}</div></div>
  </div>;
}

export function ProductShowcase({ product, showcase }: { product: Product; showcase: ProductShowcaseData }) {
  const { addToBag, wishlist, toggleWish } = useStore();
  const [size, setSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [viewer, setViewer] = useState<number | null>(null);
  const [guide, setGuide] = useState(false);
  const [slide, setSlide] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const saved = wishlist.includes(product.id);
  const images = showcase.gallery;

  const step = useCallback((delta: number) => setViewer(current => current === null ? current : (current + delta + images.length) % images.length), [images.length]);
  const close = useCallback(() => setViewer(null), []);

  // Mobile gallery: track which slide is in view for the counter and dots.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const onScroll = () => setSlide(Math.round(rail.scrollLeft / Math.max(1, rail.clientWidth)));
    rail.addEventListener('scroll', onScroll, { passive: true });
    return () => rail.removeEventListener('scroll', onScroll);
  }, []);

  const sized = showcase.sizes.length > 0;
  const add = () => {
    if (!sized) { addToBag(product.id, product.variants[0].id); return; }
    if (!size) { setSizeError(true); return; }
    addToBag(product.id, size === 'confirm' ? 'size-to-confirm' : `size-${size}`);
  };

  return <main id="main" className="pdp">
    <section className="pdp-hero" aria-label={product.name}>
      <div className="pdp-gallery">
        <div ref={railRef} className="pdp-gallery-rail">
          {images.map((image, index) => <button key={image.src} className="pdp-gallery-item" onClick={() => setViewer(index)} aria-label={`View image ${index + 1} of ${images.length} full screen`}>
            <Picture image={image} sizes="(max-width: 899px) 100vw, 49vw" eager={index < 2} />
            {image.caption && <span className="pdp-gallery-caption">{image.caption}</span>}
          </button>)}
        </div>
        <div className="pdp-gallery-dots" aria-hidden="true">
          {images.map((image, index) => <span key={image.src} className={index === slide ? 'is-active' : undefined} />)}
          <span className="pdp-gallery-count">{slide + 1} / {images.length}</span>
        </div>
      </div>

      <div className="pdp-info">
        <div className="pdp-info-inner">
          <Link href={showcase.collection.href} className="pdp-collection">{showcase.collection.name}</Link>
          <h1>{product.name}</h1>
          <p className="pdp-subtitle">{showcase.subtitle}</p>
          <div className="pdp-description">
            <p>{showcase.summary}</p>
            <p>{showcase.description[0]}</p>
          </div>

          {sized && <><div className="pdp-size">
            <label htmlFor="pdp-size-select">Ring size</label>
            <div className="pdp-select">
              <select id="pdp-size-select" value={size ?? ''} onChange={event => { setSize(event.target.value || null); setSizeError(false); }} aria-invalid={sizeError}>
                <option value="">Select a size</option>
                {showcase.sizes.map(option => <option key={option} value={option}>Size {option}</option>)}
                <option value="confirm">Not sure of my size</option>
              </select>
            </div>
            <button className="pdp-text-link" onClick={() => setGuide(true)}>Size guide</button>
          </div>
          {sizeError && <p className="pdp-size-error" role="alert">Please choose a ring size, or select Not sure of my size.</p>}</>}

          <button className="pdp-cta" onClick={add}>
            <span>{priceLabel(product.price)}</span>
            <span>Make an enquiry</span>
          </button>
          <p className="pdp-code">Product code: to be assigned</p>

          <div className="pdp-secondary">
            <button className={`pdp-secondary-link${saved ? ' is-saved' : ''}`} aria-pressed={saved} onClick={() => toggleWish(product.id)}><Heart size={15} fill={saved ? 'currentColor' : 'none'} />{saved ? 'Saved to wishlist' : 'Add to wishlist'}</button>
            <Link href="/contact/" className="pdp-secondary-link"><CalendarDays size={15} />Book an appointment</Link>
            <a className="pdp-secondary-link" href={`mailto:${contactEmail}?subject=${encodeURIComponent(`Enquiry: ${product.name}`)}`}><Mail size={15} />Email us</a>
          </div>

          <div className="pdp-accordions">
            <Accordion title="Specifications">
              <dl>{showcase.specifications.map(spec => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}</dl>
            </Accordion>
            <Accordion title="Delivery & returns">
              <p>Delivery, insurance and return arrangements are confirmed with every enquiry.</p>
              <Link href="/policies/shipping/" className="pdp-text-link">Shipping &amp; returns <ArrowUpRight size={14} /></Link>
            </Accordion>
            <Accordion title="Care">
              <p>Guidance on wearing, storing and cleaning fine jewellery.</p>
              <Link href="/policies/care/" className="pdp-text-link">Jewellery care <ArrowUpRight size={14} /></Link>
            </Accordion>
          </div>
          <p className="pdp-preview-note">{showcase.note}</p>
        </div>
      </div>
    </section>

    <section className="pdp-story" aria-labelledby="pdp-story-heading">
      <div className="pdp-story-media"><Picture image={showcase.story.image} sizes="(max-width: 899px) 100vw, 50vw" /></div>
      <div className="pdp-story-copy">
        <span className="pdp-eyebrow">{showcase.story.eyebrow}</span>
        <h2 id="pdp-story-heading">{showcase.story.heading}</h2>
        <p>{showcase.story.body}</p>
        <Link href={showcase.story.link.href} className="pdp-text-link">{showcase.story.link.label} <ArrowUpRight size={14} /></Link>
      </div>
    </section>

    <section className="pdp-related" aria-labelledby="pdp-related-heading">
      <div className="pdp-related-head">
        <h2 id="pdp-related-heading">You may also like</h2>
        <Link href={showcase.relatedLink.href} className="pdp-text-link">{showcase.relatedLink.label} <ArrowUpRight size={14} /></Link>
      </div>
      <div className="pdp-related-grid">
        {showcase.related.map(item => <Link key={item.name} href={item.href} className="pdp-related-card">
          <div className="pdp-related-media"><Picture image={item.image} sizes="(max-width: 899px) 70vw, 30vw" /></div>
          <h3>{item.name}</h3>
          <p>{item.note} · {priceLabel(null)}</p>
        </Link>)}
      </div>
    </section>

    <section className="pdp-services" aria-label="Kritarra services">
      <Link href="/contact/"><CalendarDays size={22} strokeWidth={1.2} /><strong>Private appointments</strong><span>View pieces in person with a Kritarra specialist.</span></Link>
      <Link href="/contact/"><Sparkles size={22} strokeWidth={1.2} /><strong>Bespoke commissions</strong><span>Begin a piece designed around your own stone or story.</span></Link>
      <Link href="/policies/care/"><Gem size={22} strokeWidth={1.2} /><strong>Jewellery care</strong><span>How to keep each creation at its best.</span></Link>
    </section>

    {viewer !== null && <Lightbox images={images} index={viewer} onClose={close} onStep={step} />}
    {guide && <SizeGuide onClose={() => setGuide(false)} />}
  </main>;
}
