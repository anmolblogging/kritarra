'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Heart, Minus, Plus, X } from 'lucide-react';
import { useStore } from './store';
import { collectionCategories, collectionPieces, lookbookNames, pieceHref, type CollectionPiece } from '@/lib/collection';
import './collection-grid.css';

const PAGE_SIZE = 16;
type Sort = 'featured' | 'az' | 'za';
type LookbookFilter = 'all' | keyof typeof lookbookNames;
const sortLabels: Record<Sort, string> = { featured: 'Featured', az: 'Name, A–Z', za: 'Name, Z–A' };
const sizes = '(min-width: 990px) calc((100vw - 160px) / 4), (min-width: 750px) calc((100vw - 120px) / 2), 50vw';

function applyFilters(category: string, sort: Sort, lookbook: LookbookFilter) {
  const list = collectionPieces.filter(p => (category === 'all' || p.categories.includes(category)) && (lookbook === 'all' || p.collection === lookbook));
  if (sort === 'az') return [...list].sort((a, b) => a.name.localeCompare(b.name));
  if (sort === 'za') return [...list].sort((a, b) => b.name.localeCompare(a.name));
  return list;
}

function PieceCard({ piece, eager }: { piece: CollectionPiece; eager: boolean }) {
  const { wishlist, toggleWish } = useStore();
  const [slide, setSlide] = useState(0);
  const href = pieceHref(piece);
  const count = piece.images.length;
  const saved = wishlist.includes(piece.id);
  const step = (dir: number) => setSlide(s => (s + dir + count) % count);
  return (
    <li className="cl-card">
      <div className="cl-card-media" style={{ background: piece.ground }}>
        <Link href={href} className="cl-card-link" aria-label={piece.name} tabIndex={-1}>
          <div className="cl-card-track" style={{ transform: `translateX(-${slide * 100}%)` }}>
            {piece.images.map((img, i) => (
              <img key={img.src} src={img.src} srcSet={img.srcSet} sizes={sizes} width={img.width} height={img.height}
                alt={i === 0 ? piece.alt : ''} loading={eager && i === 0 ? 'eager' : 'lazy'} decoding="async"
                className={img.width / img.height > 0.82 ? 'is-contained' : undefined}
                style={img.position ? { objectPosition: img.position } : undefined} />
            ))}
          </div>
        </Link>
        {count > 1 && <>
          <button className="cl-arrow cl-arrow-prev" onClick={() => step(-1)} aria-label={`Previous image of ${piece.name}`}><ChevronLeft size={16} strokeWidth={1.4} /></button>
          <button className="cl-arrow cl-arrow-next" onClick={() => step(1)} aria-label={`Next image of ${piece.name}`}><ChevronRight size={16} strokeWidth={1.4} /></button>
        </>}
        {piece.productSlug && (
          <button className={`cl-wish ${saved ? 'is-saved' : ''}`} onClick={() => toggleWish(piece.id)} aria-pressed={saved}
            aria-label={`${saved ? 'Remove' : 'Save'} ${piece.name} ${saved ? 'from' : 'to'} wishlist`}>
            <Heart size={16} strokeWidth={1.4} fill={saved ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>
      <Link href={href} className="cl-card-info">
        <h2 className="cl-card-title">{piece.name}</h2>
        <span className="cl-card-price">Price on request</span>
      </Link>
    </li>
  );
}

function FilterDrawer({ open, onClose, sort, lookbook, onApply, category }: {
  open: boolean; onClose: () => void; sort: Sort; lookbook: LookbookFilter; category: string;
  onApply: (sort: Sort, lookbook: LookbookFilter) => void;
}) {
  const [draftSort, setDraftSort] = useState(sort);
  const [draftBook, setDraftBook] = useState(lookbook);
  const [section, setSection] = useState<'sort' | 'collection' | null>('sort');
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    setDraftSort(sort); setDraftBook(lookbook);
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = overflow; };
  }, [open, sort, lookbook, onClose]);
  if (!open) return null;
  const results = applyFilters(category, draftSort, draftBook).length;
  const group = (id: 'sort' | 'collection', title: string, options: [string, string][], value: string, set: (v: string) => void) => (
    <div className="cl-drawer-group">
      <button className="cl-drawer-toggle" onClick={() => setSection(s => s === id ? null : id)} aria-expanded={section === id}>
        <span>{title}</span>{section === id ? <Minus size={14} strokeWidth={1.4} /> : <Plus size={14} strokeWidth={1.4} />}
      </button>
      {section === id && (
        <div className="cl-drawer-options" role="radiogroup" aria-label={title}>
          {options.map(([v, label]) => (
            <label key={v} className={value === v ? 'is-active' : undefined}>
              <input type="radio" name={id} value={v} checked={value === v} onChange={() => set(v)} />{label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
  return (
    <div className="cl-drawer-root">
      <button className="cl-drawer-backdrop" onClick={onClose} aria-label="Close filters" tabIndex={-1} />
      <aside className="cl-drawer" role="dialog" aria-modal="true" aria-label="Filter and sort">
        <div className="cl-drawer-head">
          <span>Filter and sort</span>
          <button ref={closeRef} onClick={onClose} aria-label="Close"><X size={16} strokeWidth={1.4} /></button>
        </div>
        <div className="cl-drawer-body">
          {group('sort', `Sort by : ${sortLabels[draftSort]}`, Object.entries(sortLabels), draftSort, v => setDraftSort(v as Sort))}
          {/* Only worth offering once there is more than one collection. */}
          {Object.keys(lookbookNames).length > 1 && group('collection', 'Collection', [['all', 'All collections'], ...Object.entries(lookbookNames)], draftBook, v => setDraftBook(v as LookbookFilter))}
        </div>
        <div className="cl-drawer-foot">
          <button className="cl-btn cl-btn-outline" onClick={() => { setDraftSort('featured'); setDraftBook('all'); }}>Clear all</button>
          <button className="cl-btn cl-btn-solid" onClick={() => { onApply(draftSort, draftBook); onClose(); }}>View {results} {results === 1 ? 'result' : 'results'}</button>
        </div>
      </aside>
    </div>
  );
}

export function CollectionGrid({ category = 'all', title }: { category?: string; title: string }) {
  const [view, setView] = useState<'dense' | 'wide'>('dense');
  const [sort, setSort] = useState<Sort>('featured');
  const [lookbook, setLookbook] = useState<LookbookFilter>('all');
  const [shown, setShown] = useState(PAGE_SIZE);
  const [drawer, setDrawer] = useState(false);
  const closeDrawer = useCallback(() => setDrawer(false), []);
  const tabsRef = useRef<HTMLElement>(null);
  // On narrow screens the tab row scrolls: bring the current tab into view.
  useEffect(() => {
    const row = tabsRef.current;
    const tab = row?.querySelector<HTMLElement>('.is-active');
    if (row && tab && row.scrollWidth > row.clientWidth) {
      row.scrollLeft += tab.getBoundingClientRect().left - row.getBoundingClientRect().left - (row.clientWidth - tab.offsetWidth) / 2;
    }
  }, [category]);
  // Product pages link here with ?collection=liaison to open the list already filtered.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('collection');
    if (requested && requested in lookbookNames) setLookbook(requested as LookbookFilter);
  }, []);
  const pieces = useMemo(() => applyFilters(category, sort, lookbook), [category, sort, lookbook]);
  const visible = pieces.slice(0, shown);
  const remaining = pieces.length - visible.length;
  const tabs = [{ slug: 'all', label: 'All creations', href: '/collections/' }, ...collectionCategories.map(c => ({ ...c, href: `/collections/${c.slug}/` }))];
  const viewToggle = (
    <div className="cl-view" role="group" aria-label="Grid view">
      <span>View :</span>
      <button className={view === 'dense' ? 'is-active' : undefined} aria-pressed={view === 'dense'} onClick={() => setView('dense')}>
        <span className="cl-on-desktop">Four</span><span className="cl-on-mobile">Two</span>
      </button>
      <button className={view === 'wide' ? 'is-active' : undefined} aria-pressed={view === 'wide'} onClick={() => setView('wide')}>
        <span className="cl-on-desktop">Two</span><span className="cl-on-mobile">One</span>
      </button>
    </div>
  );
  const filterButton = <button className="cl-filter-button" onClick={() => setDrawer(true)} aria-haspopup="dialog">Filter &amp; Sort</button>;

  return (
    <div className="cl">
      {/* The active tab already names the page, so the heading is for screen readers only. */}
      <h1 className="sr-only">{title}</h1>
      <div className="cl-toolbar">
        <div className="cl-toolbar-side cl-on-desktop">{viewToggle}</div>
        <nav ref={tabsRef} className="cl-tabs" aria-label="Collection categories">
          {tabs.map(t => (
            <Link key={t.slug} href={t.href} className={t.slug === category ? 'is-active' : undefined} aria-current={t.slug === category ? 'page' : undefined}>{t.label}</Link>
          ))}
        </nav>
        <div className="cl-toolbar-side cl-toolbar-end cl-on-desktop">{filterButton}</div>
      </div>
      <div className="cl-subbar cl-on-mobile">{viewToggle}{filterButton}</div>

      {pieces.length ? (
        <ul className={`cl-grid cl-grid-${view}`}>
          {visible.map((p, i) => <PieceCard key={p.id} piece={p} eager={i < 4} />)}
        </ul>
      ) : (
        <div className="cl-empty">
          <p>No creations match these filters.</p>
          <button className="cl-more-link" onClick={() => { setSort('featured'); setLookbook('all'); }}>Clear filters</button>
        </div>
      )}

      {pieces.length > 0 && (
        <div className="cl-more">
          <div className="cl-progress" aria-hidden="true"><span style={{ width: `${(visible.length / pieces.length) * 100}%` }} /></div>
          <p className="cl-more-count">Showing {visible.length} of {pieces.length} creations</p>
          {remaining > 0 && (
            <button className="cl-more-link" onClick={() => setShown(s => s + PAGE_SIZE)}>
              Load {Math.min(remaining, PAGE_SIZE)} more {Math.min(remaining, PAGE_SIZE) === 1 ? 'creation' : 'creations'}
            </button>
          )}
          <p className="cl-note">Piece names are working names until Kritarra confirms them. Liaison specifications are from the atelier's product sheet; prices are shared on enquiry.</p>
        </div>
      )}

      <FilterDrawer open={drawer} onClose={closeDrawer} sort={sort} lookbook={lookbook} category={category}
        onApply={(s, b) => { setSort(s); setLookbook(b); setShown(PAGE_SIZE); }} />
    </div>
  );
}
