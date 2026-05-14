"use client"
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, Loader2, CheckCircle, User } from 'lucide-react';

export default function ProfileClient() {
  const [profile, setProfile] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/profile').then(r => r.json()).then(d => { if (d.profile) setProfile(d.profile); }).catch(() => {});
  }, []);

  const set = (k: string, v: string | number | boolean) => setProfile((p: any) => p ? { ...p, [k]: v } : p);

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    const fd = new FormData(); fd.append('file', file); fd.append('bucket', 'puppy-images');
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const d = await res.json(); if (d.url) set('avatar_url', d.url);
    setUploading(false);
  };

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    await fetch('/api/profile', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(profile) });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inp = "w-full px-4 py-3 rounded-xl bg-cream border border-tan/30 focus:outline-none focus:ring-2 focus:ring-bark/30 focus:border-bark text-bark-dark text-sm placeholder-bark-light/50";
  const lbl = "block text-xs text-bark-light uppercase tracking-wide mb-1.5";

  if (!profile) return (
    <div className="text-center py-20">
      <div className="inline-flex items-center gap-2 text-bark-light"><Loader2 size={20} className="animate-spin" /> Loading profile...</div>
    </div>
  );

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-bark-dark">My Profile 🐕</h1>
        <p className="text-bark-light text-sm mt-1">Update your kennel info — changes appear instantly on the website.</p>
      </div>
      <div className="rustic-card p-8 space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-tan/30 flex-shrink-0">
            {profile.avatar_url
              ? <Image src={profile.avatar_url} alt="Profile" width={96} height={96} className="w-full h-full object-cover" />
              : <div className="w-full h-full bg-cream-dark flex items-center justify-center"><User size={32} className="text-bark-light" /></div>
            }
          </div>
          <div>
            <p className="font-medium text-bark-dark mb-2">Profile / Kennel Photo</p>
            <p className="text-bark-light text-xs mb-3">Appears on the About section of your website.</p>
            <button onClick={() => fileRef.current?.click()} disabled={uploading}
              className="flex items-center gap-2 text-sm border border-tan/30 text-bark-light hover:text-bark hover:border-bark px-4 py-2 rounded-xl transition bg-cream disabled:opacity-50">
              {uploading ? <><Loader2 size={14} className="animate-spin" />Uploading...</> : <><Upload size={14} />Change Photo</>}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
          </div>
        </div>

        <div className="border-t border-tan/20 pt-6 space-y-4">
          <div><label className={lbl}>Kennel Name</label><input value={profile.kennel_name || ''} onChange={e => set('kennel_name', e.target.value)} className={inp} /></div>
          <div><label className={lbl}>Tagline</label><input value={profile.tagline || ''} onChange={e => set('tagline', e.target.value)} placeholder="AKC · BSS · UKC Registered Boykin Spaniels" className={inp} /></div>
          <div><label className={lbl}>About / Bio</label><textarea value={profile.bio || ''} onChange={e => set('bio', e.target.value)} rows={5} className={`${inp} resize-none`} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={lbl}>Location</label><input value={profile.location || ''} onChange={e => set('location', e.target.value)} placeholder="e.g. South Carolina, USA" className={inp} /></div>
            <div><label className={lbl}>State</label><input value={profile.state || ''} onChange={e => set('state', e.target.value)} placeholder="e.g. South Carolina" className={inp} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={lbl}>Years Breeding</label><input type="number" min={0} value={profile.years_breeding || 0} onChange={e => set('years_breeding', Number(e.target.value))} className={inp} /></div>
            <div><label className={lbl}>Puppies Placed</label><input type="number" min={0} value={profile.puppies_placed || 0} onChange={e => set('puppies_placed', Number(e.target.value))} className={inp} /></div>
          </div>
        </div>

        <div className="border-t border-tan/20 pt-6 space-y-4">
          <p className="text-xs text-bark-light uppercase tracking-wide font-medium">Certifications</p>
          <div className="flex gap-6">
            {[['bss_registered', 'BSS Registered'], ['akc_registered', 'AKC Registered'], ['ukc_registered', 'UKC Registered']].map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={profile[key] || false} onChange={e => set(key, e.target.checked)} className="rounded" />
                <span className="text-sm text-bark-dark">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-tan/20 pt-6 space-y-4">
          <p className="text-xs text-bark-light uppercase tracking-wide font-medium">Contact & Social</p>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={lbl}>Email</label><input type="email" value={profile.email || ''} onChange={e => set('email', e.target.value)} placeholder="kennel@email.com" className={inp} /></div>
            <div><label className={lbl}>WhatsApp</label><input value={profile.whatsapp || ''} onChange={e => set('whatsapp', e.target.value)} placeholder="+1 555 000 0000" className={inp} /></div>
          </div>
          <div><label className={lbl}>Facebook Page URL</label><input value={profile.facebook_url || ''} onChange={e => set('facebook_url', e.target.value)} placeholder="https://facebook.com/yourpage" className={inp} /></div>
          <div><label className={lbl}>Instagram URL</label><input value={profile.instagram_url || ''} onChange={e => set('instagram_url', e.target.value)} placeholder="https://instagram.com/yourhandle" className={inp} /></div>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 rustic-btn px-8 py-3 disabled:opacity-70">
            {saving ? <><Loader2 size={16} className="animate-spin" />Saving...</> : 'Save Changes'}
          </button>
          {saved && <div className="flex items-center gap-2 text-moss text-sm"><CheckCircle size={16} />Saved successfully!</div>}
        </div>
      </div>
    </div>
  );
}
