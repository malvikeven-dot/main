"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function WaitlistForm() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center gap-3 glass-blue rounded-2xl px-6 py-4 border border-blue-500/30"
        >
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          <span className="text-white font-medium">
            You&apos;re on the list!
          </span>
        </motion.div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.cta.placeholder}
            className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            required
          />
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            disabled={status === "loading"}
            className="btn-primary flex items-center justify-center gap-2 px-6 py-3 whitespace-nowrap disabled:opacity-70"
          >
            {status === "loading" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                {t.cta.button}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </div>
      )}
    </form>
  );
}
