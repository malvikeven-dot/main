"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, LayoutDashboard } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { t, locale, setLocale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t.nav.product, href: "/products" },
    { label: t.nav.pricing, href: "/pricing" },
    { label: t.nav.about, href: "/about" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "py-3 glass border-b border-white/5"
            : "py-5 bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center glow-blue-sm group-hover:glow-blue transition-all duration-200">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                Malvik
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-3">
              {/* Language toggle */}
              <button
                onClick={() => setLocale(locale === "en" ? "no" : "en")}
                className="text-xs font-semibold text-white/60 hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-white/10 border border-white/10"
              >
                {locale === "en" ? "NO" : "EN"}
              </button>

              <SignedOut>
                <Link
                  href="/sign-in"
                  className="text-sm text-white/70 hover:text-white transition-colors font-medium"
                >
                  Sign in
                </Link>
                <Link href="/sign-up" className="btn-primary text-sm">
                  Sign up
                </Link>
              </SignedOut>

              <SignedIn>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors font-medium"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 rounded-xl",
                      userButtonTrigger: "focus:ring-0 focus:ring-offset-0",
                    },
                  }}
                />
              </SignedIn>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white/80 hover:text-white"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 glass border-b border-white/10 px-4 py-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white/80 hover:text-white text-lg font-medium py-2 border-b border-white/10"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setLocale(locale === "en" ? "no" : "en")}
                  className="text-sm font-semibold text-white/60 hover:text-white border border-white/20 px-3 py-1.5 rounded-lg"
                >
                  {locale === "en" ? "Norsk" : "English"}
                </button>
                <SignedOut>
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileOpen(false)}
                    className="btn-secondary text-sm px-4 py-2 border border-white/20"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary text-sm flex-1 text-center"
                  >
                    Sign up
                  </Link>
                </SignedOut>
                <SignedIn>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary text-sm flex-1 text-center flex items-center justify-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <UserButton
                    appearance={{
                      elements: { avatarBox: "w-8 h-8 rounded-xl" },
                    }}
                  />
                </SignedIn>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
