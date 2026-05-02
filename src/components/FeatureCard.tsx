"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
  accent?: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  index = 0,
  accent = "blue",
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="glass rounded-2xl p-8 group cursor-default border border-white/5 hover:border-blue-500/30 transition-all duration-300"
    >
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300",
          "bg-blue-500/10 group-hover:bg-blue-500/20"
        )}
      >
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
      <h3 className="text-white font-bold text-xl mb-3">{title}</h3>
      <p className="text-white/50 leading-relaxed">{description}</p>
    </motion.div>
  );
}
