import { createClient } from '@supabase/supabase-js';

const env = import.meta.env ?? {};

const supabaseUrl = env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = env.VITE_SUPABASE_PUBLISHABLE_KEY || 'placeholder-anon-key';

if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_PUBLISHABLE_KEY) {
  console.warn(
    'Missing Supabase environment variables. Using placeholder values. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in .env.local.'
  );
}

// Client for the frontend to connect to the database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

