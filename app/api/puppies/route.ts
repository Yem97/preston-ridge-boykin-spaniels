import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
export async function GET() {
  const { data } = await supabaseAdmin.from('puppies').select('*').order('created_at', { ascending: false });
  return NextResponse.json({ puppies: data || [] });
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { data, error } = await supabaseAdmin.from('puppies').insert({ ...body, age_weeks: Number(body.age_weeks), price_usd: Number(body.price_usd) }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ puppy: data }, { status: 201 });
}
