export const dynamic = 'force-dynamic';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BreedPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <div className="pt-24 pb-20 px-4 max-w-4xl mx-auto">
        <div className="mb-10">
          <Link href="/" className="flex items-center gap-2 text-bark-light hover:text-bark transition text-sm mb-6"><ArrowLeft size={16} /> Back to home</Link>
          <h1 className="font-display text-5xl font-bold text-bark-dark mb-3">The Boykin Spaniel</h1>
          <p className="text-bark-light text-lg italic font-rustic">"The dog that doesn't rock the boat."</p>
        </div>

        <div className="space-y-10">
          {/* History */}
          <div className="rustic-card p-8">
            <h2 className="font-display text-2xl font-bold text-bark-dark mb-4">🏛️ History & Origin</h2>
            <p className="text-bark-light leading-relaxed mb-4">The Boykin Spaniel was developed in South Carolina in the early 1900s by hunters along the Wateree River. They needed a small, rugged dog compact enough for boat travel yet capable of retrieving on both land and water.</p>
            <p className="text-bark-light leading-relaxed">South Carolinian Whit Boykin perfected this specialty breed — a joyful, devoted family dog with exceptional zeal for work. The breed is South Carolina's official state dog and one of only two US-made breeds named for the family responsible for their creation.</p>
          </div>

          {/* Characteristics */}
          <div className="rustic-card p-8">
            <h2 className="font-display text-2xl font-bold text-bark-dark mb-6">📋 Breed Characteristics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Size', value: 'Medium — 20 to 40 lbs' },
                { label: 'Height', value: '15 to 18 inches' },
                { label: 'Coat', value: 'Short to medium, straight to moderately wavy' },
                { label: 'Color', value: 'Rich liver to dark chocolate brown' },
                { label: 'Ears', value: 'Long spaniel ears with feathering' },
                { label: 'Tail', value: 'Docked' },
                { label: 'Lifespan', value: '14 to 16 years' },
                { label: 'Energy Level', value: 'High — needs daily exercise' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-cream rounded-xl p-4 border border-tan/20">
                  <p className="text-xs text-bark-light uppercase tracking-wide mb-1">{label}</p>
                  <p className="text-bark-dark font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Temperament */}
          <div className="rustic-card p-8">
            <h2 className="font-display text-2xl font-bold text-bark-dark mb-4">❤️ Temperament</h2>
            <p className="text-bark-light leading-relaxed mb-4">The Boykin Spaniel is friendly, social, and considered an excellent family pet. They are highly intelligent and possess a great desire to please, making them easy to train. They are good with children and other dogs and extremely adaptable to different environments.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              {['Friendly', 'Loyal', 'Intelligent', 'Eager to Please', 'Energetic', 'Social', 'Trainable', 'Affectionate'].map(t => (
                <div key={t} className="bg-moss/10 text-moss border border-moss/20 rounded-full px-3 py-2 text-xs text-center font-medium">{t}</div>
              ))}
            </div>
          </div>

          {/* Hunting */}
          <div className="rustic-card p-8">
            <h2 className="font-display text-2xl font-bold text-bark-dark mb-4">🎯 Hunting Abilities</h2>
            <p className="text-bark-light leading-relaxed mb-4">The Boykin Spaniel is a versatile hunter — working as both a retriever and upland flushing dog. Their small size makes them easy to carry in a canoe or small boat. They have boundless enthusiasm and endurance in the field.</p>
            <ul className="space-y-2">
              {['Duck and waterfowl retrieval', 'Wild turkey flushing', 'Dove hunting', 'Pheasant and upland game', 'Excellent swimmer', 'Thrives in hot Southern weather'].map(item => (
                <li key={item} className="flex items-center gap-2 text-bark-light text-sm"><span className="text-tan">✓</span>{item}</li>
              ))}
            </ul>
          </div>

          {/* Health */}
          <div className="rustic-card p-8">
            <h2 className="font-display text-2xl font-bold text-bark-dark mb-4">🏥 Health Considerations</h2>
            <p className="text-bark-light leading-relaxed mb-4">Responsible breeders health test all breeding dogs for the seven identified inherited diseases of the breed. At Preston Ridge, all our breeding dogs are tested and cleared before breeding.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['Hip Dysplasia (OFA)', 'Eye Examination (ACVO)', 'Heart Evaluation (OFA)', 'Exercise Induced Collapse (EIC)', 'Degenerative Myelopathy (DM)', 'Collie Eye Anomaly (CEA)'].map(t => (
                <div key={t} className="bg-cream rounded-xl p-3 border border-tan/20 text-xs text-bark-light"><span className="text-moss font-medium">✓ Tested:</span><br />{t}</div>
              ))}
            </div>
          </div>

          {/* Care */}
          <div className="rustic-card p-8">
            <h2 className="font-display text-2xl font-bold text-bark-dark mb-4">🏠 Care Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-bark mb-2">Exercise</h3>
                <p className="text-bark-light text-sm leading-relaxed">Boykins require daily exercise and mental stimulation. A fenced yard, swimming, and regular field outings keep them happy and healthy.</p>
              </div>
              <div>
                <h3 className="font-semibold text-bark mb-2">Grooming</h3>
                <p className="text-bark-light text-sm leading-relaxed">Regular brushing and occasional clipping, especially if your dog is in the field. The soft wavy coat collects foxtails and briars.</p>
              </div>
              <div>
                <h3 className="font-semibold text-bark mb-2">Training</h3>
                <p className="text-bark-light text-sm leading-relaxed">Highly trainable and eager to please. Early socialization and positive reinforcement work best. They excel in obedience, hunting, and agility.</p>
              </div>
              <div>
                <h3 className="font-semibold text-bark mb-2">Family Life</h3>
                <p className="text-bark-light text-sm leading-relaxed">Boykins make wonderful family dogs. They are gentle with children, good with other pets, and love being part of family activities.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-bark text-cream rounded-2xl p-8 text-center">
            <h3 className="font-display text-2xl font-bold mb-3">Ready to Add a Boykin to Your Family?</h3>
            <p className="text-cream/70 mb-6">Submit an application and take the first step toward your perfect hunting companion and family dog.</p>
            <Link href="/apply" className="bg-tan text-bark-dark font-medium px-8 py-3 rounded-xl hover:bg-tan-light transition inline-block">Apply for a Puppy</Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
