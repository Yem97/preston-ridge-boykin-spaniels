"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Shield, Award, Heart, Star } from 'lucide-react';

const badges = [
  { label: 'BSS Registered', icon: Shield },
  { label: 'AKC Registered', icon: Award },
  { label: 'UKC Registered', icon: Star },
  { label: 'Health Tested', icon: Heart },
];

export default function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Aurora animated background */}
      <div className="absolute inset-0 field-bg" />
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23A78BFA\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      {/* Aurora orbs */}
      <div className="aurora-orb-1" />
      <div className="aurora-orb-2" />
      <div className="aurora-orb-3" />
      {/* Readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-field/40 via-transparent to-field/20" />

      <div className={`relative z-10 text-center px-4 max-w-5xl mx-auto pt-24 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Pre-title */}
        <div className="inline-flex items-center gap-2 border border-tan/40 text-tan text-xs font-light px-5 py-2 rounded-full mb-8 tracking-widest uppercase">
          🌿 Family Raised · Field Ready
        </div>

        {/* Main headline */}
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
          <span className="text-white">Preston Ridge</span><br />
          <em className="shimmer-text italic">Boykin Spaniels</em>
        </h1>

        <p className="font-rustic text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-4 font-light leading-relaxed italic">
          "The dog that doesn't rock the boat"
        </p>
        <p className="text-white/50 text-base max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          Premium home-raised Boykin Spaniels bred for the field and the family. Health tested, BSS · AKC · UKC registered, and raised with love in the USA.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <Link href="/#puppies" className="rustic-btn px-8 py-4 text-base inline-block">
            View Available Puppies
          </Link>
          <Link href="/apply" className="border border-tan/50 text-tan font-medium px-8 py-4 rounded-lg hover:bg-tan/10 transition text-base inline-block">
            Apply for a Puppy
          </Link>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {badges.map(({ label, icon: Icon }) => (
            <div key={label} className="bg-field/60 border border-tan/20 rounded-xl p-4 flex flex-col items-center gap-2 backdrop-blur-sm">
              <Icon size={20} className="text-tan" />
              <span className="text-xs text-white/60 font-light tracking-wide">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
}
