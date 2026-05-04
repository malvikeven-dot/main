// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export interface Transaction {
    id?: string;
    user_address: string;
    to_address: string;
    amount: string;
    token: string;
    tx_hash: string;
    created_at?: string;
}
export async function saveTransaction(tx: Transaction): Promise<void> {
    const { error } = await supabase.from("transactions").insert(tx);
    if (error) console.error("Supabase insert error:", error);
}
export async function getTransactions(userAddress: string): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_address", userAddress.toLowerCase())
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) { console.error("Supabase fetch error:", error); return []; }
    return data ?? [];
}
