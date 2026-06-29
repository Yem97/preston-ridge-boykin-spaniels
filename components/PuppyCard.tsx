import React from 'react';
import type { Puppy } from '@/types';

interface Props { puppy: Puppy; onClick: () => void; onApply: () => void; }

const statusStyles: Record<string, string> = {
  available: 'bg-moss/20 text-moss border-moss/30',
  reserved: 'bg-tan/20 text-bark border-tan/40',
  sold: 'bg-bark/10 text-bark-light border-bark/20',
};
const statusLabels: Record<string, string> = {
  available: 'Available',
  reserved: 'Reserved',
  sold: 'Adopted',
};

export default function PuppyCard({ puppy, onClick, onApply }: Props) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-tan/15 overflow-hidden cursor-pointer group"
      style={{ transition: 'box-shadow 0.25s ease, transform 0.25s ease', boxShadow: '0 2px 14px rgba(74,30,8,0.06)' }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 44px rgba(74,30,8,0.14), 0 4px 12px rgba(74,30,8,0.08)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 14px rgba(74,30,8,0.06)';
      }}
    >
      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        {puppy.image_url ? (
          <>
            {/* Blurred backdrop fills the frame — no flat side bars */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={puppy.image_url} alt="" aria-hidden
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'blur(20px) brightness(0.82)', transform: 'scale(1.18)' }} />
            {/* Full image, fully visible */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={puppy.image_url} alt={puppy.name}
              className="relative z-[1] w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
          </>
        ) : (
          <div className="w-full h-full bg-cream-dark flex items-center justify-center text-6xl">🐕</div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bark-dark/40 to-transparent pointer-events-none z-[2]" />

        {/* Status badge */}
        <span className={`absolute top-3 right-3 z-[3] text-xs font-medium px-3 py-1 rounded-full border backdrop-blur-sm ${statusStyles[puppy.status] ?? statusStyles.available}`}>
          {statusLabels[puppy.status] ?? 'Available'}
        </span>

        {puppy.is_featured && (
          <span className="absolute top-3 left-3 z-[3] text-xs font-medium px-3 py-1 rounded-full bg-tan/25 text-cream border border-tan/40 backdrop-blur-sm">
            ⭐ Featured
          </span>
        )}
        {puppy.litter_name && (
          <span className="absolute bottom-3 left-3 z-[3] text-xs text-cream/80 bg-field/65 px-2.5 py-1 rounded-full backdrop-blur-sm">
            {puppy.litter_name}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-display text-xl font-semibold text-bark-dark mb-1">{puppy.name}</h3>
        <p className="text-bark-light text-sm mb-4 capitalize leading-relaxed">
          {puppy.color ?? ''} · {puppy.gender} · {puppy.age_weeks} weeks old
        </p>
        <div className="flex items-center justify-between">
          <span className="text-bark font-bold text-xl font-display">${(puppy.price_usd ?? 0).toLocaleString()}</span>
          <button
            onClick={e => { e.stopPropagation(); onApply(); }}
            disabled={puppy.status === 'sold'}
            className="text-xs rustic-btn px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
          >
            {puppy.status === 'sold' ? 'Adopted' : puppy.status === 'reserved' ? 'Join Waitlist' : 'Apply Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
