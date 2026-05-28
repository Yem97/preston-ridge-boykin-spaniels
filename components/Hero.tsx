"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Award, ChevronDown } from 'lucide-react';

export default function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 field-bg" />

      {/* Atmospheric light orbs */}
      <div className="absolute pointer-events-none" style={{
        width: '700px', height: '700px',
        top: '-180px', left: '-120px',
        background: 'radial-gradient(circle, rgba(212,128,42,0.16) 0%, transparent 68%)',
        animation: 'orb-drift 16s ease-in-out infinite',
      }} />
      <div className="absolute pointer-events-none" style={{
        width: '900px', height: '700px',
        top: '5%', right: '-250px',
        background: 'radial-gradient(circle, rgba(100,40,8,0.14) 0%, transparent 65%)',
        animation: 'orb-drift 22s ease-in-out infinite reverse',
      }} />
      <div className="absolute pointer-events-none" style={{
        width: '800px', height: '600px',
        bottom: '80px', left: '10%',
        background: 'radial-gradient(circle, rgba(74,30,8,0.1) 0%, transparent 65%)',
        animation: 'orb-drift 28s ease-in-out infinite',
      }} />

      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23C49A5A\' fill-opacity=\'0.8\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      {/* Radial vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 35%, rgba(14,22,13,0.45) 100%)' }} />

      {/* Content */}
      <div className={`relative z-10 text-center px-4 max-w-5xl mx-auto pt-24 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        {/* Pre-title pill */}
        <div className="inline-flex items-center gap-2 border border-tan/35 text-tan/85 text-xs font-light px-5 py-2 rounded-full mb-8 tracking-widest uppercase backdrop-blur-sm"
          style={{ background: 'rgba(28,43,26,0.45)' }}>
          🌿 Family Raised · Field Ready
        </div>

        {/* Main headline */}
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
          <span className="text-cream">Preston Ridge</span><br />
          <em className="text-tan italic" style={{ textShadow: '0 0 80px rgba(212,128,42,0.3)' }}>
            Boykin Spaniels
          </em>
        </h1>

        <p className="font-rustic text-cream/70 text-lg md:text-xl max-w-2xl mx-auto mb-4 font-light leading-relaxed italic">
          "The dog that doesn't rock the boat"
        </p>
        <p className="text-cream/50 text-base max-w-xl mx-auto mb-10 font-light leading-relaxed">
          Premium home-raised Boykins bred for the field and the family. Health tested, BSS · AKC · UKC registered, and raised with love in the USA.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <Link href="/#puppies" className="rustic-btn px-8 py-4 text-base inline-block">
            View Available Puppies
          </Link>
          <Link href="/apply" className="border border-tan/40 text-tan font-medium px-8 py-4 rounded-xl hover:bg-tan/10 hover:border-tan/65 transition-all duration-200 text-base inline-block backdrop-blur-sm">
            Apply for a Puppy
          </Link>
        </div>

        {/* AKC badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2.5 rounded-xl px-6 py-3 backdrop-blur-sm border"
            style={{ background: 'rgba(30,10,2,0.5)', borderColor: 'rgba(212,128,42,0.25)' }}>
            <Award size={18} className="text-tan" />
            <span className="text-sm text-cream/70 font-light tracking-wide">AKC Registered</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10 select-none"
        style={{ animation: 'scroll-bounce 2.4s ease-in-out infinite' }}>
        <span className="text-xs text-cream/25 tracking-widest uppercase font-light">Scroll</span>
        <ChevronDown size={15} className="text-cream/25" />
      </div>

      {/* Bottom fade to cream */}
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-cream via-cream/50 to-transparent" />
    </section>
  );
}
