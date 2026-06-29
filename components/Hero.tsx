"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, Heart, ChevronDown } from 'lucide-react';

export default function Hero({ images = [] }: { images?: string[] }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t); }, []);

  const pics = images.filter(Boolean).slice(0, 3);

  return (
    <section className="relative overflow-hidden" style={{ background: 'linear-gradient(165deg, #FFFFFF 0%, #FFFBF4 45%, #FDF3E3 100%)' }}>
      {/* Soft warm glow accents */}
      <div className="absolute pointer-events-none" style={{
        width: 600, height: 600, top: -200, right: -120,
        background: 'radial-gradient(circle, rgba(212,128,42,0.10) 0%, transparent 70%)',
      }} />
      <div className="absolute pointer-events-none" style={{
        width: 500, height: 500, bottom: -180, left: -140,
        background: 'radial-gradient(circle, rgba(74,30,8,0.05) 0%, transparent 70%)',
      }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-32 pb-20 lg:pt-36 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — copy */}
          <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="inline-flex items-center gap-2 border border-tan/40 text-bark text-xs px-4 py-2 rounded-full mb-7 tracking-widest uppercase bg-white/80 backdrop-blur-sm">
              🌿 Family Raised · Field Ready
            </div>

            <h1 className="font-display text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.05] text-bark-dark mb-6">
              Premium Boykin<br />
              Spaniels, <em className="text-tan italic">raised<br className="hidden md:block" /> with love</em>
            </h1>

            <p className="text-bark-light text-lg max-w-lg mb-3 leading-relaxed font-rustic italic">
              "The dog that doesn't rock the boat"
            </p>
            <p className="text-bark-light/80 text-base max-w-lg mb-9 leading-relaxed">
              Health-tested, home-raised Boykins bred for the field and the family.
              BSS · AKC · UKC registered, and raised with love in the USA.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/#puppies" className="rustic-btn px-8 py-4 text-base text-center">
                View Available Puppies
              </Link>
              <Link href="/apply" className="px-8 py-4 rounded-xl border border-bark/20 text-bark font-medium hover:bg-bark hover:text-cream transition-all duration-200 text-base text-center">
                Apply for a Puppy
              </Link>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-bark-light">
              <span className="inline-flex items-center gap-2"><Award size={16} className="text-tan" /> AKC Registered</span>
              <span className="inline-flex items-center gap-2"><ShieldCheck size={16} className="text-tan" /> Health Tested</span>
              <span className="inline-flex items-center gap-2"><Heart size={16} className="text-tan" /> Family Raised</span>
            </div>
          </div>

          {/* Right — photo collage of real puppies */}
          <div className={`relative transition-all duration-1000 delay-150 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {pics.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {/* Featured image */}
                <div className="col-span-2 relative rounded-3xl overflow-hidden shadow-xl shadow-bark/10 border border-white" style={{ height: 320 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={pics[0]} alt="Boykin Spaniel puppy" className="w-full h-full object-cover" />
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-md">
                    <p className="font-display text-bark-dark font-bold text-sm">Meet our puppies</p>
                    <p className="text-bark-light text-xs">Available now</p>
                  </div>
                </div>
                {pics[1] && (
                  <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-bark/10 border border-white" style={{ height: 180 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pics[1]} alt="Boykin Spaniel puppy" className="w-full h-full object-cover" />
                  </div>
                )}
                {pics[2] ? (
                  <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-bark/10 border border-white" style={{ height: 180 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pics[2]} alt="Boykin Spaniel puppy" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="rounded-2xl bg-gradient-to-br from-tan/15 to-bark/10 flex items-center justify-center" style={{ height: 180 }}>
                    <span className="text-5xl">🐾</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-3xl bg-gradient-to-br from-tan/15 to-bark/10 flex items-center justify-center shadow-xl" style={{ height: 420 }}>
                <span className="text-8xl">🐕</span>
              </div>
            )}

            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-xl border border-tan/15">
              <div className="w-11 h-11 rounded-full bg-tan/15 flex items-center justify-center text-xl">🏆</div>
              <div>
                <p className="font-display font-bold text-bark-dark leading-tight">Field Ready</p>
                <p className="text-bark-light text-xs">& Family Loved</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <div className="flex justify-center pb-8 -mt-4">
        <ChevronDown size={20} className="text-bark/30" style={{ animation: 'scroll-bounce 2.4s ease-in-out infinite' }} />
      </div>
    </section>
  );
}
