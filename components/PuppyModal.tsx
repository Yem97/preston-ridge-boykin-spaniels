"use client"
import React, { useEffect } from 'react';
import Image from 'next/image';
import type { Puppy } from '@/types';
import { X } from 'lucide-react';

interface Props { puppy: Puppy; onClose: () => void; onApply: () => void; }

export default function PuppyModal({ puppy, onClose, onApply }: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', h); };
  }, [onClose]);

  const sc: Record<string,string> = { available: 'bg-moss/20 text-moss', reserved: 'bg-tan/20 text-bark', sold: 'bg-bark/10 text-bark-light' };
  const sl: Record<string,string> = { available: 'Available', reserved: 'Reserved', sold: 'Adopted' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-bark-dark/70 backdrop-blur-sm" />
      <div className="relative bg-parchment rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 border border-tan/30 shadow-2xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-20 bg-cream rounded-full p-2 text-bark hover:bg-cream-dark transition shadow-md"><X size={18} /></button>

        {/* Image area — full photo, blurred backdrop fills the frame (no bars). Scrolls with the rest. */}
        {puppy.image_url ? (
          <div className="relative w-full rounded-t-2xl overflow-hidden" style={{ height: 360 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={puppy.image_url} alt="" aria-hidden
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'blur(26px) brightness(0.8)', transform: 'scale(1.18)' }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={puppy.image_url} alt={puppy.name}
              className="relative z-[1] w-full h-full object-contain" />
          </div>
        ) : (
          <div className="w-full h-48 rounded-t-2xl bg-cream-dark flex items-center justify-center text-6xl">🐕</div>
        )}

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h2 className="font-display text-3xl font-semibold text-bark-dark">{puppy.name}</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${sc[puppy.status]}`}>{sl[puppy.status]}</span>
          </div>
          <p className="text-bark-light capitalize mb-5">{puppy.color} · {puppy.gender} · {puppy.age_weeks} weeks old</p>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[['Color', puppy.color], ['Gender', puppy.gender], ['Age', `${puppy.age_weeks} weeks`], ['Price', `$${puppy.price_usd.toLocaleString()}`]].map(([k, v]) => (
              <div key={k} className="bg-cream rounded-xl p-3 border border-tan/20">
                <p className="text-xs text-bark-light uppercase tracking-wide mb-1">{k}</p>
                <p className="text-bark-dark capitalize font-medium">{v}</p>
              </div>
            ))}
          </div>
          {puppy.description && <p className="text-bark-light text-sm leading-relaxed mb-6">{puppy.description}</p>}
          <div className="flex gap-3">
            <button onClick={onApply} disabled={puppy.status === 'sold'} className="flex-1 rustic-btn py-3 disabled:opacity-40 disabled:cursor-not-allowed">
              {puppy.status === 'sold' ? 'This puppy has been adopted' : 'Apply for This Puppy'}
            </button>
            <button onClick={onClose} className="px-5 py-3 border border-tan/30 rounded-xl text-bark hover:bg-cream-dark transition">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
