import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('reviews')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ reviews: data || [] });
  } catch (err) {
    console.error('Public reviews error:', err);
    return NextResponse.json({ reviews: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.reviewer_name || !body.reviewer_state || !body.review_text || !body.rating)
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    const { error } = await supabaseAdmin
      .from('reviews')
      .insert({ ...body, is_approved: false });
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Review submit error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
