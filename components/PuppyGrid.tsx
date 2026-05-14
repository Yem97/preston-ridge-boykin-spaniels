"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Puppy } from '@/types';
import PuppyCard from './PuppyCard';
import PuppyModal from './PuppyModal';

const FILTERS = ['All', 'Available', 'Reserved', 'Male', 'Female'];

export default function PuppyGrid({ puppies }: { puppies: Puppy[] }) {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<Puppy | null>(null);
  const router = useRouter();

  const filtered = puppies.filter(p => {
    if (filter === 'All') return true;
    if (filter === 'Available') return p.status === 'available';
    if (filter === 'Reserved') return p.status === 'reserved';
    if (filter === 'Male') return p.gender === 'male';
    if (filter === 'Female') return p.gender === 'female';
    return true;
  });

  const handleApply = () => { setSelected(null); router.push('/apply'); };

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-sm font-light border transition-all ${filter === f ? 'bg-bark text-cream border-bark' : 'bg-white text-bark-light border-tan/30 hover:border-bark hover:text-bark'}`}>
            {f}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🐕</p>
          <p className="text-bark-light text-lg">No puppies available right now.</p>
          <p className="text-bark-light text-sm mt-2">Submit an application to join our waiting list.</p>
          <button onClick={() => router.push('/apply')} className="rustic-btn px-8 py-3 mt-6 inline-block">Join Waiting List</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => <PuppyCard key={p.id} puppy={p} onClick={() => setSelected(p)} onApply={handleApply} />)}
        </div>
      )}
      {selected && <PuppyModal puppy={selected} onClose={() => setSelected(null)} onApply={handleApply} />}
    </>
  );
}
