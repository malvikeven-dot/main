"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();

  const sections = [
    {
      title: t.footer.product,
      links: [
        { label: t.footer.links.features, href: "/products" },
        { label: t.footer.links.pricing, href: "/pricing" },
        { label: t.footer.links.api, href: "/products#api" },
        { label: t.footer.links.business, href: "/products#business" },
      ],
    },
    {
      title: t.footer.company,
      links: [
        { label: t.footer.links.about, href: "/about" },
        { label: t.footer.links.blog, href: "#" },
        { label: t.footer.links.careers, href: "#" },
        { label: t.footer.links.contact, href: "#" },
      ],
    },
    {
      title: t.footer.legal,
      links: [
        { label: t.footer.links.privacy, href: "#" },
        { label: t.footer.links.terms, href: "#" },
        { label: t.footer.links.compliance, href: "#" },
        { label: t.footer.links.aml, href: "#" },
      ],
    },
  ];

  return (
    <footer className="border-t border-white/5 bg-navy-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-bold text-lg text-white">Malvik</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs font-medium">Systems operational</span>
            </div>
          </div>

          {/* Link sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/40 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compliance */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-white/25 text-xs leading-relaxed max-w-4xl mb-4">
            {t.footer.compliance}
          </p>
          <p className="text-white/30 text-xs">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
