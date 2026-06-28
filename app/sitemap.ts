import type { MetadataRoute } from 'next';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let puppies: { id: string; created_at?: string }[] = [];
  try {
    const { data } = await supabaseAdmin.from('puppies').select('id, created_at');
    puppies = data || [];
  } catch { /* ignore — still return static routes */ }

  const staticRoutes: MetadataRoute.Sitemap = ['', '/apply', '/breed', '/gallery', '/parents'].map(path => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));

  const puppyRoutes: MetadataRoute.Sitemap = puppies.map(p => ({
    url: `${SITE_URL}/puppies/${p.id}`,
    lastModified: p.created_at ? new Date(p.created_at) : new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  return [...staticRoutes, ...puppyRoutes];
}
