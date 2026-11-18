import {notFound} from 'next/navigation';
import {collectionCategories} from '@/lib/collection';
import {CollectionGrid} from '@/components/collection-grid';
export function generateStaticParams(){return collectionCategories.map(c=>({category:c.slug}));}
export async function generateMetadata({params}:{params:Promise<{category:string}>}){const {category}=await params;return {title:collectionCategories.find(c=>c.slug===category)?.label??'Collection'};}
export default async function CategoryPage({params}:{params:Promise<{category:string}>}){const {category}=await params;const selected=collectionCategories.find(c=>c.slug===category);if(!selected)notFound();return <main id="main" className="collections-main"><CollectionGrid category={selected.slug} title={selected.label}/></main>;}
