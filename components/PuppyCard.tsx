import React from 'react';
import Image from 'next/image';
import type { Puppy } from '@/types';

interface Props { puppy: Puppy; onClick: () => void; onApply: () => void; }

export default function PuppyCard({ puppy, onClick, onApply }: Props) {
  const sc: Record<string,string> = {
    available: 'bg-moss/20 text-moss border-moss/30',
    reserved: 'bg-tan/20 text-bark border-tan/30',
    sold: 'bg-bark/10 text-bark-light border-bark/20',
  };
  const sl: Record<string,string> = { available: 'Available', reserved: 'Reserved', sold: 'Adopted' };

  return (
    <div onClick={onClick} className="rustic-card overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-bark/10 transition-all duration-300 hover:-translate-y-1 group">
      <div className="relative h-56 overflow-hidden">
        {puppy.image_url
          ? <Image src={puppy.image_url} alt={puppy.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="400px" />
          : <div className="w-full h-full bg-cream-dark flex items-center justify-center text-6xl">🐕</div>
        }
        <div className="absolute inset-0 bg-gradient-to-t from-bark-dark/50 to-transparent" />
        <span className={`absolute top-3 right-3 text-xs font-medium px-3 py-1 rounded-full border ${sc[puppy.status] ?? sc.available}`}>
          {sl[puppy.status] ?? 'Available'}
        </span>
        {puppy.is_featured && (
          <span className="absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded-full bg-tan/20 text-bark border border-tan/30">⭐ Featured</span>
        )}
        {puppy.litter_name && (
          <span className="absolute bottom-3 left-3 text-xs text-cream/80 bg-field/60 px-2 py-1 rounded-full">{puppy.litter_name}</span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-semibold text-bark-dark mb-1">{puppy.name}</h3>
        <p className="text-bark-light text-sm mb-3 capitalize">{puppy.color ?? ''} · {puppy.gender} · {puppy.age_weeks} weeks old</p>
        <div className="flex items-center justify-between">
          <span className="text-bark font-bold text-lg">${(puppy.price_usd ?? 0).toLocaleString()}</span>
          <button
            onClick={e => { e.stopPropagation(); onApply(); }}
            disabled={puppy.status === 'sold'}
            className="text-xs rustic-btn px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {puppy.status === 'sold' ? 'Adopted' : puppy.status === 'reserved' ? 'Join Waitlist' : 'Apply Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
