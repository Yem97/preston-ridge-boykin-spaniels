export const dynamic = 'force-dynamic';

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import type { Parent } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { ArrowLeft, Shield, Award, Star } from 'lucide-react';

async function getParents(): Promise<Parent[]> {
  try {
    const { data } = await supabaseAdmin.from('parents').select('*').order('created_at', { ascending: true });
    return data || [];
  } catch { return []; }
}

export default async function ParentsPage() {
  const parents = await getParents();
  const studs = parents.filter(p => p.role === 'stud');
  const dams = parents.filter(p => p.role === 'dam');

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
        <div className="mb-10">
          <Link href="/" className="flex items-center gap-2 text-bark-light hover:text-bark transition text-sm mb-6"><ArrowLeft size={16} /> Back to home</Link>
          <h1 className="font-display text-5xl font-bold text-bark-dark mb-3">Meet the Parents</h1>
          <p className="text-bark-light text-lg max-w-2xl">Our breeding dogs are the heart of everything we do. All are health tested, registered, and live as beloved members of our family.</p>
        </div>

        {/* Health Testing Banner */}
        <div className="bg-field text-cream rounded-2xl p-6 mb-14 flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-2"><Shield size={18} className="text-tan" /><span className="text-sm">BSS Registered</span></div>
          <div className="flex items-center gap-2"><Award size={18} className="text-tan" /><span className="text-sm">AKC Registered</span></div>
          <div className="flex items-center gap-2"><Star size={18} className="text-tan" /><span className="text-sm">UKC Registered</span></div>
          <div className="flex items-center gap-2">❤️<span className="text-sm">OFA Health Tested — Hips, Eyes, Heart, Genetic</span></div>
        </div>

        {/* Studs */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-bold text-bark-dark mb-2">Our Stud Dogs</h2>
          <p className="text-bark-light mb-8">Our males bring proven field ability and exceptional temperament to every litter.</p>
          {studs.length === 0 ? (
            <div className="rustic-card p-12 text-center"><p className="text-4xl mb-4">🐕</p><p className="text-bark-light">Stud information coming soon.</p></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studs.map(parent => (
                <div key={parent.id} className="rustic-card overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    {parent.image_url ? <Image src={parent.image_url} alt={parent.name} fill className="object-cover" sizes="400px" /> : <div className="w-full h-full bg-cream-dark flex items-center justify-center text-6xl">🐕</div>}
                    <div className="absolute inset-0 bg-gradient-to-t from-bark-dark/50 to-transparent" />
                    <span className="absolute top-3 right-3 bg-bark text-cream text-xs px-3 py-1 rounded-full">Stud</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-2xl font-semibold text-bark-dark mb-1">{parent.name}</h3>
                    <p className="text-bark-light text-sm mb-3 capitalize">{parent.color}{parent.age_years ? ` · ${parent.age_years} years old` : ''}</p>
                    {parent.description && <p className="text-bark-light text-sm leading-relaxed mb-4">{parent.description}</p>}
                    {parent.health_tests && parent.health_tests.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {parent.health_tests.map((t: string) => <span key={t} className="text-xs bg-moss/10 text-moss border border-moss/20 px-2 py-1 rounded-full">✓ {t}</span>)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dams */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-bold text-bark-dark mb-2">Our Females</h2>
          <p className="text-bark-light mb-8">Our females are exceptional mothers — gentle, nurturing, and health tested.</p>
          {dams.length === 0 ? (
            <div className="rustic-card p-12 text-center"><p className="text-4xl mb-4">🐕</p><p className="text-bark-light">Female dog information coming soon.</p></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dams.map(parent => (
                <div key={parent.id} className="rustic-card overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    {parent.image_url ? <Image src={parent.image_url} alt={parent.name} fill className="object-cover" sizes="400px" /> : <div className="w-full h-full bg-cream-dark flex items-center justify-center text-6xl">🐕</div>}
                    <div className="absolute inset-0 bg-gradient-to-t from-bark-dark/50 to-transparent" />
                    <span className="absolute top-3 right-3 bg-moss text-cream text-xs px-3 py-1 rounded-full">Dam</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-2xl font-semibold text-bark-dark mb-1">{parent.name}</h3>
                    <p className="text-bark-light text-sm mb-3 capitalize">{parent.color}{parent.age_years ? ` · ${parent.age_years} years old` : ''}</p>
                    {parent.description && <p className="text-bark-light text-sm leading-relaxed mb-4">{parent.description}</p>}
                    {parent.health_tests && parent.health_tests.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {parent.health_tests.map((t: string) => <span key={t} className="text-xs bg-moss/10 text-moss border border-moss/20 px-2 py-1 rounded-full">✓ {t}</span>)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-bark text-cream rounded-2xl p-8 text-center">
          <h3 className="font-display text-2xl font-bold mb-3">Interested in a Puppy?</h3>
          <p className="text-cream/70 mb-6">Submit an application and we will be in touch when the next litter is available.</p>
          <Link href="/apply" className="bg-tan text-bark-dark font-medium px-8 py-3 rounded-xl hover:bg-tan-light transition inline-block">Apply for a Puppy</Link>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
