"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ApplicationClient() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', state: '', city: '',
    home_type: '', has_yard: false, has_children: false,
    has_other_pets: false, other_pets_description: '',
    experience_with_dogs: '', hunting_companion: false,
    family_pet: true, preferred_gender: '',
    how_did_you_hear: '', why_boykin: '',
  });

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));
  const inp = "w-full px-4 py-3 rounded-xl bg-cream border border-tan/30 focus:outline-none focus:ring-2 focus:ring-bark/30 focus:border-bark text-bark-dark placeholder-bark-light/50 transition text-sm";
  const lbl = "block text-xs text-bark-light uppercase tracking-wide mb-1.5 font-medium";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/applications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Something went wrong'); }
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'success') return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <div className="pt-32 pb-20 px-4 max-w-2xl mx-auto text-center">
        <CheckCircle className="mx-auto mb-6 text-moss" size={64} />
        <h1 className="font-display text-4xl font-bold text-bark-dark mb-4">Application Submitted!</h1>
        <p className="text-bark-light text-lg mb-4">Thank you, {form.full_name}! We have received your application and will review it carefully.</p>
        <p className="text-bark-light mb-8">We typically respond within 2-3 business days. Please check your email at <strong>{form.email}</strong>.</p>
        <Link href="/" className="rustic-btn px-8 py-3 inline-block">Back to Home</Link>
      </div>
      <Footer />
    </main>
  );

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <div className="pt-24 pb-20 px-4 max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 text-bark-light hover:text-bark transition text-sm mb-6"><ArrowLeft size={16} /> Back to home</Link>
          <h1 className="font-display text-4xl font-bold text-bark-dark mb-2">Puppy Application</h1>
          <p className="text-bark-light">We carefully review each application to ensure our puppies go to loving, prepared homes. Please answer all questions honestly.</p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[1,2,3].map(s => (
            <div key={s} className={`flex-1 h-2 rounded-full transition-all ${step >= s ? 'bg-bark' : 'bg-tan/20'}`} />
          ))}
        </div>
        <p className="text-xs text-bark-light uppercase tracking-wide mb-6">Step {step} of 3 — {step === 1 ? 'Your Information' : step === 2 ? 'Your Home & Experience' : 'About Your Interest'}</p>

        <form onSubmit={handleSubmit} className="rustic-card p-8 space-y-5">
          {step === 1 && (
            <>
              <h2 className="font-display text-xl text-bark-dark mb-2">Your Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><label className={lbl}>Full Name *</label><input required value={form.full_name} onChange={e => set('full_name', e.target.value)} placeholder="Jane Smith" className={inp} /></div>
                <div><label className={lbl}>Email *</label><input type="email" required value={form.email} onChange={e => set('email', e.target.value)} placeholder="jane@email.com" className={inp} /></div>
                <div><label className={lbl}>Phone *</label><input type="tel" required value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+1 555 000 0000" className={inp} /></div>
                <div><label className={lbl}>City *</label><input required value={form.city} onChange={e => set('city', e.target.value)} placeholder="Houston" className={inp} /></div>
                <div><label className={lbl}>State *</label><input required value={form.state} onChange={e => set('state', e.target.value)} placeholder="Texas" className={inp} /></div>
              </div>
              <div><label className={lbl}>How did you hear about us?</label>
                <select value={form.how_did_you_hear} onChange={e => set('how_did_you_hear', e.target.value)} className={inp}>
                  <option value="">Select...</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Google Search">Google Search</option>
                  <option value="Word of Mouth">Word of Mouth</option>
                  <option value="AKC Marketplace">AKC Marketplace</option>
                  <option value="BSS Website">BSS Website</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <button type="button" onClick={() => { if (!form.full_name || !form.email || !form.phone || !form.city || !form.state) { alert('Please fill in all required fields.'); return; } setStep(2); }} className="w-full rustic-btn py-3">Next Step →</button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="font-display text-xl text-bark-dark mb-2">Your Home & Experience</h2>
              <div><label className={lbl}>Type of home *</label>
                <select required value={form.home_type} onChange={e => set('home_type', e.target.value)} className={inp}>
                  <option value="">Select...</option>
                  <option value="House with large yard">House with large yard</option>
                  <option value="House with small yard">House with small yard</option>
                  <option value="House no yard">House with no yard</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Farm / Rural property">Farm / Rural property</option>
                </select>
              </div>
              <div className="space-y-3">
                {[
                  { key: 'has_yard', label: 'Do you have a fenced yard?' },
                  { key: 'has_children', label: 'Do you have children at home?' },
                  { key: 'has_other_pets', label: 'Do you have other pets?' },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={form[key as keyof typeof form] as boolean} onChange={e => set(key, e.target.checked)} className="w-4 h-4 rounded border-tan/30" />
                    <span className="text-sm text-bark-dark">{label}</span>
                  </label>
                ))}
                {form.has_other_pets && (
                  <div><label className={lbl}>Please describe your other pets</label><input value={form.other_pets_description} onChange={e => set('other_pets_description', e.target.value)} placeholder="e.g. 2 cats, 1 Lab" className={inp} /></div>
                )}
              </div>
              <div><label className={lbl}>Experience with dogs *</label>
                <select required value={form.experience_with_dogs} onChange={e => set('experience_with_dogs', e.target.value)} className={inp}>
                  <option value="">Select...</option>
                  <option value="First time dog owner">First time dog owner</option>
                  <option value="Previous experience with dogs">Previous experience with dogs</option>
                  <option value="Experienced with spaniels">Experienced with spaniels</option>
                  <option value="Experienced with Boykin Spaniels">Experienced with Boykin Spaniels</option>
                  <option value="Professional dog handler / hunter">Professional dog handler / hunter</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="flex-1 border border-tan/30 text-bark py-3 rounded-xl hover:bg-cream-dark transition">← Back</button>
                <button type="button" onClick={() => { if (!form.home_type || !form.experience_with_dogs) { alert('Please fill in all required fields.'); return; } setStep(3); }} className="flex-1 rustic-btn py-3">Next Step →</button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="font-display text-xl text-bark-dark mb-2">About Your Interest</h2>
              <div>
                <label className={lbl}>Primary purpose *</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${form.hunting_companion ? 'border-bark bg-bark/5' : 'border-tan/30 bg-cream'}`}>
                    <input type="checkbox" checked={form.hunting_companion} onChange={e => set('hunting_companion', e.target.checked)} className="w-4 h-4" />
                    <div><p className="text-sm font-medium text-bark-dark">Hunting Companion</p><p className="text-xs text-bark-light">Field dog</p></div>
                  </label>
                  <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${form.family_pet ? 'border-bark bg-bark/5' : 'border-tan/30 bg-cream'}`}>
                    <input type="checkbox" checked={form.family_pet} onChange={e => set('family_pet', e.target.checked)} className="w-4 h-4" />
                    <div><p className="text-sm font-medium text-bark-dark">Family Pet</p><p className="text-xs text-bark-light">House companion</p></div>
                  </label>
                </div>
              </div>
              <div><label className={lbl}>Preferred gender</label>
                <select value={form.preferred_gender} onChange={e => set('preferred_gender', e.target.value)} className={inp}>
                  <option value="">No preference</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div><label className={lbl}>Why do you want a Boykin Spaniel? *</label>
                <textarea required value={form.why_boykin} onChange={e => set('why_boykin', e.target.value)} rows={5} placeholder="Tell us why you chose the Boykin Spaniel breed and what your plans are for your new puppy..." className={`${inp} resize-none`} />
              </div>
              {status === 'error' && <div className="flex items-center gap-2 text-red-600 bg-red-50 rounded-xl p-4 text-sm border border-red-200"><AlertCircle size={16} />{errorMsg}</div>}
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(2)} className="flex-1 border border-tan/30 text-bark py-3 rounded-xl hover:bg-cream-dark transition">← Back</button>
                <button type="submit" disabled={status === 'loading' || !form.why_boykin || (!form.hunting_companion && !form.family_pet)} className="flex-1 rustic-btn py-3 flex items-center justify-center gap-2 disabled:opacity-70">
                  {status === 'loading' ? <><Loader2 size={16} className="animate-spin" />Submitting...</> : 'Submit Application 🐕'}
                </button>
              </div>
              <p className="text-xs text-bark-light text-center">We review all applications carefully and respond within 2-3 business days.</p>
            </>
          )}
        </form>
      </div>
      <Footer />
    </main>
  );
}
