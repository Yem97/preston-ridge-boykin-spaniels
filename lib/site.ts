// Central site URL — override with NEXT_PUBLIC_SITE_URL in Vercel if you add a custom domain.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://preston-ridge-boykin-spaniels.vercel.app'
).replace(/\/$/, '');

export const SITE_NAME = 'Preston Ridge Boykin Spaniels';
