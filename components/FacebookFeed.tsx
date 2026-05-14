"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Facebook, Heart, ExternalLink } from 'lucide-react';

export default function FacebookFeed() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/facebook')
      .then(r => r.json())
      .then(d => { if (d && Array.isArray(d.posts)) setPosts(d.posts); })
      .catch(() => {});
  }, []);

  const fbUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL ?? '#';
  const igUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? '#';

  return (
    <section id="facebook" className="py-20 bg-parchment">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Facebook size={24} className="text-bark" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-bark-dark">Latest from the Kennel</h2>
          </div>
          <p className="text-bark-light max-w-xl mx-auto">New litters, field days, and life at Preston Ridge — straight from the kennel.</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-10">
            <Facebook size={48} className="mx-auto mb-4 text-bark/30" />
            <p className="text-bark-light">Kennel updates coming soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map(post => (
              <div key={post.id} className="rustic-card overflow-hidden hover:shadow-lg transition group">
                {post.image_url && (
                  <div className="relative h-48 overflow-hidden">
                    <Image src={post.image_url} alt="Post" fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="400px" />
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
                        className="flex items-center gap-1 text-bark text-xs hover:text-moss transition">
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
            className="inline-flex items-center gap-2 border border-bark/30 text-bark px-8 py-3 rounded-full hover:bg-bark hover:text-cream transition font-medium">
            <Facebook size={18} /> Follow on Facebook
          </a>
          <a href={igUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-bark/30 text-bark px-8 py-3 rounded-full hover:bg-bark hover:text-cream transition font-medium">
            📸 Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
