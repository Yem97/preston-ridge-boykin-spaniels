"use client"
import React, { useEffect, useState } from 'react';
import { Heart, ExternalLink } from 'lucide-react';

function FbIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#1877F2"/>
      <path d="M16.5 8H14c-.3 0-.5.2-.5.5V10H16.5l-.3 2.5H13.5V19h-3v-6.5H9V10h1.5V8.5A3.5 3.5 0 0113 5h3.5v3z" fill="white"/>
    </svg>
  );
}

function IgIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#ffd676"/>
          <stop offset="25%" stopColor="#f46f30"/>
          <stop offset="50%" stopColor="#e1306c"/>
          <stop offset="75%" stopColor="#833ab4"/>
          <stop offset="100%" stopColor="#4f5bd5"/>
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-grad)"/>
      <rect x="6.5" y="6.5" width="11" height="11" rx="3.5" stroke="white" strokeWidth="1.6" fill="none"/>
      <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.6" fill="none"/>
      <circle cx="17" cy="7" r="1" fill="white"/>
    </svg>
  );
}

export default function FacebookFeed() {
  const [posts, setPosts] = useState<any[]>([]);
  const [fbUrl, setFbUrl] = useState('#');
  const [igUrl, setIgUrl] = useState('#');

  useEffect(() => {
    fetch('/api/facebook')
      .then(r => r.json())
      .then(d => { if (d && Array.isArray(d.posts)) setPosts(d.posts); })
      .catch(() => {});
    fetch('/api/profile')
      .then(r => r.json())
      .then(d => {
        if (d?.profile?.facebook_url) setFbUrl(d.profile.facebook_url);
        if (d?.profile?.instagram_url) setIgUrl(d.profile.instagram_url);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="facebook" className="py-20 bg-parchment">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FbIcon size={30} />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-bark-dark">Latest from the Kennel</h2>
          </div>
          <p className="text-bark-light max-w-xl mx-auto">New litters, field days, and life at Preston Ridge — straight from the kennel.</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-10">
            <div className="flex justify-center mb-4 opacity-25">
              <FbIcon size={52} />
            </div>
            <p className="text-bark-light">Kennel updates coming soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map(post => (
              <div key={post.id} className="rustic-card overflow-hidden hover:shadow-lg transition group">
                {post.image_url && (
                  <div className="relative aspect-square overflow-hidden" style={{ background: '#FAF4EA' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.image_url} alt="Post"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-5">
                  <p className="text-bark-light text-sm leading-relaxed mb-4 line-clamp-3">{post.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-bark-light text-xs">
                      <Heart size={13} className="text-tan" />
                      <span>{post.likes ?? 0} likes</span>
                    </div>
                    {post.post_url && (
                      <a href={post.post_url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-bark text-xs hover:text-tan transition">
                        View post <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a href={fbUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 border border-bark/25 text-bark px-8 py-3 rounded-full hover:bg-bark hover:text-cream transition-all duration-200 font-medium text-sm">
            <FbIcon size={18} /> Follow on Facebook
          </a>
          <a href={igUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 border border-bark/25 text-bark px-8 py-3 rounded-full hover:bg-bark hover:text-cream transition-all duration-200 font-medium text-sm">
            <IgIcon size={18} /> Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
