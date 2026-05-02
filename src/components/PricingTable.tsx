"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  ctaHref: string;
  highlight?: boolean;
  badge?: string;
}

interface PricingTableProps {
  tiers: PricingTier[];
}

export default function PricingTable({ tiers }: PricingTableProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tiers.map((tier, i) => (
        <motion.div
          key={tier.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className={cn(
            "relative rounded-2xl p-8 flex flex-col",
            tier.highlight
              ? "glass-blue border border-blue-500/40 glow-blue-sm"
              : "glass border border-white/10"
          )}
        >
          {tier.badge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
              {tier.badge}
            </div>
          )}

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              {tier.highlight && (
                <Zap className="w-4 h-4 text-blue-400 fill-blue-400" />
              )}
              <h3 className="text-white font-bold text-xl">{tier.name}</h3>
            </div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-4xl font-extrabold text-white">{tier.price}</span>
              {tier.period && (
                <span className="text-white/40 text-sm">{tier.period}</span>
              )}
            </div>
            <p className="text-white/50 text-sm">{tier.description}</p>
          </div>

          <ul className="space-y-3 mb-8 flex-1">
            {tier.features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-blue-400" />
                </div>
                <span className="text-white/70 text-sm">{f}</span>
              </li>
            ))}
          </ul>

          <Link
            href={tier.ctaHref}
            className={cn(
              "block text-center font-semibold py-3 rounded-xl transition-all duration-200",
              tier.highlight
                ? "btn-primary"
                : "btn-secondary border border-white/15"
            )}
          >
            {tier.cta}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
