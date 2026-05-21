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
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import type { Puppy } from '@/types';
import Link from 'next/link';
import { Shield, Award, Star } from 'lucide-react';

async function getPuppies(): Promise<Puppy[]> {
  try {
    const { data } = await supabaseAdmin.from('puppies').select('*').order('created_at', { ascending: false });
    return data || [];
  } catch { return []; }
}

export default async function Home() {
  const puppies = await getPuppies();

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <Hero />

      {/* Certifications bar */}
      <div className="bg-bark py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-8">
          {[{ icon: Shield, label: 'BSS Registered Breeder' }, { icon: Award, label: 'AKC Registered' }, { icon: Star, label: 'UKC Registered' }].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-white/80 text-sm"><Icon size={16} className="text-tan" />{label}</div>
          ))}
          <div className="flex items-center gap-2 text-white/80 text-sm">❤️ OFA Health Tested</div>
        </div>
      </div>

      {/* Puppies section */}
      <section id="puppies" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-bark-dark mb-4">Available Puppies</h2>
          <p className="text-bark-light max-w-xl mx-auto">Each puppy is health tested, vaccinated, microchipped, and raised in our home with love and care from day one.</p>
          <div className="mt-6 inline-flex items-center gap-2 bg-moss/10 border border-moss/20 text-moss px-5 py-2 rounded-full text-sm">
            📋 Formal application required — we carefully screen all buyers
          </div>
        </div>
        <PuppyGrid puppies={puppies} />
      </section>

      <AboutSection />
      <GallerySection />
      <FacebookFeed />
      <ReviewsSection />

      {/* Application CTA */}
      <section className="py-20 bg-field text-white px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Ready to Apply?</h2>
          <p className="text-white/70 text-lg mb-4">We take our time matching each puppy with the right family. Our formal application process ensures every Preston Ridge puppy goes to a loving, prepared home.</p>
          <p className="text-white/50 text-sm mb-10">We respond to all applications within 2-3 business days.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply" className="rustic-btn px-8 py-4 text-base inline-block">Submit an Application</Link>
            <Link href="/breed" className="border border-tan/40 text-tan font-medium px-8 py-4 rounded-full hover:bg-tan/10 transition text-base inline-block">Learn About the Breed</Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
