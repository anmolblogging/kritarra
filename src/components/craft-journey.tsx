'use client';

import { useEffect, useRef, useState } from 'react';
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
  </section>;
}
