export interface Puppy {
  id: string;
  name: string;
  gender: 'male' | 'female';
  age_weeks: number;
  color: string;
  price_usd: number;
  status: 'available' | 'reserved' | 'sold';
  description?: string;
  image_url?: string;
  is_featured?: boolean;
  litter_name?: string;
  created_at?: string;
}

export interface Parent {
  id: string;
  name: string;
  gender: 'male' | 'female';
  role: 'stud' | 'dam';
  color: string;
  age_years?: number;
  description?: string;
  image_url?: string;
  certifications?: string[];
  health_tests?: string[];
  created_at?: string;
}

export interface GalleryPhoto {
  id: string;
  title?: string;
  description?: string;
  image_url: string;
  category?: string;
  created_at?: string;
}

export interface Review {
  id: string;
  reviewer_name: string;
  reviewer_state: string;
  reviewer_email?: string;
  rating: number;
  review_text: string;
  puppy_name?: string;
  is_approved: boolean;
  admin_reply?: string;
  created_at?: string;
}

export interface Application {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  home_type: string;
  has_yard: boolean;
  has_children: boolean;
  has_other_pets: boolean;
  other_pets_description?: string;
  experience_with_dogs: string;
  hunting_companion: boolean;
  family_pet: boolean;
  preferred_gender?: string;
  how_did_you_hear?: string;
  why_boykin?: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  is_read: boolean;
  created_at?: string;
}

export interface FacebookPost {
  id: string;
  content: string;
  image_url?: string;
  post_url?: string;
  likes?: number;
  posted_at?: string;
  created_at?: string;
}

export interface AdminProfile {
  id: string;
  kennel_name: string;
  tagline: string;
  bio: string;
  location: string;
  state: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  facebook_url?: string;
  instagram_url?: string;
  avatar_url?: string;
  years_breeding: number;
  puppies_placed: number;
  bss_registered: boolean;
  akc_registered: boolean;
  ukc_registered: boolean;
  updated_at?: string;
}
