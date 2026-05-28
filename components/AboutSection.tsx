"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { MapPin, Heart, Award, Shield, Star } from 'lucide-react';

export default function AboutSection() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetch('/api/profile')
      .then(r => r.json())
      .then(d => { if (d && d.profile) setProfile(d.profile); })
      .catch(() => {});
  }, []);

  const name = profile?.kennel_name ?? 'Preston Ridge Boykin Spaniels';
  const tagline = profile?.tagline ?? 'AKC · BSS · UKC Registered Boykin Spaniels';
  const bio = profile?.bio ?? 'We are a family-run kennel dedicated to breeding healthy, well-socialized Boykin Spaniels for hunting and family life.';
  const location = profile?.location ?? 'USA';
  const years = profile?.years_breeding ?? 1;
  const placed = profile?.puppies_placed ?? 0;
  const bss = profile?.bss_registered !== false;
  const akc = profile?.akc_registered !== false;
  const ukc = profile?.ukc_registered !== false;

  return (
    <section id="about" className="py-20 bg-parchment">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 border border-tan/40 text-bark text-xs px-4 py-2 rounded-full mb-6 tracking-widest uppercase bg-cream">
              🌿 Our Story
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-bark-dark mb-4 leading-tight">{name}</h2>
            <p className="text-tan font-rustic text-sm mb-6 italic">{tagline}</p>
            <p className="text-bark-light leading-relaxed mb-6">{bio}</p>
            <div className="flex items-center gap-2 text-bark-light text-sm mb-8">
              <MapPin size={16} className="text-tan" />
              <span>{location}</span>
            </div>

            {/* Certification badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {bss && <div className="flex items-center gap-2 bg-moss/10 border border-moss/30 text-moss px-4 py-2 rounded-full text-xs font-medium"><Shield size={14} /> BSS Registered</div>}
              {akc && <div className="flex items-center gap-2 bg-bark/10 border border-bark/30 text-bark px-4 py-2 rounded-full text-xs font-medium"><Award size={14} /> AKC Registered</div>}
              {ukc && <div className="flex items-center gap-2 bg-tan/10 border border-tan/30 text-bark px-4 py-2 rounded-full text-xs font-medium"><Star size={14} /> UKC Registered</div>}
              <div className="flex items-center gap-2 bg-cream border border-tan/30 text-bark px-4 py-2 rounded-full text-xs font-medium"><Heart size={14} /> Health Tested</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-cream rounded-xl p-5 border border-tan/20 text-center">
                <p className="font-display text-3xl font-bold text-bark mb-1">{years}+</p>
                <p className="text-bark-light text-xs uppercase tracking-wide">Years Breeding</p>
              </div>
              <div className="bg-cream rounded-xl p-5 border border-tan/20 text-center">
                <p className="font-display text-3xl font-bold text-bark mb-1">{placed}+</p>
                <p className="text-bark-light text-xs uppercase tracking-wide">Puppies Placed</p>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            {/* Outer glow ring */}
            <div className="absolute pointer-events-none" style={{
              width: '420px', height: '420px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(212,128,42,0.1) 0%, transparent 70%)',
              border: '1px solid rgba(212,128,42,0.12)',
            }} />

            {/* Circle frame */}
            <div className="relative overflow-hidden" style={{
              width: '380px',
              height: '380px',
              borderRadius: '50%',
              border: '3px solid rgba(212,128,42,0.45)',
              background: '#FFF8EE',
              boxShadow: '0 24px 60px rgba(74,30,8,0.18), 0 6px 20px rgba(74,30,8,0.1)',
            }}>
              {profile?.avatar_url
                ? <Image src={profile.avatar_url} alt="Breeder" fill className="object-contain" sizes="400px" />
                : <div className="w-full h-full flex items-center justify-center text-8xl">🐕</div>
              }
            </div>

            {/* Badge */}
            <div className="absolute -bottom-4 -right-4 bg-bark text-cream rounded-xl p-4 shadow-xl">
              <p className="font-display text-xl font-bold">Field Ready</p>
              <p className="text-cream/70 text-xs">& Family Loved</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
