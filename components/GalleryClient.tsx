"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function GalleryClient() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    fetch('/api/gallery')
      .then(r => r.json())
      .then(d => { if (d && Array.isArray(d.photos)) setPhotos(d.photos); })
      .catch(() => {});
  }, []);

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 text-bark-light hover:text-bark transition text-sm mb-6">
            <ArrowLeft size={16} /> Back to home
          </Link>
          <h1 className="font-display text-5xl font-bold text-bark-dark mb-4">Life at Preston Ridge</h1>
          <p className="text-bark-light">Puppies, field days, and happy families — a glimpse into our kennel.</p>
        </div>
        {photos.length === 0 ? (
          <div className="text-center py-20 text-bark-light">
            <p className="text-5xl mb-4">🐕</p>
            <p>Gallery coming soon!</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {photos.map(photo => (
              <div key={photo.id} onClick={() => setSelected(photo)}
                className="relative rounded-xl overflow-hidden cursor-pointer break-inside-avoid group border border-tan/20 hover:border-tan/50 transition">
                <Image src={photo.image_url} alt={photo.title ?? ''} width={400} height={300}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {photo.title && (
                  <div className="absolute inset-0 bg-bark-dark/0 group-hover:bg-bark-dark/30 transition-colors flex items-end p-3">
                    <p className="text-cream text-xs opacity-0 group-hover:opacity-100 transition-opacity">{photo.title}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
      {selected && (
        <div className="fixed inset-0 z-50 bg-bark-dark/90 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <Image src={selected.image_url} alt={selected.title ?? ''} width={900} height={600}
            className="rounded-2xl object-contain max-h-[85vh]" />
        </div>
      )}
    </main>
  );
}
