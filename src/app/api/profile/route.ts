import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";

const SEED_TRANSACTIONS = [
  { type: "sent",     label: "Invoice — Acme GmbH",         amount: 2500, currency: "NOKS", flag: "🇩🇪" },
  { type: "received", label: "Payment — Bergström AB",       amount: 8000, currency: "NOKS", flag: "🇸🇪" },
  { type: "sent",     label: "Supplier — Manila Logistics",  amount: 1250, currency: "NOKS", flag: "🇵🇭" },
  { type: "received", label: "Top-up from DNB",              amount: 5000, currency: "NOKS", flag: "🇳🇴" },
  { type: "sent",     label: "Freelancer — Priya Sharma",    amount:  900, currency: "NOKS", flag: "🇮🇳" },
  { type: "sent",     label: "Office supplies — Amazon",     amount:  350, currency: "NOKS", flag: "🇩🇪" },
];

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = supabaseAdmin();

  const { data: existing } = await db
    .from("profiles")
    .select("id, clerk_user_id, email, display_name, noks_balance")
    .eq("clerk_user_id", userId)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ profile: existing });
  }

  // First visit — create profile from Clerk user data
  const clerkUser = await currentUser();
  const { data: profile, error } = await db
    .from("profiles")
    .insert({
      clerk_user_id: userId,
      email: clerkUser?.primaryEmailAddress?.emailAddress ?? null,
      display_name: clerkUser?.firstName ?? null,
    })
    .select()
    .single();

  if (error || !profile) {
    return NextResponse.json({ error: "Could not create profile" }, { status: 500 });
  }

  // Seed mock transactions with staggered timestamps (6 h apart)
  const now = Date.now();
  await db.from("transactions").insert(
    SEED_TRANSACTIONS.map((tx, i) => ({
      profile_id: profile.id,
      ...tx,
      created_at: new Date(now - i * 6 * 60 * 60 * 1000).toISOString(),
    }))
  );

  return NextResponse.json({ profile, seeded: true });
}
