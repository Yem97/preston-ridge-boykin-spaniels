"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/#puppies', label: 'Available Puppies' },
  { href: '/parents', label: 'Meet the Parents' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/#about', label: 'About Us' },
  { href: '/breed', label: 'The Breed' },
  { href: '/#reviews', label: 'Testimonials' },
  { href: '/#facebook', label: 'Updates' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-cream/95 backdrop-blur-md shadow-md shadow-black/8 border-b border-bark/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full bg-tan flex items-center justify-center text-sm">🐕</div>
            <div>
              <div className="font-display text-base font-semibold text-field leading-tight">Preston Ridge</div>
              <div className="text-tan text-xs font-light tracking-widest uppercase leading-tight">Boykin Spaniels</div>
            </div>
          </Link>
          <div className="hidden lg:flex items-center gap-6">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="text-xs text-field/70 hover:text-bark transition font-light tracking-wide uppercase">{l.label}</Link>
            ))}
          </div>
          <div className="hidden lg:flex">
            <Link href="/apply" className="rustic-btn px-5 py-2 text-sm">Apply for a Puppy</Link>
          </div>
          <button onClick={() => setOpen(!open)} className="lg:hidden text-field hover:text-bark transition">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden bg-cream border-t border-bark/10">
          <div className="px-4 py-4 space-y-3">
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-sm text-field/70 hover:text-bark transition py-1.5 uppercase tracking-wide">{l.label}</Link>
            ))}
            <Link href="/apply" onClick={() => setOpen(false)} className="block text-center rustic-btn px-5 py-3 mt-2 text-sm">Apply for a Puppy</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
