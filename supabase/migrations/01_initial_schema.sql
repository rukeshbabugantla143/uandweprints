-- U and We Prints Initial Database Migration for Supabase
-- Covers E-Commerce, Customization Fields, Printing Quotations, Orders, and Security Rules

-- 1. Profiles Table (Customers & Admins)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  role text default 'customer' check (role in ('customer', 'admin', 'staff')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Categories Table
create table if not exists public.categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  display_order int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Products Table
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text unique not null,
  tagline text,
  description text,
  base_price numeric(10,2) not null,
  original_price numeric(10,2),
  discount_percentage int,
  is_featured boolean default false,
  is_bestseller boolean default false,
  is_under_500 boolean default false,
  turnaround_time text default '24-48 Hours',
  in_stock boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Product Customization Fields (Per Product Configurable)
create table if not exists public.product_customization_fields (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  field_label text not null,
  field_type text not null check (field_type in ('text', 'textarea', 'image', 'date')),
  is_required boolean default false,
  help_text text,
  display_order int default 0
);

-- 5. Orders Table
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  order_reference text unique not null,
  user_id uuid references public.profiles(id) on delete set null,
  customer_name text not null,
  phone text not null,
  email text,
  delivery_type text default 'delivery' check (delivery_type in ('delivery', 'pickup')),
  address text,
  city text default 'Kurnool',
  state text default 'Andhra Pradesh',
  pincode text,
  order_notes text,
  subtotal numeric(10,2) not null,
  discount numeric(10,2) default 0,
  shipping numeric(10,2) default 0,
  total numeric(10,2) not null,
  payment_method text not null check (payment_method in ('razorpay', 'cod')),
  payment_status text default 'pending' check (payment_status in ('pending', 'paid', 'failed')),
  order_status text default 'Confirmed' check (order_status in ('Pending', 'Confirmed', 'Design Review', 'In Production', 'Shipped', 'Delivered', 'Cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Order Items Table
create table if not exists public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  unit_price numeric(10,2) not null,
  quantity int not null default 1,
  selected_options jsonb default '{}'::jsonb,
  customization_values jsonb default '{}'::jsonb,
  uploaded_image_url text
);

-- 7. Printing Quotations & Custom Enquiries
create table if not exists public.printing_enquiries (
  id uuid default gen_random_uuid() primary key,
  customer_name text not null,
  phone text not null,
  email text,
  service_name text not null,
  quantity text not null,
  dimensions text,
  material text,
  design_file_url text,
  delivery_location text,
  notes text,
  status text default 'New' check (status in ('New', 'Contacted', 'Quoted', 'Approved', 'Completed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. Row Level Security Policies (RLS)
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.printing_enquiries enable row level security;

-- Public read access for catalog
create policy "Categories are viewable by everyone" on public.categories for select using (true);
create policy "Products are viewable by everyone" on public.products for select using (true);

-- Customer orders access
create policy "Users can view their own orders" on public.orders for select using (auth.uid() = user_id or user_id is null);
create policy "Anyone can insert an order" on public.orders for insert with check (true);
create policy "Anyone can insert order items" on public.order_items for insert with check (true);
create policy "Anyone can insert printing enquiries" on public.printing_enquiries for insert with check (true);

