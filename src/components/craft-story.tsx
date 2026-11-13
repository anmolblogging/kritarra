'use client';

import { motion, useTransform } from 'motion/react';
import { campaign } from '@/lib/imagery';
import { Asset, TextLink } from './editorial';
import { sectionEase, useSectionMotion } from './section-motion';

export function CraftStory() {
  const { ref, reduce, progress } = useSectionMotion();
  const photographY = useTransform(progress, [0, 1], [-18, 18]);

  return <section ref={ref} className="craft-story craft-editorial" id="details" aria-labelledby="details-heading" data-section-motion={reduce ? 'static' : 'scroll'}>
    <div className="craft-visual">
      <motion.div className="craft-photograph" style={{ y: reduce ? 0 : photographY }}><Asset photo={campaign.DW_HenXDHeO} label="Kritarra campaign portrait" position="50% 32%" sizes="100vw" /></motion.div>
    </div>
    <motion.div className="craft-copy" initial={false} whileInView={reduce ? {} : { opacity: [0, 1], y: [16, 0] }} viewport={{ once: true, amount: .3 }} transition={{ duration: .8, ease: sectionEase }}>
      <h2 id="details-heading">A touch of <em>luxury</em></h2>
      <div className="craft-description">
        <p>More than just jewellery — each piece tells a story of elegance, passion, and timeless beauty.</p>
        <p>Designed to captivate, crafted to last, our creations blend artistry with sophistication, turning every detail into a little luxury of your own.</p>
        <TextLink href="/about/">Explore the craft</TextLink>
      </div>
    </motion.div>
  </section>;
}
