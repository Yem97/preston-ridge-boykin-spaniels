"use client"
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Upload, Loader2, X } from 'lucide-react';
export default function GalleryAdminClient() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', image_url: '', category: 'general' });
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const fetch_ = async () => { const r = await fetch('/api/gallery'); const d = await r.json(); setPhotos(d.photos || []); };
  useEffect(() => { fetch_(); }, []);
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return; setUploading(true);
    const fd = new FormData(); fd.append('file', file); fd.append('bucket', 'puppy-images');
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const d = await res.json(); if (d.url) setForm(f => ({ ...f, image_url: d.url })); setUploading(false);
  };
  const handleSubmit = async () => {
    if (!form.image_url) return;
    await fetch('/api/gallery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setShowForm(false); setForm({ title: '', image_url: '', category: 'general' }); fetch_();
  };
  const handleDelete = async (id: string) => { if (!confirm('Delete this photo?')) return; await fetch(`/api/gallery/${id}`, { method: 'DELETE' }); fetch_(); };
  const inp = "px-3 py-2.5 rounded-xl bg-cream border border-tan/30 text-bark-dark text-sm focus:outline-none focus:border-bark placeholder-bark-light/50";
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display text-3xl font-bold text-bark-dark">Gallery 📸</h1><p className="text-bark-light text-sm mt-1">Manage your photo gallery.</p></div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 rustic-btn px-5 py-2.5"><Plus size={18} /> Add Photo</button>
      </div>
      {showForm && (
        <div className="rustic-card p-6 mb-8">
          <div className="flex items-center justify-between mb-4"><h3 className="font-display text-lg font-bold text-bark-dark">Add New Photo</h3><button onClick={() => setShowForm(false)}><X size={18} className="text-bark-light" /></button></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} placeholder="Photo title (optional)" className={`${inp} w-full`} />
            <select value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))} className={`${inp} w-full`}>
              <option value="general">General</option><option value="puppies">Puppies</option><option value="field">Field & Hunting</option><option value="families">Happy Families</option><option value="kennel">Our Kennel</option>
            </select>
          </div>
          <div className="flex items-center gap-4 mb-4">
            {form.image_url && <div className="w-16 h-16 rounded-xl overflow-hidden"><Image src={form.image_url} alt="" width={64} height={64} className="w-full h-full object-cover" /></div>}
            <button onClick={() => fileRef.current?.click()} disabled={uploading} className="flex items-center gap-2 text-sm border border-tan/30 text-bark-light hover:text-bark px-4 py-2 rounded-xl transition bg-cream disabled:opacity-50">
              {uploading ? <><Loader2 size={14} className="animate-spin" />Uploading...</> : <><Upload size={14} />Upload Photo</>}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
          </div>
          <div className="flex gap-3">
            <button onClick={handleSubmit} disabled={!form.image_url} className="rustic-btn px-6 py-2.5 disabled:opacity-50">Add to Gallery</button>
            <button onClick={() => setShowForm(false)} className="border border-tan/30 text-bark px-6 py-2.5 rounded-xl hover:bg-cream-dark transition">Cancel</button>
          </div>
        </div>
      )}
      {photos.length === 0 ? (
        <div className="text-center py-20 rustic-card"><p className="text-4xl mb-4">📸</p><p className="text-bark-light">No photos yet.</p></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map(p => (
            <div key={p.id} className="relative group rounded-xl overflow-hidden aspect-square border border-tan/20 hover:border-tan/50 transition">
              <Image src={p.image_url} alt={p.title || ''} fill className="object-cover" sizes="300px" />
              <div className="absolute inset-0 bg-bark-dark/0 group-hover:bg-bark-dark/40 transition-colors flex items-center justify-center">
                <button onClick={() => handleDelete(p.id)} className="opacity-0 group-hover:opacity-100 bg-red-500/90 text-white p-2 rounded-xl hover:bg-red-500 transition"><Trash2 size={16} /></button>
              </div>
              {p.title && <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bark-dark/70 to-transparent p-2"><p className="text-cream text-xs">{p.title}</p></div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
