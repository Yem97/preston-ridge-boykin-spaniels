"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { LayoutDashboard, Dog, Images, Star, ClipboardList, Facebook, User, LogOut, Menu, X, Trees } from 'lucide-react';

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/puppies', label: 'Puppies', icon: Dog },
  { href: '/admin/parents', label: 'Parents', icon: Trees },
  { href: '/admin/applications', label: 'Applications', icon: ClipboardList },
  { href: '/admin/gallery', label: 'Gallery', icon: Images },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
  { href: '/admin/facebook', label: 'Facebook Posts', icon: Facebook },
  { href: '/admin/profile', label: 'My Profile', icon: User },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  }

  const NavContent = () => (
    <>
      <div className="px-6 py-6 border-b border-tan/20">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">🐕</span>
          <div>
            <div className="font-display text-sm font-bold text-bark-dark leading-tight">Preston Ridge</div>
            <div className="text-xs text-bark-light tracking-widest uppercase leading-tight">Admin Panel</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${active ? 'bg-bark text-cream font-medium' : 'text-bark-light hover:bg-cream-dark hover:text-bark'}`}>
              <Icon size={17} />{label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-tan/20 space-y-1">
        <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-bark-light hover:bg-cream-dark hover:text-bark transition">View Live Site ↗</a>
        <button onClick={signOut} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-500 hover:bg-red-50 transition">
          <LogOut size={17} /> Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 bg-parchment border-r border-tan/20 z-30 shadow-sm">
        <NavContent />
      </aside>
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-parchment border-b border-tan/20 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2"><span>🐕</span><span className="font-display text-bark-dark font-bold">Preston Ridge Admin</span></div>
        <button onClick={() => setOpen(!open)} className="text-bark-light hover:text-bark transition">{open ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
      {open && (
        <div className="md:hidden fixed inset-0 z-20 bg-bark-dark/50" onClick={() => setOpen(false)}>
          <aside className="w-72 h-full bg-parchment flex flex-col border-r border-tan/20 pt-14" onClick={e => e.stopPropagation()}>
            <NavContent />
          </aside>
        </div>
      )}
      <div className="md:hidden h-14" />
    </>
  );
}
