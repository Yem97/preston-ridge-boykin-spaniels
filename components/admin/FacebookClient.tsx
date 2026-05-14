"use client"
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Upload, Loader2, X, Facebook } from 'lucide-react';
export default function FacebookClient() {
  const [posts, setPosts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ content: '', image_url: '', post_url: '', likes: 0 });
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const fetch_ = async () => { const r = await fetch('/api/facebook'); const d = await r.json(); setPosts(d.posts || []); };
  useEffect(() => { fetch_(); }, []);
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return; setUploading(true);
    const fd = new FormData(); fd.append('file', file); fd.append('bucket', 'puppy-images');
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const d = await res.json(); if (d.url) setForm(f => ({ ...f, image_url: d.url })); setUploading(false);
  };
  const handleSubmit = async () => {
    if (!form.content) return;
    await fetch('/api/facebook', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setShowForm(false); setForm({ content: '', image_url: '', post_url: '', likes: 0 }); fetch_();
  };
  const handleDelete = async (id: string) => { if (!confirm('Delete this post?')) return; await fetch(`/api/facebook/${id}`, { method: 'DELETE' }); fetch_(); };
  const inp = "px-3 py-2.5 rounded-xl bg-cream border border-tan/30 text-bark-dark text-sm focus:outline-none focus:border-bark placeholder-bark-light/50";
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display text-3xl font-bold text-bark-dark">Facebook Posts 📘</h1><p className="text-bark-light text-sm mt-1">Post kennel updates to your website.</p></div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 rustic-btn px-5 py-2.5"><Plus size={18} /> Add Post</button>
      </div>
      {showForm && (
        <div className="rustic-card p-6 mb-8">
          <div className="flex items-center justify-between mb-4"><h3 className="font-display text-lg font-bold text-bark-dark flex items-center gap-2"><Facebook size={18} className="text-bark" />New Kennel Update</h3><button onClick={() => setShowForm(false)}><X size={18} className="text-bark-light" /></button></div>
          <textarea value={form.content} onChange={e => setForm(f=>({...f,content:e.target.value}))} rows={4} placeholder="What is new at the kennel?" className={`${inp} w-full resize-none mb-4`} />
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input value={form.post_url} onChange={e => setForm(f=>({...f,post_url:e.target.value}))} placeholder="Facebook post URL (optional)" className={`${inp} w-full`} />
            <input type="number" value={form.likes} onChange={e => setForm(f=>({...f,likes:Number(e.target.value)}))} placeholder="Likes" className={`${inp} w-full`} />
          </div>
          <div className="flex items-center gap-4 mb-4">
            {form.image_url && <div className="w-16 h-16 rounded-xl overflow-hidden"><Image src={form.image_url} alt="" width={64} height={64} className="w-full h-full object-cover" /></div>}
            <button onClick={() => fileRef.current?.click()} disabled={uploading} className="flex items-center gap-2 text-sm border border-tan/30 text-bark-light hover:text-bark px-4 py-2 rounded-xl transition bg-cream disabled:opacity-50">
              {uploading ? <><Loader2 size={14} className="animate-spin" />Uploading...</> : <><Upload size={14} />Add Photo</>}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
          </div>
          <div className="flex gap-3">
            <button onClick={handleSubmit} disabled={!form.content} className="rustic-btn px-6 py-2.5 disabled:opacity-50">Post Update</button>
            <button onClick={() => setShowForm(false)} className="border border-tan/30 text-bark px-6 py-2.5 rounded-xl hover:bg-cream-dark transition">Cancel</button>
          </div>
        </div>
      )}
      {posts.length === 0 ? <div className="text-center py-20 rustic-card"><Facebook size={48} className="mx-auto mb-4 text-bark/30" /><p className="text-bark-light">No posts yet.</p></div> : (
        <div className="space-y-4">
          {posts.map(p => (
            <div key={p.id} className="rustic-card p-5 flex gap-4 hover:shadow-md transition">
              {p.image_url && <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden"><Image src={p.image_url} alt="" width={80} height={80} className="w-full h-full object-cover" /></div>}
              <div className="flex-1 min-w-0"><p className="text-bark-light text-sm leading-relaxed mb-2">{p.content}</p><p className="text-bark-light text-xs">❤️ {p.likes || 0} likes</p></div>
              <button onClick={() => handleDelete(p.id)} className="text-bark-light hover:text-red-500 transition flex-shrink-0"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
