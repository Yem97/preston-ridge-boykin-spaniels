export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { SITE_URL, SITE_NAME } from '@/lib/site';
import type { Puppy } from '@/types';

async function getPuppy(id: string): Promise<Puppy | null> {
  try {
    const { data } = await supabaseAdmin.from('puppies').select('*').eq('id', id).single();
    return (data as Puppy) || null;
  } catch {
    return null;
  }
}

const statusLabels: Record<string, string> = { available: 'Available', reserved: 'Reserved', sold: 'Adopted' };

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const puppy = await getPuppy(params.id);
  if (!puppy) return { title: `Puppy Not Found | ${SITE_NAME}` };

  const title = `${puppy.name} — ${puppy.gender}, ${puppy.age_weeks} weeks old | ${SITE_NAME}`;
  const description =
    puppy.description ||
    `Meet ${puppy.name}, a ${puppy.color} ${puppy.gender} Boykin Spaniel puppy, ${puppy.age_weeks} weeks old. AKC · BSS · UKC registered, health tested, and family raised.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/puppies/${puppy.id}` },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${SITE_URL}/puppies/${puppy.id}`,
      images: puppy.image_url ? [{ url: puppy.image_url, alt: puppy.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: puppy.image_url ? [puppy.image_url] : undefined,
    },
  };
}

export default async function PuppyDetailPage({ params }: { params: { id: string } }) {
  const puppy = await getPuppy(params.id);
  if (!puppy) notFound();

  const availability =
    puppy.status === 'available'
      ? 'https://schema.org/InStock'
      : puppy.status === 'reserved'
      ? 'https://schema.org/PreOrder'
      : 'https://schema.org/SoldOut';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: puppy.name,
    description:
      puppy.description ||
      `${puppy.color} ${puppy.gender} Boykin Spaniel puppy, ${puppy.age_weeks} weeks old.`,
    image: puppy.image_url ? [puppy.image_url] : undefined,
    category: 'Boykin Spaniel Puppy',
    brand: { '@type': 'Brand', name: SITE_NAME },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: puppy.price_usd ?? 0,
      availability,
      url: `${SITE_URL}/puppies/${puppy.id}`,
    },
  };

  const facts: [string, string][] = [
    ['Name', puppy.name],
    ['Color', puppy.color],
    ['Gender', puppy.gender],
    ['Age', `${puppy.age_weeks} weeks`],
    ['Price', `$${(puppy.price_usd ?? 0).toLocaleString()}`],
    ['Status', statusLabels[puppy.status] ?? 'Available'],
  ];

  return (
    <main className="min-h-screen bg-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      <section className="pt-28 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/#puppies" className="inline-flex items-center gap-2 text-bark-light hover:text-bark transition mb-6 text-sm">
            <ArrowLeft size={16} /> Back to all puppies
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Image */}
            <div className="rustic-card overflow-hidden">
              <div className="relative w-full overflow-hidden" style={{ height: 'min(70vh, 520px)' }}>
                {puppy.image_url ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={puppy.image_url} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover"
                      style={{ filter: 'blur(26px) brightness(0.82)', transform: 'scale(1.18)' }} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={puppy.image_url} alt={puppy.name} className="relative z-[1] w-full h-full object-contain" />
                  </>
                ) : (
                  <div className="w-full h-full bg-cream-dark flex items-center justify-center text-8xl">🐕</div>
                )}
              </div>
            </div>

            {/* Details */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="font-display text-4xl md:text-5xl font-bold text-bark-dark">{puppy.name}</h1>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-moss/15 text-moss border border-moss/30">
                  {statusLabels[puppy.status] ?? 'Available'}
                </span>
              </div>
              <p className="text-bark-light capitalize mb-6">
                {puppy.color} · {puppy.gender} · {puppy.age_weeks} weeks old
                {puppy.litter_name ? ` · ${puppy.litter_name} litter` : ''}
              </p>

              <p className="font-display text-3xl font-bold text-bark mb-6">
                ${(puppy.price_usd ?? 0).toLocaleString()}
              </p>

              {puppy.description && (
                <p className="text-bark-light leading-relaxed mb-8">{puppy.description}</p>
              )}

              <div className="grid grid-cols-2 gap-3 mb-8">
                {facts.map(([k, v]) => (
                  <div key={k} className="bg-parchment rounded-xl p-3 border border-tan/20">
                    <p className="text-xs text-bark-light uppercase tracking-wide mb-1">{k}</p>
                    <p className="text-bark-dark capitalize font-medium">{v}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-8">
                {['Health tested & vet checked', 'Vaccinated & dewormed', 'AKC · BSS · UKC registered', 'Microchipped & family raised'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-bark-light text-sm">
                    <Check size={16} className="text-moss flex-shrink-0" /> {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {puppy.status === 'sold' ? (
                  <span className="flex-1 text-center bg-bark/10 text-bark-light rounded-xl py-4 font-medium">
                    This puppy has found a home
                  </span>
                ) : (
                  <Link href="/apply" className="flex-1 text-center rustic-btn py-4">
                    {puppy.status === 'reserved' ? 'Join the Waitlist' : `Apply for ${puppy.name}`}
                  </Link>
                )}
                <Link href="/#puppies" className="px-6 py-4 border border-tan/30 rounded-xl text-bark hover:bg-cream-dark transition text-center">
                  See Other Puppies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
