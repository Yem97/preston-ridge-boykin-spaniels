import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
export async function GET() {
  const { data } = await supabaseAdmin.from('parents').select('*').order('created_at', { ascending: true });
  return NextResponse.json({ parents: data || [] });
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { data, error } = await supabaseAdmin.from('parents').insert({ ...body, age_years: body.age_years ? Number(body.age_years) : null }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ parent: data }, { status: 201 });
}
