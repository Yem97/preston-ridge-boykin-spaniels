export const dynamic = 'force-dynamic';

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import Link from 'next/link';

async function getStats() {
  const [p, a, r, g] = await Promise.all([
    supabaseAdmin.from('puppies').select('status'),
    supabaseAdmin.from('applications').select('status, is_read'),
    supabaseAdmin.from('reviews').select('is_approved'),
    supabaseAdmin.from('gallery').select('id'),
  ]);
  const puppies = p.data || [];
  const apps = a.data || [];
  const reviews = r.data || [];
  return {
    total: puppies.length,
    available: puppies.filter((x: any) => x.status === 'available').length,
    reserved: puppies.filter((x: any) => x.status === 'reserved').length,
    applications: apps.length,
    unread: apps.filter((x: any) => !x.is_read).length,
    pendingApplications: apps.filter((x: any) => x.status === 'pending').length,
    pendingReviews: reviews.filter((x: any) => !x.is_approved).length,
    gallery: (g.data || []).length,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: 'Total Puppies', value: stats.total, emoji: '🐕', href: '/admin/puppies' },
    { label: 'Available', value: stats.available, emoji: '✅', href: '/admin/puppies' },
    { label: 'Reserved', value: stats.reserved, emoji: '⏳', href: '/admin/puppies' },
    { label: 'Applications', value: stats.applications, emoji: '📋', href: '/admin/applications' },
    { label: 'Pending Applications', value: stats.pendingApplications, emoji: '🔴', href: '/admin/applications' },
    { label: 'Unread', value: stats.unread, emoji: '📬', href: '/admin/applications' },
    { label: 'Pending Reviews', value: stats.pendingReviews, emoji: '⭐', href: '/admin/reviews' },
    { label: 'Gallery Photos', value: stats.gallery, emoji: '📸', href: '/admin/gallery' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-bark-dark">Dashboard 🐕</h1>
        <p className="text-bark-light text-sm mt-1">Welcome back to Preston Ridge Boykin Spaniels</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {cards.map(c => (
          <Link key={c.label} href={c.href}
            className="rustic-card p-5 hover:shadow-md transition hover:border-tan/50">
            <div className="text-2xl mb-2">{c.emoji}</div>
            <p className="text-3xl font-display font-bold text-bark-dark mb-1">{c.value}</p>
            <p className="text-xs text-bark-light">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.pendingApplications > 0 && (
          <div className="rustic-card p-6 border-l-4 border-l-bark">
            <h3 className="font-semibold text-bark-dark mb-2">
              📋 {stats.pendingApplications} application{stats.pendingApplications > 1 ? 's' : ''} waiting for review
            </h3>
            <Link href="/admin/applications" className="text-bark text-sm hover:underline">
              Review applications →
            </Link>
          </div>
        )}
        {stats.pendingReviews > 0 && (
          <div className="rustic-card p-6 border-l-4 border-l-tan">
            <h3 className="font-semibold text-bark-dark mb-2">
              ⭐ {stats.pendingReviews} review{stats.pendingReviews > 1 ? 's' : ''} awaiting approval
            </h3>
            <Link href="/admin/reviews" className="text-bark text-sm hover:underline">
              Review now →
            </Link>
          </div>
        )}
        {stats.unread > 0 && (
          <div className="rustic-card p-6 border-l-4 border-l-moss">
            <h3 className="font-semibold text-bark-dark mb-2">
              📬 {stats.unread} unread application{stats.unread > 1 ? 's' : ''}
            </h3>
            <Link href="/admin/applications" className="text-bark text-sm hover:underline">
              View applications →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
