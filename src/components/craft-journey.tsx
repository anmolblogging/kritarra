'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { craftJourneyChapters, type JourneyChapter } from '@/lib/craft-journey';
import './craft-journey.css';

/*
 * The art of making: a pinned image column on the left cross-fades between
 * chapter photographs while the chapter copy scrolls naturally on the right.
 * The chapter crossing the middle of the viewport is active; the next one is
 * already visible, faded, below it.
 */
export function CraftJourney({ chapters = craftJourneyChapters }: {
  chapters?: readonly JourneyChapter[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const copyRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    let frame = 0;
    const update = () => {
      frame = 0;
      const media = mediaRef.current?.getBoundingClientRect();
      const stacked = window.innerWidth < 768;
      // On phones the image is pinned above the copy, so read the line below it.
      const line = stacked && media ? media.bottom + (window.innerHeight - media.bottom) * .42 : window.innerHeight * .62;
      let next = 0;
      // A chapter becomes active once its title rises past the reading line.
      copyRefs.current.forEach((node, index) => {
        const title = node?.querySelector('h3');
        if (title && title.getBoundingClientRect().top < line) next = index;
      });
      setActive(previous => previous === next ? previous : next);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [chapters.length]);

  if (!chapters.length) return null;
  const total = String(chapters.length).padStart(2, '0');

  return <section ref={sectionRef} id="making-of-a-jewel" className="craft-journey" aria-labelledby="journey-heading" data-journey-motion={ready ? 'scroll' : 'static'}>
    <h2 id="journey-heading" className="sr-only">The making of a jewel, from design to polish</h2>
    <div className="journey-layout">
      <div className="journey-media-column">
        <div ref={mediaRef} className="journey-media">
          <div className="journey-image-frame">
            {chapters.map((chapter, index) => <img
              key={chapter.id}
              className={index === active ? 'is-active' : undefined}
              src={chapter.image.src}
              srcSet={chapter.image.srcSet}
              sizes="(max-width: 767px) 90vw, 49vw"
              width={chapter.image.width}
              height={chapter.image.height}
              alt={index === active ? chapter.image.alt : ''}
              aria-hidden={index === active ? undefined : true}
              style={{ objectPosition: chapter.imagePosition }}
              loading={index < 2 ? 'eager' : 'lazy'}
              decoding="async"
            />)}
          </div>
        </div>
      </div>
      <div className="journey-copy-column">
        {chapters.map((chapter, index) => <article
          key={chapter.id}
          ref={node => { copyRefs.current[index] = node; }}
          className={`journey-copy${index === active ? ' is-active' : ''}`}
          data-chapter={chapter.id}
        >
          <div className="journey-chapter-meta"><span>The art of making</span><span className="journey-number">{chapter.number} / {total}</span></div>
          <h3>{chapter.title}</h3>
          <p>{chapter.description}</p>
          {chapter.ctaLabel && chapter.ctaHref && <Link href={chapter.ctaHref} className="text-link light">{chapter.ctaLabel}<span aria-hidden="true">↗</span></Link>}
        </article>)}
      </div>
      <div className="journey-progress-column" aria-hidden="true">
        <ol className="journey-progress">
          {chapters.map((chapter, index) => <li key={chapter.id} className={index === active ? 'is-active' : undefined} />)}
        </ol>
      </div>
    </div>
    <JourneyCarousel chapters={chapters} total={total} />
  </section>;
}

/* Phones: the eight chapters become a swipeable row of cards, one chapter per card. */
function JourneyCarousel({ chapters, total }: { chapters: readonly JourneyChapter[]; total: string }) {
  const trackRef = useRef<HTMLOListElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const card = track.firstElementChild as HTMLElement | null;
      if (!card) return;
      const step = card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0');
      setCurrent(Math.max(0, Math.min(chapters.length - 1, Math.round(track.scrollLeft / step))));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    track.addEventListener('scroll', schedule, { passive: true });
    return () => { cancelAnimationFrame(frame); track.removeEventListener('scroll', schedule); };
  }, [chapters.length]);

  const go = (index: number) => {
    const card = trackRef.current?.children[index] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };

  return <div className="journey-carousel">
    <div className="journey-carousel-head">
      <span className="journey-carousel-eyebrow">The art of making</span>
      <p className="journey-carousel-title">From a first idea to a jewel ready to be worn.</p>
    </div>
    <ol ref={trackRef} className="journey-carousel-track" aria-label="The making of a jewel, chapter by chapter">
      {chapters.map((chapter, index) => <li key={chapter.id} className={`journey-card${index === current ? ' is-current' : ''}`} aria-label={`Chapter ${index + 1} of ${chapters.length}: ${chapter.title}`}>
        <div className="journey-card-image">
          <img src={chapter.image.src} srcSet={chapter.image.srcSet} sizes="86vw" width={chapter.image.width} height={chapter.image.height}
            alt={chapter.image.alt} style={{ objectPosition: chapter.imagePosition }} loading="lazy" decoding="async" />
        </div>
        <span className="journey-card-number">{chapter.number} / {total}</span>
        <h3>{chapter.title}</h3>
        <p>{chapter.description}</p>
        {chapter.ctaLabel && chapter.ctaHref && <Link href={chapter.ctaHref} className="text-link light">{chapter.ctaLabel}<span aria-hidden="true">↗</span></Link>}
      </li>)}
    </ol>
    <div className="journey-carousel-controls">
      <div className="journey-carousel-bar" aria-hidden="true"><span style={{ width: `${((current + 1) / chapters.length) * 100}%` }} /></div>
      <span className="journey-carousel-count" aria-live="polite">{String(current + 1).padStart(2, '0')} / {total}</span>
      <button type="button" onClick={() => go(current - 1)} disabled={current === 0} aria-label="Previous chapter"><ArrowLeft size={18} strokeWidth={1.3} /></button>
      <button type="button" onClick={() => go(current + 1)} disabled={current === chapters.length - 1} aria-label="Next chapter"><ArrowRight size={18} strokeWidth={1.3} /></button>
    </div>
  </div>;
}
