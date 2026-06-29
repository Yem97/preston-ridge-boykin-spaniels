export const dynamic = 'force-dynamic';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PuppyGrid from '@/components/PuppyGrid';
import AboutSection from '@/components/AboutSection';
import GallerySection from '@/components/GallerySection';
import FacebookFeed from '@/components/FacebookFeed';
import ReviewsSection from '@/components/ReviewsSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import RevealSection from '@/components/RevealSection';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import type { Puppy } from '@/types';
import Link from 'next/link';
import { Award } from 'lucide-react';

async function getPuppies(): Promise<Puppy[]> {
  try {
    const { data } = await supabaseAdmin.from('puppies').select('*').order('created_at', { ascending: false });
    return data || [];
  } catch { return []; }
}

export default async function Home() {
  const puppies = await getPuppies();
  const heroImages = puppies.map(p => p.image_url).filter((u): u is string => Boolean(u)).slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero images={heroImages} />

      {/* Certifications bar */}
      <div className="bg-parchment border-y border-tan/15 py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-bark-light text-sm">
          <span className="flex items-center gap-2"><Award size={15} className="text-tan" /> AKC Registered</span>
          <span className="flex items-center gap-2"><Award size={15} className="text-tan" /> BSS Registered</span>
          <span className="flex items-center gap-2"><Award size={15} className="text-tan" /> UKC Registered</span>
          <span className="flex items-center gap-2"><Award size={15} className="text-tan" /> Health Tested</span>
        </div>
      </div>

      {/* Puppies section */}
      <section id="puppies" className="py-20 px-4 max-w-7xl mx-auto">
        <RevealSection>
          <div className="text-center mb-14">
            <div className="section-tag">🐕 Our Puppies</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-bark-dark mb-4">Available Puppies</h2>
            <p className="text-bark-light max-w-xl mx-auto leading-relaxed">
              Each puppy is health tested, vaccinated, microchipped, and raised in our home with love and care from day one.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 bg-moss/10 border border-moss/20 text-moss px-5 py-2 rounded-full text-sm">
              📋 Formal application required — we carefully screen all buyers
            </div>
          </div>
        </RevealSection>
        <RevealSection delay={1}>
          <PuppyGrid puppies={puppies} />
        </RevealSection>
      </section>

      <RevealSection>
        <AboutSection />
      </RevealSection>

      <RevealSection>
        <GallerySection />
      </RevealSection>

      <RevealSection>
        <FacebookFeed />
      </RevealSection>

      <RevealSection>
        <ReviewsSection />
      </RevealSection>

      {/* Application CTA */}
      <RevealSection>
        <section className="py-24 px-4" style={{ background: 'linear-gradient(165deg, #FFFBF4 0%, #FDF3E3 100%)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="section-tag">🐾 Ready When You Are</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-bark-dark mb-4">Ready to Apply?</h2>
            <p className="text-bark-light text-lg mb-4 leading-relaxed">
              We take our time matching each puppy with the right family. Our formal application process ensures every Preston Ridge puppy goes to a loving, prepared home.
            </p>
            <p className="text-bark-light/60 text-sm mb-10">We respond to all applications within 2–3 business days.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply" className="rustic-btn px-8 py-4 text-base inline-block">Submit an Application</Link>
              <Link href="/breed" className="border border-bark/20 text-bark font-medium px-8 py-4 rounded-xl hover:bg-bark hover:text-cream transition-all duration-200 text-base inline-block">
                Learn About the Breed
              </Link>
            </div>
          </div>
        </section>
      </RevealSection>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
