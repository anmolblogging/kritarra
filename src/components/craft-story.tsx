'use client';

import { motion, useTransform } from 'motion/react';
import { campaign } from '@/lib/imagery';
import { Asset } from './editorial';
import { KritarraLockup } from './logo';
import { sectionEase, useSectionMotion } from './section-motion';

export function CraftStory() {
  const { ref, reduce, progress } = useSectionMotion();
  const photographY = useTransform(progress, [0, 1], [-18, 18]);

  return <section ref={ref} className="craft-story craft-editorial" id="details" aria-labelledby="details-heading" data-section-motion={reduce ? 'static' : 'scroll'}>
    <div className="craft-visual">
      <motion.div className="craft-photograph" style={{ y: reduce ? 0 : photographY }}><Asset photo={campaign.c2343} label="Kritarra campaign still" position="50% 50%" sizes="100vw" /></motion.div>
    </div>
    {/* A single line from the Kritarra lookbook, set over the photograph. */}
    <motion.figure className="craft-quote" initial={false} whileInView={reduce ? {} : { opacity: [0, 1], y: [18, 0] }} viewport={{ once: true, amount: .4 }} transition={{ duration: 1, ease: sectionEase }}>
      <blockquote>
        <p id="details-heading">The rarest luxury today is not recognition, but individuality.</p>
      </blockquote>
      <figcaption><KritarraLockup className="craft-quote-signature" title="Kritarra" /></figcaption>
    </motion.figure>
  </section>;
}
