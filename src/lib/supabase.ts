import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/** Browser-safe client — anon key only */
export const supabaseBrowser = () => createClient(supabaseUrl, supabaseAnonKey);

/** Server-only client — service role, bypasses RLS. Never import in "use client" files. */
export const supabaseAdmin = () => createClient(supabaseUrl, supabaseServiceKey);
