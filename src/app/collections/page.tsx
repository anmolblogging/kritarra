import type {Metadata} from 'next';
import {CollectionGrid} from '@/components/collection-grid';
export const metadata:Metadata={title:'The Collections'};
export default function Collections(){return <main id="main" className="collections-main"><CollectionGrid title="All creations"/></main>;}
