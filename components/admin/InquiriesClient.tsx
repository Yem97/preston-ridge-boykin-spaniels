"use client"
import React from 'react';
import Link from 'next/link';
export default function InquiriesClient() {
  return (
    <div>
      <div className="mb-8"><h1 className="font-display text-3xl font-bold text-bark-dark">Inquiries</h1><p className="text-bark-light text-sm mt-1">All puppy applications are managed in the Applications section.</p></div>
      <div className="rustic-card p-12 text-center">
        <p className="text-4xl mb-4">📋</p>
        <h3 className="font-display text-xl font-bold text-bark-dark mb-2">Applications Are Here</h3>
        <p className="text-bark-light mb-6">All puppy inquiries come through the formal application system for Preston Ridge Boykin Spaniels.</p>
        <Link href="/admin/applications" className="rustic-btn px-8 py-3 inline-block">View All Applications</Link>
      </div>
    </div>
  );
}
