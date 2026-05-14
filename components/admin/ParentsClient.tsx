"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Loader2, X, Upload } from 'lucide-react';

function ParentForm({ parent, onClose }: { parent: any; onClose: () => void }) {
  const isEdit = !!parent;
  const [form, setForm] = useState({
    name: parent?.name || '', gender: parent?.gender || 'female',
    role: parent?.role || 'dam', color: parent?.color || '',
    age_years: parent?.age_years?.toString() || '',
    description: parent?.description || '', image_url: parent?.image_url || '',
    health_tests: parent?.health_tests?.join(', ') || '',
    certifications: parent?.certifications?.join(', ') || '',
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return; setUploading(true);
    const fd = new FormData(); fd.append('file', file); fd.append('bucket', 'puppy-images');
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const d = await res.json(); if (d.url) set('image_url', d.url); else setError('Upload failed');
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError('');
    const payload = {
      ...form,
      age_years: form.age_years ? Number(form.age_years) : null,
      health_tests: form.health_tests ? form.health_tests.split(',').map(s => s.trim()).filter(Boolean) : [],
      certifications: form.certifications ? form.certifications.split(',').map(s => s.trim()).filter(Boolean) : [],
    };
    const url = isEdit ? `/api/parents/${parent.id}` : '/api/parents';
    const res = await fetch(url, { method: isEdit ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) { const d = await res.json(); setError(d.error || 'Save failed'); setSaving(false); return; }
    onClose();
  };

  const inp = "w-full px-3 py-2.5 rounded-xl bg-cream border border-tan/30 focus:outline-none focus:ring-2 focus:ring-bark/30 focus:border-bark text-bark-dark text-sm placeholder-bark-light/50";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bark-dark/60" onClick={onClose}>
      <div className="bg-parchment rounded-2xl border border-tan/30 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-tan/20">
          <h2 className="font-display text-xl font-bold text-bark-dark">{isEdit ? 'Edit Parent Dog' : 'Add Parent Dog'}</h2>
          <button onClick={onClose}><X size={20} className="text-bark-light" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-cream-dark flex items-center justify-center flex-shrink-0 border border-tan/20">
              {form.image_url ? <Image src={form.image_url} alt="" width={64} height={64} className="w-full h-full object-cover" /> : <span className="text-2xl">🐕</span>}
            </div>
            <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="flex items-center gap-2 text-sm border border-tan/30 text-bark-light hover:text-bark hover:border-bark px-4 py-2 rounded-xl transition bg-cream disabled:opacity-50">
              {uploading ? <><Loader2 size={14} className="animate-spin" />Uploading...</> : <><Upload size={14} />Upload Photo</>}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2"><label className="text-xs text-bark-light block mb-1.5 uppercase tracking-wide">Name *</label><input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Belle" className={inp} /></div>
            <div><label className="text-xs text-bark-light block mb-1.5 uppercase tracking-wide">Role</label>
              <select value={form.role} onChange={e => set('role', e.target.value)} className={inp}>
                <option value="dam">Female (Dam)</option><option value="stud">Male (Stud)</option>
              </select>
            </div>
            <div><label className="text-xs text-bark-light block mb-1.5 uppercase tracking-wide">Gender</label>
              <select value={form.gender} onChange={e => set('gender', e.target.value)} className={inp}>
                <option value="female">Female</option><option value="male">Male</option>
              </select>
            </div>
            <div><label className="text-xs text-bark-light block mb-1.5 uppercase tracking-wide">Color *</label><input required value={form.color} onChange={e => set('color', e.target.value)} placeholder="Chocolate Brown" className={inp} /></div>
            <div><label className="text-xs text-bark-light block mb-1.5 uppercase tracking-wide">Age (years)</label><input type="number" min={0} value={form.age_years} onChange={e => set('age_years', e.target.value)} placeholder="3" className={inp} /></div>
          </div>
          <div><label className="text-xs text-bark-light block mb-1.5 uppercase tracking-wide">Description</label><textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} placeholder="Describe this dog's personality, achievements..." className={`${inp} resize-none`} /></div>
          <div><label className="text-xs text-bark-light block mb-1.5 uppercase tracking-wide">Health Tests (comma separated)</label><input value={form.health_tests} onChange={e => set('health_tests', e.target.value)} placeholder="OFA Hips, OFA Eyes, OFA Heart, EIC Clear" className={inp} /></div>
          <div><label className="text-xs text-bark-light block mb-1.5 uppercase tracking-wide">Certifications (comma separated)</label><input value={form.certifications} onChange={e => set('certifications', e.target.value)} placeholder="AKC, BSS, UKC" className={inp} /></div>
          {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl p-3">{error}</p>}
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="flex-1 rustic-btn py-3 flex items-center justify-center gap-2 disabled:opacity-70">
              {saving ? <><Loader2 size={16} className="animate-spin" />Saving...</> : isEdit ? 'Save Changes' : 'Add Parent'}
            </button>
            <button type="button" onClick={onClose} className="px-5 py-3 border border-tan/30 rounded-xl text-bark hover:bg-cream-dark transition">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ParentsClient() {
  const [parents, setParents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  const fetch_ = async () => { setLoading(true); const r = await fetch('/api/parents'); const d = await r.json(); setParents(d.parents || []); setLoading(false); };
  useEffect(() => { fetch_(); }, []);
  const handleDelete = async (id: string) => { if (!confirm('Delete this parent dog?')) return; await fetch(`/api/parents/${id}`, { method: 'DELETE' }); fetch_(); };

  const studs = parents.filter(p => p.role === 'stud');
  const dams = parents.filter(p => p.role === 'dam');

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display text-3xl font-bold text-bark-dark">Parent Dogs 🐕</h1><p className="text-bark-light text-sm mt-1">Manage your stud dogs and females.</p></div>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="flex items-center gap-2 rustic-btn px-5 py-2.5"><Plus size={18} /> Add Parent</button>
      </div>
      {loading ? <div className="text-center py-20 text-bark-light">Loading...</div> : (
        <>
          <h2 className="font-display text-xl font-bold text-bark-dark mb-4">Stud Dogs ({studs.length})</h2>
          {studs.length === 0 ? <p className="text-bark-light text-sm mb-8">No stud dogs added yet.</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {studs.map(p => (
                <div key={p.id} className="rustic-card overflow-hidden hover:shadow-md transition">
                  <div className="relative h-44">
                    {p.image_url ? <Image src={p.image_url} alt={p.name} fill className="object-cover" sizes="400px" /> : <div className="w-full h-full bg-cream-dark flex items-center justify-center text-4xl">🐕</div>}
                    <span className="absolute top-3 right-3 bg-bark text-cream text-xs px-2.5 py-1 rounded-full">Stud</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg font-bold text-bark-dark mb-1">{p.name}</h3>
                    <p className="text-bark-light text-xs mb-3 capitalize">{p.color}{p.age_years ? ` · ${p.age_years} years` : ''}</p>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditing(p); setShowForm(true); }} className="flex-1 flex items-center justify-center gap-1.5 text-xs border border-tan/30 text-bark-light hover:text-bark hover:border-bark py-2 rounded-xl transition bg-cream"><Pencil size={13} /> Edit</button>
                      <button onClick={() => handleDelete(p.id)} className="flex items-center justify-center text-xs px-3 border border-tan/30 text-bark-light hover:text-red-500 hover:border-red-300 py-2 rounded-xl transition bg-cream"><Trash2 size={13} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <h2 className="font-display text-xl font-bold text-bark-dark mb-4">Female Dogs / Dams ({dams.length})</h2>
          {dams.length === 0 ? <p className="text-bark-light text-sm">No female dogs added yet.</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dams.map(p => (
                <div key={p.id} className="rustic-card overflow-hidden hover:shadow-md transition">
                  <div className="relative h-44">
                    {p.image_url ? <Image src={p.image_url} alt={p.name} fill className="object-cover" sizes="400px" /> : <div className="w-full h-full bg-cream-dark flex items-center justify-center text-4xl">🐕</div>}
                    <span className="absolute top-3 right-3 bg-moss text-cream text-xs px-2.5 py-1 rounded-full">Dam</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg font-bold text-bark-dark mb-1">{p.name}</h3>
                    <p className="text-bark-light text-xs mb-3 capitalize">{p.color}{p.age_years ? ` · ${p.age_years} years` : ''}</p>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditing(p); setShowForm(true); }} className="flex-1 flex items-center justify-center gap-1.5 text-xs border border-tan/30 text-bark-light hover:text-bark hover:border-bark py-2 rounded-xl transition bg-cream"><Pencil size={13} /> Edit</button>
                      <button onClick={() => handleDelete(p.id)} className="flex items-center justify-center text-xs px-3 border border-tan/30 text-bark-light hover:text-red-500 hover:border-red-300 py-2 rounded-xl transition bg-cream"><Trash2 size={13} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {showForm && <ParentForm parent={editing} onClose={() => { setShowForm(false); setEditing(null); fetch_(); }} />}
    </div>
  );
}
