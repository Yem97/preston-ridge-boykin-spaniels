import React from 'react';
import Link from 'next/link';
import { Facebook, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-field text-white">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-tan flex items-center justify-center text-sm">🐕</div>
              <div>
                <div className="font-display text-base font-semibold text-white">Preston Ridge</div>
                <div className="text-tan text-xs tracking-widest uppercase">Boykin Spaniels</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">Premium Boykin Spaniels bred for hunting and family life. BSS · AKC · UKC registered. Health tested. USA.</p>
            <div className="flex gap-4">
              <a href={process.env.NEXT_PUBLIC_FACEBOOK_URL || '#'} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-tan transition"><Facebook size={18} /></a>
              <a href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#'} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-tan transition text-sm">📸</a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4 text-sm uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2">
              {[['/#puppies','Available Puppies'],['/parents','Meet the Parents'],['/gallery','Gallery'],['/breed','About the Breed'],['/apply','Apply for a Puppy'],['/#reviews','Testimonials']].map(([href,label]) => (
                <li key={href}><Link href={href} className="text-white/50 hover:text-tan transition text-sm">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4 text-sm uppercase tracking-wide">Contact</h4>
            <div className="space-y-2">
              <p className="text-white/50 text-sm flex items-center gap-2"><Phone size={14} className="text-tan" /> Available on WhatsApp</p>
              <p className="text-white/50 text-sm flex items-center gap-2"><Mail size={14} className="text-tan" /> Response within 24 hours</p>
              <p className="text-white/50 text-sm">📍 United States</p>
            </div>
            <div className="mt-6 p-4 bg-bark/30 rounded-xl border border-tan/20">
              <p className="text-xs text-white/50 uppercase tracking-wide mb-2">Certifications</p>
              <div className="flex flex-wrap gap-2">
                {['BSS', 'AKC', 'UKC'].map(c => <span key={c} className="text-xs bg-tan/20 text-tan px-2 py-1 rounded-full">{c}</span>)}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Preston Ridge Boykin Spaniels. All rights reserved.</p>
          <p>Built with ❤️ for the love of Boykins <Link href="/login" className="opacity-20 hover:opacity-40 transition ml-1">·</Link></p>
        </div>
      </div>
    </footer>
  );
}
