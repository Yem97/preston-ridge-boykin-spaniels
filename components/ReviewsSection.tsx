"use client"
import React, { useEffect, useState } from 'react';
import { Star, Loader2, CheckCircle } from 'lucide-react';

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(n => (
        <button key={n} type="button" onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)}>
          <Star size={24} className={`transition-colors ${n <= (hover || value) ? 'fill-tan text-tan' : 'text-bark/30'}`} />
        </button>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('/api/reviews')
      .then(r => r.json())
      .then(d => { setReviews(d?.reviews ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = {
      reviewer_name: (form.elements.namedItem('reviewer_name') as HTMLInputElement).value,
      reviewer_state: (form.elements.namedItem('reviewer_state') as HTMLInputElement).value,
      reviewer_email: (form.elements.namedItem('reviewer_email') as HTMLInputElement).value,
      puppy_name: (form.elements.namedItem('puppy_name') as HTMLInputElement).value,
      review_text: (form.elements.namedItem('review_text') as HTMLTextAreaElement).value,
      rating,
    };
    try {
      await fetch('/api/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      setSubmitted(true);
      setShowForm(false);
    } catch { /* silent */ }
    setSubmitting(false);
  }

  const inp = "w-full px-4 py-3 rounded-xl bg-cream border border-tan/30 focus:outline-none focus:ring-2 focus:ring-bark/30 focus:border-bark text-bark-dark placeholder-bark-light/50 transition text-sm";

  return (
    <section id="reviews" className="py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-bark-dark mb-4">Happy Families</h2>
          <p className="text-bark-light max-w-xl mx-auto">Real stories from families who welcomed a Preston Ridge Boykin into their home and field.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-10"><Loader2 className="animate-spin text-bark" size={32} /></div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-10 text-bark-light">No reviews yet — be the first to share your experience!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {reviews.map(r => (
              <div key={r.id} className="rustic-card p-6 flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(n => <Star key={n} size={14} className={n <= r.rating ? 'fill-tan text-tan' : 'text-bark/20'} />)}
                </div>
                <p className="text-bark-light text-sm leading-relaxed flex-grow mb-4 italic">"{r.review_text}"</p>
                {r.admin_reply && (
                  <div className="bg-moss/5 border border-moss/20 rounded-xl p-3 mb-4">
                    <p className="text-xs text-moss font-medium mb-1">🐕 Response from Preston Ridge</p>
                    <p className="text-xs text-bark-light">{r.admin_reply}</p>
                  </div>
                )}
                <div className="border-t border-tan/20 pt-4">
                  <p className="font-semibold text-bark-dark text-sm">{r.reviewer_name}</p>
                  <p className="text-xs text-bark-light mt-0.5">{r.reviewer_state}{r.puppy_name ? ` · Adopted ${r.puppy_name}` : ''}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {submitted ? (
          <div className="text-center">
            <CheckCircle className="mx-auto mb-3 text-moss" size={36} />
            <p className="text-bark-light text-sm">Thank you! Your review will appear after approval.</p>
          </div>
        ) : showForm ? (
          <div className="max-w-xl mx-auto rustic-card p-8">
            <h3 className="font-display text-2xl text-bark-dark mb-6 font-bold">Share Your Experience</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs text-bark-light uppercase tracking-wide block mb-1.5">Name *</label><input name="reviewer_name" required placeholder="Jane Smith" className={inp} /></div>
                <div><label className="text-xs text-bark-light uppercase tracking-wide block mb-1.5">State *</label><input name="reviewer_state" required placeholder="Texas" className={inp} /></div>
              </div>
              <div><label className="text-xs text-bark-light uppercase tracking-wide block mb-1.5">Email</label><input name="reviewer_email" type="email" placeholder="jane@email.com" className={inp} /></div>
              <div><label className="text-xs text-bark-light uppercase tracking-wide block mb-1.5">Puppy Name (optional)</label><input name="puppy_name" placeholder="Which puppy did you adopt?" className={inp} /></div>
              <div><label className="text-xs text-bark-light uppercase tracking-wide block mb-1.5">Rating *</label><StarPicker value={rating} onChange={setRating} /></div>
              <div><label className="text-xs text-bark-light uppercase tracking-wide block mb-1.5">Review *</label><textarea name="review_text" required rows={4} placeholder="Tell others about your experience..." className={`${inp} resize-none`} /></div>
              <div className="flex gap-3">
                <button type="submit" disabled={submitting} className="flex-1 rustic-btn py-3 flex items-center justify-center gap-2 disabled:opacity-70">
                  {submitting ? <><Loader2 size={16} className="animate-spin" />Submitting...</> : 'Submit Review'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-3 border border-tan/30 rounded-xl text-bark hover:bg-cream-dark transition">Cancel</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center">
            <button onClick={() => setShowForm(true)} className="border border-bark/30 text-bark px-8 py-3 rounded-full hover:bg-bark hover:text-cream transition font-medium">
              🐕 Leave a Review
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
