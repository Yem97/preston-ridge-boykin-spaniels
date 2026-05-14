"use client"
import React, { useEffect, useState } from 'react';
import { Check, X, ChevronDown, ChevronUp, Trash2, Mail, MessageCircle } from 'lucide-react';

export default function ApplicationsClient() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const fetch_ = async () => {
    setLoading(true);
    const r = await fetch('/api/applications');
    const d = await r.json();
    setApplications(d.applications || []);
    setLoading(false);
  };
  useEffect(() => { fetch_(); }, []);

  const update = async (id: string, data: any) => {
    await fetch(`/api/applications/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    fetch_();
  };

  const markRead = (id: string) => update(id, { is_read: true });
  const approve = (id: string) => update(id, { status: 'approved', is_read: true });
  const reject = (id: string) => update(id, { status: 'rejected', is_read: true });
  const saveNotes = (id: string) => update(id, { admin_notes: notes[id] });
  const remove = async (id: string) => { if (!confirm('Delete this application?')) return; await fetch(`/api/applications/${id}`, { method: 'DELETE' }); fetch_(); };

  const pending = applications.filter(a => a.status === 'pending');
  const approved = applications.filter(a => a.status === 'approved');
  const rejected = applications.filter(a => a.status === 'rejected');

  const sc: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700 border-amber-200',
    approved: 'bg-green-100 text-green-700 border-green-200',
    rejected: 'bg-red-100 text-red-700 border-red-200',
  };

  const AppCard = ({ app }: { app: any }) => (
    <div className={`rustic-card mb-4 ${!app.is_read && app.status === 'pending' ? 'border-l-4 border-l-bark' : ''}`}>
      <div className="p-5 flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap mb-1">
            <p className="font-display text-lg font-bold text-bark-dark">{app.full_name}</p>
            <span className={`text-xs px-2.5 py-1 rounded-full border font-medium capitalize ${sc[app.status]}`}>{app.status}</span>
            {!app.is_read && app.status === 'pending' && <span className="text-xs bg-bark text-cream px-2 py-0.5 rounded-full">New</span>}
          </div>
          <p className="text-bark-light text-sm">{app.city}, {app.state} · {app.email} · {app.phone}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-xs bg-cream border border-tan/20 text-bark-light px-2 py-1 rounded-full">{app.home_type}</span>
            {app.hunting_companion && <span className="text-xs bg-moss/10 text-moss border border-moss/20 px-2 py-1 rounded-full">🎯 Hunting</span>}
            {app.family_pet && <span className="text-xs bg-bark/10 text-bark border border-bark/20 px-2 py-1 rounded-full">🏠 Family Pet</span>}
            {app.preferred_gender && <span className="text-xs bg-cream border border-tan/20 text-bark-light px-2 py-1 rounded-full">Prefers: {app.preferred_gender}</span>}
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0 flex-wrap">
          <a href={`mailto:${app.email}?subject=Re: Your Puppy Application - Preston Ridge Boykin Spaniels`} className="p-2 rounded-lg text-bark-light hover:text-bark hover:bg-cream-dark transition" title="Email"><Mail size={15} /></a>
          {app.phone && <a href={`https://wa.me/${app.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-bark-light hover:text-green-600 hover:bg-green-50 transition" title="WhatsApp"><MessageCircle size={15} /></a>}
          {app.status === 'pending' && <>
            <button onClick={() => approve(app.id)} className="p-2 rounded-lg text-bark-light hover:text-green-600 hover:bg-green-50 transition" title="Approve"><Check size={15} /></button>
            <button onClick={() => reject(app.id)} className="p-2 rounded-lg text-bark-light hover:text-red-500 hover:bg-red-50 transition" title="Reject"><X size={15} /></button>
          </>}
          {!app.is_read && <button onClick={() => markRead(app.id)} className="p-2 rounded-lg text-bark-light hover:text-bark hover:bg-cream-dark transition text-xs">Mark Read</button>}
          <button onClick={() => setExpanded(expanded === app.id ? null : app.id)} className="p-2 rounded-lg text-bark-light hover:text-bark hover:bg-cream-dark transition">
            {expanded === app.id ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
          <button onClick={() => remove(app.id)} className="p-2 rounded-lg text-bark-light hover:text-red-500 hover:bg-red-50 transition"><Trash2 size={14} /></button>
        </div>
      </div>
      {expanded === app.id && (
        <div className="px-5 pb-5 border-t border-tan/20 pt-4 space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            {[
              ['Fenced Yard', app.has_yard ? 'Yes' : 'No'],
              ['Children', app.has_children ? 'Yes' : 'No'],
              ['Other Pets', app.has_other_pets ? app.other_pets_description || 'Yes' : 'No'],
              ['Dog Experience', app.experience_with_dogs],
              ['How They Found Us', app.how_did_you_hear || 'Not provided'],
            ].map(([k, v]) => (
              <div key={k} className="bg-cream rounded-xl p-3 border border-tan/20">
                <p className="text-xs text-bark-light uppercase tracking-wide mb-1">{k}</p>
                <p className="text-bark-dark text-xs font-medium capitalize">{v}</p>
              </div>
            ))}
          </div>
          {app.why_boykin && (
            <div className="bg-cream rounded-xl p-4 border border-tan/20">
              <p className="text-xs text-bark-light uppercase tracking-wide mb-2">Why They Want a Boykin</p>
              <p className="text-bark-light text-sm leading-relaxed italic">"{app.why_boykin}"</p>
            </div>
          )}
          <div>
            <label className="text-xs text-bark-light uppercase tracking-wide block mb-1.5">Your Notes</label>
            <div className="flex gap-2">
              <textarea
                value={notes[app.id] ?? (app.admin_notes || '')}
                onChange={e => setNotes(n => ({ ...n, [app.id]: e.target.value }))}
                rows={2} placeholder="Add private notes about this applicant..."
                className="flex-1 px-3 py-2 rounded-xl bg-cream border border-tan/30 text-bark-dark text-sm resize-none focus:outline-none focus:border-bark"
              />
              <button onClick={() => saveNotes(app.id)} className="rustic-btn px-4 py-2 text-xs">Save</button>
            </div>
          </div>
          <div className="flex gap-2">
            {app.status === 'pending' && <>
              <button onClick={() => approve(app.id)} className="flex items-center gap-1.5 text-xs bg-green-100 border border-green-200 text-green-700 px-4 py-2 rounded-xl hover:bg-green-200 transition"><Check size={13} /> Approve Application</button>
              <button onClick={() => reject(app.id)} className="flex items-center gap-1.5 text-xs bg-red-100 border border-red-200 text-red-600 px-4 py-2 rounded-xl hover:bg-red-200 transition"><X size={13} /> Reject Application</button>
            </>}
            {app.status !== 'pending' && (
              <button onClick={() => update(app.id, { status: 'pending' })} className="text-xs border border-tan/30 text-bark-light hover:text-bark px-4 py-2 rounded-xl transition">Reset to Pending</button>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-bark-dark">Applications 📋</h1>
        <p className="text-bark-light text-sm mt-1">Review and manage puppy applications.</p>
      </div>
      {loading ? <div className="text-center py-20 text-bark-light">Loading...</div> : applications.length === 0 ? (
        <div className="text-center py-20 rustic-card"><p className="text-4xl mb-4">📋</p><p className="text-bark-light">No applications yet.</p></div>
      ) : (
        <>
          {pending.length > 0 && (
            <div className="mb-10">
              <h2 className="font-display text-xl font-bold text-bark-dark mb-4 flex items-center gap-2"><span className="w-2.5 h-2.5 bg-amber-500 rounded-full" />Pending Review ({pending.length})</h2>
              {pending.map(a => <AppCard key={a.id} app={a} />)}
            </div>
          )}
          {approved.length > 0 && (
            <div className="mb-10">
              <h2 className="font-display text-xl font-bold text-bark-dark mb-4 flex items-center gap-2"><span className="w-2.5 h-2.5 bg-green-500 rounded-full" />Approved ({approved.length})</h2>
              {approved.map(a => <AppCard key={a.id} app={a} />)}
            </div>
          )}
          {rejected.length > 0 && (
            <div className="mb-10">
              <h2 className="font-display text-xl font-bold text-bark-dark mb-4 flex items-center gap-2"><span className="w-2.5 h-2.5 bg-red-500 rounded-full" />Rejected ({rejected.length})</h2>
              {rejected.map(a => <AppCard key={a.id} app={a} />)}
            </div>
          )}
        </>
      )}
    </div>
  );
}
