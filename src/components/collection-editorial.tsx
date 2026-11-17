import Link from 'next/link';
import { campaign, type CampaignPhoto } from '@/lib/imagery';
import { Asset } from './editorial';
import './collection-editorial.css';

function EditorialImage({ photo, caption, href, placement, monochrome = false, position = 'center' }: {
  photo: CampaignPhoto;
  caption: string;
  href: string;
  placement: string;
  monochrome?: boolean;
  position?: string;
}) {
  return (
    <Link href={href} className={`collection-editorial-image ${placement}${monochrome ? ' is-monochrome' : ''}`}>
      <figure>
        <Asset photo={photo} position={position} sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 44vw" />
        <figcaption>{caption}<span aria-hidden="true">↗</span></figcaption>
      </figure>
    </Link>
  );
}

export function CollectionEditorial() {
  return (
    <section className="collection-editorial" id="collection-journal" aria-labelledby="collection-editorial-heading">
      <div className="collection-editorial-grid">
        <h2 id="collection-editorial-heading" className="collection-editorial-heading">
          Timeless forms. A modern point of view. Each piece tells a story, bringing together expressive design and the quiet art of craftsmanship.
        </h2>

        <p className="collection-editorial-note collection-editorial-intro">
          A study in contrasts. Sculptural shapes, delicate details, and a little of the unexpected. Discover the world of Kritarra, one creation at a time.
        </p>

        <EditorialImage placement="collection-editorial-lead" photo={campaign.c2351} caption="The art of adornment" href="/products/necklaces/" position="50% 40%" />
        <EditorialImage placement="collection-editorial-ring" photo={campaign['Dc-ogQ-vgSm']} caption="A personal touch · Rings" href="/products/rings/" position="48% 45%" />
        <EditorialImage placement="collection-editorial-drop" photo={campaign.DLM9X0OMU3M} caption="A little drama · Earrings" href="/products/earrings/" position="36% 30%" />

        <div className="collection-editorial-note collection-editorial-aside">
          <p>For the moments you dress for, and the ones that simply happen. Find a piece that feels like you, and make it part of your story.</p>
          <Link href="/collections/">Explore the collection <span aria-hidden="true">↗</span></Link>
        </div>

        <EditorialImage placement="collection-editorial-necklace" photo={campaign.c2342} caption="A study in detail · Necklaces" href="/products/necklaces/" position="50% 40%" />
        <EditorialImage placement="collection-editorial-stone" photo={campaign.DOgKA81j9ju} caption="Where it begins" href="/about/" />
        <EditorialImage placement="collection-editorial-statement" photo={campaign.c2673} caption="An expressive gesture · Bracelets" href="/products/bracelets/" position="50% 45%" />
      </div>
    </section>
  );
}
