"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Loader2, X, Upload } from 'lucide-react';

function PuppyForm({ puppy, onClose }: { puppy: any; onClose: () => void }) {
  const isEdit = !!puppy;
  const [form, setForm] = useState({
    name: puppy?.name || '', gender: puppy?.gender || 'female',
    age_weeks: puppy?.age_weeks?.toString() || '', color: puppy?.color || '',
    price_usd: puppy?.price_usd?.toString() || '200', status: puppy?.status || 'available',
    description: puppy?.description || '', image_url: puppy?.image_url || '',
    is_featured: puppy?.is_featured || false, litter_name: puppy?.litter_name || '',
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return; setUploading(true);
    const fd = new FormData(); fd.append('file', file); fd.append('bucket', 'puppy-images');
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const d = await res.json();
    if (d.url) set('image_url', d.url); else setError('Upload failed');
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError('');
    const url = isEdit ? `/api/puppies/${puppy.id}` : '/api/puppies';
    const res = await fetch(url, { method: isEdit ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (!res.ok) { const d = await res.json(); setError(d.error || 'Save failed'); setSaving(false); return; }
    onClose();
  };

  const inp = "w-full px-3 py-2.5 rounded-xl bg-cream border border-tan/30 focus:outline-none focus:ring-2 focus:ring-bark/30 focus:border-bark text-bark-dark text-sm placeholder-bark-light/50";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bark-dark/60" onClick={onClose}>
      <div className="bg-parchment rounded-2xl border border-tan/30 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-tan/20">
          <h2 className="font-display text-xl text-bark-dark font-bold">{isEdit ? 'Edit Puppy' : 'Add New Puppy'}</h2>
          <button onClick={onClose} className="text-bark-light hover:text-bark"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-cream-dark flex items-center justify-center flex-shrink-0 border border-tan/20">
              {form.image_url ? <Image src={form.image_url} alt="" width={64} height={64} className="w-full h-full object-cover" /> : <span className="text-2xl">🐕</span>}
            </div>
            <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
              className="flex items-center gap-2 text-sm border border-tan/30 text-bark-light hover:text-bark hover:border-bark px-4 py-2 rounded-xl transition disabled:opacity-50 bg-cream">
              {uploading ? <><Loader2 size={14} className="animate-spin" />Uploading...</> : <><Upload size={14} />Upload Photo</>}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2"><label className="text-xs text-bark-light block mb-1.5 uppercase tracking-wide">Name *</label><input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Duke" className={inp} /></div>
            <div><label className="text-xs text-bark-light block mb-1.5 uppercase tracking-wide">Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)} className={inp}>
                <option value="available">Available</option><option value="reserved">Reserved</option><option value="sold">Adopted</option>
              </select>
            </div>
            <div><label className="text-xs text-bark-light block mb-1.5 uppercase tracking-wide">Gender</label>
              <select value={form.gender} onChange={e => set('gender', e.target.value)} className={inp}>
                <option value="female">Female</option><option value="male">Male</option>
              </select>
            </div>
            <div><label className="text-xs text-bark-light block mb-1.5 uppercase tracking-wide">Age (weeks) *</label><input required type="number" min={1} value={form.age_weeks} onChange={e => set('age_weeks', e.target.value)} placeholder="8" className={inp} /></div>
            <div><label className="text-xs text-bark-light block mb-1.5 uppercase tracking-wide">Price (USD) *</label><input required type="number" min={0} value={form.price_usd} onChange={e => set('price_usd', e.target.value)} placeholder="1200" className={inp} /></div>
            <div><label className="text-xs text-bark-light block mb-1.5 uppercase tracking-wide">Color *</label><input required value={form.color} onChange={e => set('color', e.target.value)} placeholder="Chocolate Brown" className={inp} /></div>
            <div><label className="text-xs text-bark-light block mb-1.5 uppercase tracking-wide">Litter Name</label><input value={form.litter_name} onChange={e => set('litter_name', e.target.value)} placeholder="e.g. Spring 2025 Litter" className={inp} /></div>
          </div>
          <div><label className="text-xs text-bark-light block mb-1.5 uppercase tracking-wide">Description</label><textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} placeholder="Describe this puppy's personality..." className={`${inp} resize-none`} /></div>
          <div className="flex items-center gap-2"><input type="checkbox" id="feat" checked={form.is_featured} onChange={e => set('is_featured', e.target.checked)} className="rounded" /><label htmlFor="feat" className="text-sm text-bark-light">Feature on homepage</label></div>
          {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl p-3">{error}</p>}
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="flex-1 rustic-btn py-3 flex items-center justify-center gap-2 disabled:opacity-70">
              {saving ? <><Loader2 size={16} className="animate-spin" />Saving...</> : isEdit ? 'Save Changes' : 'Add Puppy'}
            </button>
            <button type="button" onClick={onClose} className="px-5 py-3 border border-tan/30 rounded-xl text-bark hover:bg-cream-dark transition">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function PuppiesClient() {
  const [puppies, setPuppies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  const fetch_ = async () => { setLoading(true); const r = await fetch('/api/puppies'); const d = await r.json(); setPuppies(d.puppies || []); setLoading(false); };
  useEffect(() => { fetch_(); }, []);

  const handleDelete = async (id: string) => { if (!confirm('Delete this puppy?')) return; await fetch(`/api/puppies/${id}`, { method: 'DELETE' }); fetch_(); };
  const sc: Record<string, string> = { available: 'text-moss bg-moss/10', reserved: 'text-tan bg-tan/10', sold: 'text-bark-light bg-bark/5' };
  const sl: Record<string, string> = { available: 'Available', reserved: 'Reserved', sold: 'Adopted' };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display text-3xl font-bold text-bark-dark">Puppies 🐕</h1><p className="text-bark-light text-sm mt-1">Manage your available puppies.</p></div>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="flex items-center gap-2 rustic-btn px-5 py-2.5"><Plus size={18} /> Add Puppy</button>
      </div>
      {loading ? <div className="text-center py-20 text-bark-light">Loading...</div> : puppies.length === 0 ? (
        <div className="text-center py-20 rustic-card"><p className="text-4xl mb-4">🐕</p><p className="text-bark-light">No puppies yet. Add your first one!</p></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {puppies.map(p => (
            <div key={p.id} className="rustic-card overflow-hidden hover:shadow-md transition">
              <div className="relative h-44">
                {p.image_url ? <Image src={p.image_url} alt={p.name} fill className="object-cover" sizes="400px" /> : <div className="w-full h-full bg-cream-dark flex items-center justify-center text-4xl">🐕</div>}
                <span className={`absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-medium ${sc[p.status]}`}>{sl[p.status]}</span>
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-bold text-bark-dark mb-0.5">{p.name}</h3>
                {p.litter_name && <p className="text-xs text-tan mb-1">{p.litter_name}</p>}
                <p className="text-bark-light text-xs mb-3 capitalize">{p.color} · {p.gender} · {p.age_weeks}w · ${p.price_usd?.toLocaleString()}</p>
                <div className="flex gap-2">
                  <button onClick={() => { setEditing(p); setShowForm(true); }} className="flex-1 flex items-center justify-center gap-1.5 text-xs border border-tan/30 text-bark-light hover:text-bark hover:border-bark py-2 rounded-xl transition bg-cream"><Pencil size={13} /> Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="flex items-center justify-center text-xs px-3 border border-tan/30 text-bark-light hover:text-red-500 hover:border-red-300 py-2 rounded-xl transition bg-cream"><Trash2 size={13} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {showForm && <PuppyForm puppy={editing} onClose={() => { setShowForm(false); setEditing(null); fetch_(); }} />}
    </div>
  );
}
