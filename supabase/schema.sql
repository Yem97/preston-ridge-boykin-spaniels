create extension if not exists "uuid-ossp";

-- Puppies table
create table puppies (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  gender text check (gender in ('male','female')) not null,
  age_weeks integer not null,
  color text not null,
  price_usd integer not null default 200,
  status text check (status in ('available','reserved','sold')) default 'available',
  description text,
  image_url text,
  is_featured boolean default false,
  litter_name text,
  created_at timestamptz default now()
);

-- Parents (studs and dams)
create table parents (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  gender text check (gender in ('male','female')) not null,
  role text check (role in ('stud','dam')) not null,
  color text not null,
  age_years integer,
  description text,
  image_url text,
  certifications text[] default '{}',
  health_tests text[] default '{}',
  created_at timestamptz default now()
);

-- Gallery
create table gallery (
  id uuid default uuid_generate_v4() primary key,
  title text,
  description text,
  image_url text not null,
  category text default 'general',
  created_at timestamptz default now()
);

-- Reviews
create table reviews (
  id uuid default uuid_generate_v4() primary key,
  reviewer_name text not null,
  reviewer_state text not null,
  reviewer_email text,
  rating integer check (rating between 1 and 5) not null,
  review_text text not null,
  puppy_name text,
  is_approved boolean default false,
  admin_reply text,
  created_at timestamptz default now()
);

-- Puppy Applications (formal process)
create table applications (
  id uuid default uuid_generate_v4() primary key,
  full_name text not null,
  email text not null,
  phone text not null,
  state text not null,
  city text not null,
  home_type text not null,
  has_yard boolean default false,
  has_children boolean default false,
  has_other_pets boolean default false,
  other_pets_description text,
  experience_with_dogs text not null,
  hunting_companion boolean default false,
  family_pet boolean default true,
  preferred_gender text,
  how_did_you_hear text,
  why_boykin text,
  status text check (status in ('pending','approved','rejected')) default 'pending',
  admin_notes text,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- Facebook posts
create table facebook_posts (
  id uuid default uuid_generate_v4() primary key,
  content text not null,
  image_url text,
  post_url text,
  likes integer default 0,
  posted_at timestamptz default now(),
  created_at timestamptz default now()
);

-- Admin profile
create table admin_profile (
  id uuid default uuid_generate_v4() primary key,
  kennel_name text default 'Preston Ridge Boykin Spaniels',
  tagline text default 'AKC · BSS · UKC Registered Boykin Spaniels',
  bio text default 'We are a family-run kennel dedicated to breeding healthy, well-socialized Boykin Spaniels for hunting and family life.',
  location text default 'USA',
  state text default 'USA',
  phone text,
  email text,
  whatsapp text,
  facebook_url text,
  instagram_url text,
  avatar_url text,
  years_breeding integer default 1,
  puppies_placed integer default 0,
  bss_registered boolean default true,
  akc_registered boolean default true,
  ukc_registered boolean default true,
  updated_at timestamptz default now()
);

insert into admin_profile (id) values (uuid_generate_v4());

-- RLS
alter table puppies enable row level security;
alter table parents enable row level security;
alter table gallery enable row level security;
alter table reviews enable row level security;
alter table applications enable row level security;
alter table facebook_posts enable row level security;
alter table admin_profile enable row level security;

create policy "Public read puppies" on puppies for select using (true);
create policy "Public read parents" on parents for select using (true);
create policy "Public read gallery" on gallery for select using (true);
create policy "Public read approved reviews" on reviews for select using (is_approved = true);
create policy "Public read facebook" on facebook_posts for select using (true);
create policy "Public read profile" on admin_profile for select using (true);
create policy "Public insert reviews" on reviews for insert with check (true);
create policy "Public insert applications" on applications for insert with check (true);
create policy "Admin all puppies" on puppies for all using (auth.role() = 'authenticated');
create policy "Admin all parents" on parents for all using (auth.role() = 'authenticated');
create policy "Admin all gallery" on gallery for all using (auth.role() = 'authenticated');
create policy "Admin all reviews" on reviews for all using (auth.role() = 'authenticated');
create policy "Admin all applications" on applications for all using (auth.role() = 'authenticated');
create policy "Admin all facebook" on facebook_posts for all using (auth.role() = 'authenticated');
create policy "Admin all profile" on admin_profile for all using (auth.role() = 'authenticated');
