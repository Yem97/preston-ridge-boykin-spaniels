"use client"
import React, { useEffect, useState } from 'react';
import { Star, Check, X, Trash2, MessageSquare } from 'lucide-react';
export default function ReviewsClient() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyId, setReplyId] = useState<string|null>(null);
  const [reply, setReply] = useState('');
  const fetch_ = async () => { setLoading(true); const r = await fetch('/api/reviews/admin'); const d = await r.json(); setReviews(d.reviews || []); setLoading(false); };
  useEffect(() => { fetch_(); }, []);
  const approve = async (id: string) => { await fetch(`/api/reviews/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_approved: true }) }); fetch_(); };
  const remove = async (id: string) => { await fetch(`/api/reviews/${id}`, { method: 'DELETE' }); fetch_(); };
  const submitReply = async (id: string) => { await fetch(`/api/reviews/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ admin_reply: reply }) }); setReplyId(null); setReply(''); fetch_(); };
  const pending = reviews.filter(r => !r.is_approved);
  const approved = reviews.filter(r => r.is_approved);
  return (
    <div>
      <div className="mb-8"><h1 className="font-display text-3xl font-bold text-bark-dark">Reviews ⭐</h1><p className="text-bark-light text-sm mt-1">Approve, reply to, or remove customer reviews.</p></div>
      {loading ? <div className="text-center py-20 text-bark-light">Loading...</div> : (
        <>
          {pending.length > 0 && (
            <div className="mb-10">
              <h2 className="font-display text-xl font-bold text-bark-dark mb-4 flex items-center gap-2"><span className="w-2 h-2 bg-amber-500 rounded-full" />Pending ({pending.length})</h2>
              <div className="space-y-4">
                {pending.map(r => (
                  <div key={r.id} className="rustic-card p-6 border-l-4 border-l-amber-400">
                    <div className="flex items-start justify-between mb-3">
                      <div><p className="font-bold text-bark-dark">{r.reviewer_name}</p><p className="text-bark-light text-xs">{r.reviewer_state}{r.puppy_name ? ` · ${r.puppy_name}` : ''}</p></div>
                      <div className="flex gap-1">{[1,2,3,4,5].map(n => <Star key={n} size={14} className={n <= r.rating ? 'fill-tan text-tan' : 'text-bark/20'} />)}</div>
                    </div>
                    <p className="text-bark-light text-sm italic mb-4">"{r.review_text}"</p>
                    <div className="flex gap-2">
                      <button onClick={() => approve(r.id)} className="flex items-center gap-1.5 text-xs bg-green-100 border border-green-200 text-green-700 px-4 py-2 rounded-xl hover:bg-green-200 transition"><Check size={13} /> Approve</button>
                      <button onClick={() => remove(r.id)} className="flex items-center gap-1.5 text-xs bg-red-100 border border-red-200 text-red-600 px-4 py-2 rounded-xl hover:bg-red-200 transition"><X size={13} /> Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div>
            <h2 className="font-display text-xl font-bold text-bark-dark mb-4 flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full" />Approved ({approved.length})</h2>
            {approved.length === 0 ? <p className="text-bark-light text-sm">No approved reviews yet.</p> : (
              <div className="space-y-4">
                {approved.map(r => (
                  <div key={r.id} className="rustic-card p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div><p className="font-bold text-bark-dark">{r.reviewer_name}</p><p className="text-bark-light text-xs">{r.reviewer_state}</p></div>
                      <div className="flex gap-2 items-center">
                        <div className="flex gap-1">{[1,2,3,4,5].map(n => <Star key={n} size={13} className={n <= r.rating ? 'fill-tan text-tan' : 'text-bark/20'} />)}</div>
                        <button onClick={() => remove(r.id)} className="text-bark-light hover:text-red-500 transition ml-2"><Trash2 size={15} /></button>
                      </div>
                    </div>
                    <p className="text-bark-light text-sm italic mb-3">"{r.review_text}"</p>
                    {r.admin_reply ? (
                      <div className="bg-moss/5 border border-moss/20 rounded-xl p-3 text-xs text-bark-light"><p className="text-moss font-medium mb-1">🐕 Your reply</p>{r.admin_reply}</div>
                    ) : replyId === r.id ? (
                      <div className="space-y-2">
                        <textarea value={reply} onChange={e => setReply(e.target.value)} rows={2} placeholder="Write your reply..." className="w-full px-3 py-2 rounded-xl bg-cream border border-tan/30 text-bark-dark text-sm resize-none focus:outline-none focus:border-bark" />
                        <div className="flex gap-2">
                          <button onClick={() => submitReply(r.id)} className="text-xs rustic-btn px-4 py-2">Post Reply</button>
                          <button onClick={() => setReplyId(null)} className="text-xs text-bark-light hover:text-bark transition">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => setReplyId(r.id)} className="flex items-center gap-1.5 text-xs border border-tan/30 text-bark-light hover:text-bark hover:border-bark px-3 py-1.5 rounded-xl transition bg-cream"><MessageSquare size={13} /> Reply</button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
