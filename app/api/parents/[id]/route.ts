import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { data, error } = await supabaseAdmin.from('parents').update({ ...body, age_years: body.age_years ? Number(body.age_years) : null }).eq('id', params.id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ parent: data });
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await supabaseAdmin.from('parents').delete().eq('id', params.id);
  return NextResponse.json({ success: true });
}
