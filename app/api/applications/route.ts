import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { sendApplicationNotification, sendApplicationConfirmation } from '@/lib/resend';
export async function GET() {
  const { data } = await supabaseAdmin.from('applications').select('*').order('created_at', { ascending: false });
  return NextResponse.json({ applications: data || [] });
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.full_name || !body.email || !body.phone || !body.state || !body.city || !body.experience_with_dogs || !body.why_boykin)
    return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 });
  const { data, error } = await supabaseAdmin.from('applications').insert({ ...body, status: 'pending', is_read: false }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  await Promise.allSettled([sendApplicationNotification(data), sendApplicationConfirmation(data)]);
  return NextResponse.json({ success: true });
}
