"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

export default function LoginClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError('');
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) { setError('Invalid email or password.'); setLoading(false); return; }
    router.push('/admin');
  }

  return (
    <div className="min-h-screen bg-field flex items-center justify-center p-4">
      <div className="bg-parchment rounded-2xl border border-tan/30 p-8 w-full max-w-sm shadow-2xl">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🐕</div>
          <h1 className="font-display text-2xl font-bold text-bark-dark mb-1">Preston Ridge</h1>
          <p className="text-bark-light text-sm">Kennel Admin Dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-bark-light uppercase tracking-wide block mb-1.5">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@example.com"
              className="w-full px-4 py-3 rounded-xl bg-cream border border-tan/30 focus:outline-none focus:ring-2 focus:ring-bark/30 focus:border-bark text-bark-dark text-sm" />
          </div>
          <div>
            <label className="text-xs text-bark-light uppercase tracking-wide block mb-1.5">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-cream border border-tan/30 focus:outline-none focus:ring-2 focus:ring-bark/30 focus:border-bark text-bark-dark text-sm" />
          </div>
          {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl p-3">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full rustic-btn py-3 flex items-center justify-center gap-2 disabled:opacity-70">
            {loading ? <><Loader2 size={16} className="animate-spin" />Signing in...</> : 'Sign In 🐕'}
          </button>
        </form>
      </div>
    </div>
  );
}
