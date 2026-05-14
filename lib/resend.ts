import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendApplicationNotification(app: Record<string, any>) {
  try {
    await resend.emails.send({
      from: 'Preston Ridge Boykin Spaniels <noreply@prestonridgeboykins.com>',
      to: process.env.ADMIN_EMAIL!,
      subject: `New Puppy Application from ${app.full_name}`,
      html: `<div style="font-family:sans-serif;max-width:600px"><div style="background:#5C3D1E;padding:24px;border-radius:12px 12px 0 0"><h1 style="color:#F5EDD6;margin:0">New Application 🐕</h1></div><div style="background:#f9f9f9;padding:24px;border-radius:0 0 12px 12px"><p><strong>Name:</strong> ${app.full_name}</p><p><strong>Email:</strong> ${app.email}</p><p><strong>Phone:</strong> ${app.phone}</p><p><strong>Location:</strong> ${app.city}, ${app.state}</p><p><strong>Home:</strong> ${app.home_type}</p><p><strong>Purpose:</strong> ${app.hunting_companion ? 'Hunting companion' : ''} ${app.family_pet ? 'Family pet' : ''}</p><p><strong>Why Boykin:</strong> ${app.why_boykin || 'Not provided'}</p></div></div>`,
    });
  } catch (e) { console.error('Email error:', e); }
}

export async function sendApplicationConfirmation(app: Record<string, any>) {
  try {
    await resend.emails.send({
      from: 'Preston Ridge Boykin Spaniels <noreply@prestonridgeboykins.com>',
      to: app.email,
      subject: 'Application Received — Preston Ridge Boykin Spaniels',
      html: `<div style="font-family:sans-serif;max-width:600px"><div style="background:#5C3D1E;padding:24px;border-radius:12px 12px 0 0"><h1 style="color:#F5EDD6;margin:0">Thank you, ${app.full_name}!</h1></div><div style="background:#f9f9f9;padding:24px;border-radius:0 0 12px 12px"><p>We have received your puppy application and will review it carefully. We typically respond within 2-3 business days.</p><p>We appreciate your interest in our Boykin Spaniels!</p><br/><p style="color:#888">— Preston Ridge Boykin Spaniels</p></div></div>`,
    });
  } catch (e) { console.error('Email error:', e); }
}
