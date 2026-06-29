"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';

function FbIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect width="24" height="24" rx="6" fill="#1877F2"/>
      <path d="M16.5 8H14c-.3 0-.5.2-.5.5V10H16.5l-.3 2.5H13.5V19h-3v-6.5H9V10h1.5V8.5A3.5 3.5 0 0113 5h3.5v3z" fill="white"/>
    </svg>
  );
}

function IgIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <radialGradient id="ig-footer" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#ffd676"/>
          <stop offset="25%" stopColor="#f46f30"/>
          <stop offset="50%" stopColor="#e1306c"/>
          <stop offset="75%" stopColor="#833ab4"/>
          <stop offset="100%" stopColor="#4f5bd5"/>
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-footer)"/>
      <rect x="6.5" y="6.5" width="11" height="11" rx="3.5" stroke="white" strokeWidth="1.6" fill="none"/>
      <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.6" fill="none"/>
      <circle cx="17" cy="7" r="1" fill="white"/>
    </svg>
  );
}

export default function Footer() {
  const [fbUrl, setFbUrl] = useState('#');
  const [igUrl, setIgUrl] = useState('#');

  useEffect(() => {
    fetch('/api/profile')
      .then(r => r.json())
      .then(d => {
        if (d?.profile?.facebook_url) setFbUrl(d.profile.facebook_url);
        if (d?.profile?.instagram_url) setIgUrl(d.profile.instagram_url);
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-parchment border-t border-tan/20 text-bark-dark">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-tan flex items-center justify-center text-sm">🐕</div>
              <div>
                <div className="font-display text-base font-semibold text-bark-dark">Preston Ridge</div>
                <div className="text-tan text-xs tracking-widest uppercase">Boykin Spaniels</div>
              </div>
            </div>
            <p className="text-bark-light text-sm leading-relaxed mb-5">Premium Boykin Spaniels bred for hunting and family life. BSS · AKC · UKC registered. Health tested. USA.</p>
            <div className="flex gap-3">
              <a href={fbUrl} target="_blank" rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity duration-200">
                <FbIcon size={28} />
              </a>
              <a href={igUrl} target="_blank" rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity duration-200">
                <IgIcon size={28} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-bark-dark font-medium mb-4 text-sm uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2">
              {[
                ['/#puppies', 'Available Puppies'],
                ['/parents', 'Meet the Parents'],
                ['/gallery', 'Gallery'],
                ['/breed', 'About the Breed'],
                ['/apply', 'Apply for a Puppy'],
                ['/#reviews', 'Testimonials'],
              ].map(([href, label]) => (
                <li key={href}><Link href={href} className="text-bark-light hover:text-tan transition text-sm">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-bark-dark font-medium mb-4 text-sm uppercase tracking-wide">Contact</h4>
            <div className="space-y-2">
              <p className="text-bark-light text-sm flex items-center gap-2"><Phone size={14} className="text-tan" /> Available on WhatsApp</p>
              <p className="text-bark-light text-sm flex items-center gap-2"><Mail size={14} className="text-tan" /> Response within 24 hours</p>
              <p className="text-bark-light text-sm">📍 United States</p>
            </div>
            <div className="mt-6 p-4 bg-white rounded-xl border border-tan/20">
              <p className="text-xs text-bark-light uppercase tracking-wide mb-2">Certifications</p>
              <div className="flex flex-wrap gap-2">
                {['BSS', 'AKC', 'UKC'].map(c => (
                  <span key={c} className="text-xs bg-tan/15 text-bark px-2 py-1 rounded-full">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-bark/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-bark-light/60">
          <p>© {new Date().getFullYear()} Preston Ridge Boykin Spaniels. All rights reserved.</p>
          <p>Built with ❤️ for the love of Boykins <Link href="/login" className="opacity-30 hover:opacity-60 transition ml-1">·</Link></p>
        </div>
      </div>
    </footer>
  );
}
