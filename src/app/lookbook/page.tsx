import type { Metadata } from 'next';
import Link from 'next/link';
import { KritarraLockup, KritarraSymbol } from '@/components/logo';
import { lookbookCollections, type LookbookCollection, type LookbookImage, type LookbookPage, type LookbookPiece } from '@/lib/lookbook';
import './lookbook.css';

export const metadata: Metadata = {
  title: 'Lookbook 2026',
  description: 'Liaison and The Emerald Collection: the Kritarra 2026 lookbooks.',
};

const pad = (n: number) => String(n).padStart(2, '0');

function Photo({ image, sizes, position, eager = false }: { image: LookbookImage; sizes: string; position?: string; eager?: boolean }) {
  return <img src={image.src} srcSet={image.srcSet} sizes={sizes} width={image.width} height={image.height} alt={image.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" style={position ? { objectPosition: position } : undefined} />;
}

function RunningFoot({ collection }: { collection: LookbookCollection }) {
  return <div className="lb-foot" aria-hidden="true"><span>{collection.name}</span><KritarraSymbol className="lb-foot-symbol" /><span>Lookbook 2026</span></div>;
}

function Caption({ piece, number }: { piece: LookbookPiece; number: number }) {
  return <figcaption className="lb-caption"><span>No. {pad(number)}</span><span>{piece.type}</span></figcaption>;
}

function Page({ page, collection, numbers, first }: { page: LookbookPage; collection: LookbookCollection; numbers: number[]; first: boolean }) {
  const half = '(max-width: 767px) 100vw, 50vw';
  switch (page.kind) {
    case 'cover':
      return <div className="lb-page lb-cover">
        <Photo image={page.image} sizes={half} eager={first} />
        <span className="lb-cover-mark">Lookbook 2026</span>
        <div className="lb-cover-lockup"><KritarraLockup className="lb-cover-logo" /><span>High jewellery</span></div>
      </div>;
    case 'title':
      return <div className="lb-page lb-title">
        <span className="lb-title-mark">Lookbook 2026</span>
        <div>
          <KritarraSymbol className="lb-title-symbol" />
          <h2 id={`${collection.id}-title`}>{collection.name}</h2>
          <p>{collection.tagline}</p>
        </div>
        <nav className="lb-title-index" aria-label={`${collection.name} chapters`}>
          {collection.chapters.map(chapter => <a key={chapter.id} href={`#${chapter.id}`}>{chapter.en}</a>)}
        </nav>
      </div>;
    case 'statement':
      return <div className="lb-page lb-statement">
        <div className="lb-statement-copy">
          <span className="lb-label">The collection</span>
          <p className="lb-statement-lead">{collection.tagline}</p>
          {collection.intro.map(paragraph => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
        </div>
        <RunningFoot collection={collection} />
      </div>;
    case 'photo':
      return <div className="lb-page lb-photo" id={page.chapter?.id}>
        <Photo image={page.image} sizes={half} position={page.position} />
        {page.chapter && <div className="lb-chapter"><h3>{page.chapter.en}</h3><span lang="hi">{page.chapter.hi}</span></div>}
      </div>;
    case 'still':
      return <figure className="lb-page lb-still">
        <Photo image={page.piece.image} sizes={half} position={page.position} />
        <Caption piece={page.piece} number={numbers[0]} />
      </figure>;
    case 'pair':
      return <div className="lb-page lb-pair">
        {page.pieces.map((p, i) => <figure key={p.image.src} className={`lb-pair-item lb-pair-item-${i + 1}`}>
          <div className="lb-pair-frame"><Photo image={p.image} sizes="(max-width: 767px) 50vw, 22vw" /></div>
          <Caption piece={p} number={numbers[i]} />
        </figure>)}
        <RunningFoot collection={collection} />
      </div>;
  }
}

function Collection({ collection, index }: { collection: LookbookCollection; index: number }) {
  // Number pieces in reading order, the way the printed book's plates run.
  let count = 0;
  const numbered = collection.spreads.map(spread => spread.map(page => {
    const pieces = page.kind === 'still' ? 1 : page.kind === 'pair' ? 2 : 0;
    return Array.from({ length: pieces }, () => ++count);
  }));
  return <section id={collection.id} className={`lb-collection lb-ground-${collection.ground}`} aria-labelledby={`${collection.id}-title`}>
    {collection.spreads.map((spread, s) => <div className="lb-spread" key={s}>
      {spread.map((page, p) => <Page key={p} page={page} collection={collection} numbers={numbered[s][p]} first={index === 0 && s === 0} />)}
    </div>)}
  </section>;
}

export default function Lookbook() {
  return <main id="main" className="lookbook">
    <header className="lb-intro">
      <span className="eyebrow">Lookbook 2026</span>
      <h1>Two collections.</h1>
      <p>Couture gold that moves with silk, and exceptional stones set in sharp, luminous structures. Each creation is made in extremely limited numbers, often no more than two or three pieces worldwide.</p>
      <nav className="lb-index" aria-label="Collections">
        {lookbookCollections.map((collection, i) => {
          const cover = collection.spreads[0][0];
          return <a key={collection.id} href={`#${collection.id}`} className="lb-index-card">
            {cover.kind === 'cover' && <Photo image={cover.image} sizes="(max-width: 767px) 50vw, 18vw" eager />}
            <span className="lb-index-number">{pad(i + 1)}</span>
            <span className="lb-index-name">{collection.name}</span>
          </a>;
        })}
      </nav>
    </header>
    {lookbookCollections.map((collection, i) => <Collection key={collection.id} collection={collection} index={i} />)}
    <section className="lb-close" aria-label="Private appointments">
      <KritarraLockup className="lb-close-logo" tone="gold" />
      <p>To see a piece from these pages in person, arrange a private appointment.</p>
      <Link href="/contact/" className="text-link light">Request a private viewing<span aria-hidden="true">↗</span></Link>
    </section>
  </main>;
}
