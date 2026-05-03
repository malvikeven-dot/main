"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Building2, User, Mail, Briefcase } from "lucide-react";
import { useI18n } from "@/lib/i18n";

type UseCase = "personal" | "smb" | "enterprise" | "developer" | "other";

const useCases: { value: UseCase; label: string; labelNo: string }[] = [
  { value: "personal", label: "Personal transfers & remittances", labelNo: "Personlige overføringer" },
  { value: "smb", label: "Small business payments", labelNo: "Betalinger for små bedrifter" },
  { value: "enterprise", label: "Enterprise / high-volume payments", labelNo: "Store bedrifter / høyt volum" },
  { value: "developer", label: "Building on the API", labelNo: "Bygge på API-et" },
  { value: "other", label: "Just exploring", labelNo: "Bare utforsker" },
];

interface FormData {
  name: string;
  email: string;
  company: string;
  useCase: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: d } }),
};

export default function WaitlistPageContent() {
  const { locale } = useI18n();
  const isEn = locale === "en";

  const [form, setForm] = useState<FormData>({ name: "", email: "", company: "", useCase: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = isEn ? "Name is required" : "Navn er påkrevd";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = isEn ? "Valid email required" : "Gyldig e-post påkrevd";
    if (!form.useCase) e.useCase = isEn ? "Please select a use case" : "Velg et brukstilfelle";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
    } catch {
      setErrors({ email: isEn ? "Something went wrong, please try again." : "Noe gikk galt, prøv igjen." });
      setStatus("idle");
    }
  };

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((err) => ({ ...err, [field]: undefined }));
  };

  const inputClass = (hasError: boolean) =>
    `w-full bg-white/5 border ${hasError ? "border-red-500/60" : "border-white/15"} rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm`;

  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(45,106,255,0.1) 0%, transparent 70%)" }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: copy */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
              {isEn ? "Early access" : "Tidlig tilgang"}
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 mb-6 leading-tight">
              {isEn ? "Be first to the future of payments." : "Bli først til fremtidens betalinger."}
            </h1>
            <p className="text-white/50 text-lg mb-10 leading-relaxed">
              {isEn
                ? "We're onboarding our first users in early 2025. Join the waitlist to get priority access, shape our roadmap, and lock in founding member pricing."
                : "Vi åpner for de første brukerne tidlig 2025. Bli med på ventelisten for prioritert tilgang og grunnleggerpriser."}
            </p>

            {/* Perks */}
            <div className="space-y-4">
              {[
                { icon: "🚀", en: "Priority access before public launch", no: "Prioritert tilgang før offentlig lansering" },
                { icon: "💰", en: "Founding member pricing — locked forever", no: "Grunnleggerpriser — låst for alltid" },
                { icon: "🗺️", en: "Direct input on our product roadmap", no: "Direkte innflytelse på produktets veikart" },
                { icon: "🤝", en: "Dedicated onboarding support", no: "Dedikert onboardingstøtte" },
              ].map((p) => (
                <motion.div
                  key={p.en}
                  custom={0.1}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  className="flex items-center gap-3"
                >
                  <span className="text-xl">{p.icon}</span>
                  <span className="text-white/70 text-sm">{isEn ? p.en : p.no}</span>
                </motion.div>
              ))}
            </div>

            {/* Social proof */}
            <motion.div
              custom={0.3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-10 glass rounded-2xl p-5 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex -space-x-2">
                  {["AB", "KL", "MN", "TO"].map((av) => (
                    <div key={av} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-xs font-bold text-white border-2 border-navy-900">
                      {av}
                    </div>
                  ))}
                </div>
                <span className="text-white/60 text-sm">
                  <span className="text-white font-semibold">247</span>{" "}
                  {isEn ? "people on the waitlist" : "på ventelisten"}
                </span>
              </div>
              <p className="text-white/40 text-xs">
                {isEn ? "From Oslo, Bergen, Stockholm and beyond." : "Fra Oslo, Bergen, Stockholm og videre."}
              </p>
            </motion.div>
          </motion.div>

          {/* Right: form */}
          <motion.div custom={0.15} initial="hidden" animate="visible" variants={fadeUp}>
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-blue rounded-3xl p-10 border border-blue-500/30 text-center glow-blue"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-white mb-3">
                    {isEn ? "You're on the list!" : "Du er på listen!"}
                  </h2>
                  <p className="text-white/60 mb-6">
                    {isEn
                      ? "We'll be in touch as soon as early access opens. Keep an eye on your inbox."
                      : "Vi tar kontakt så snart tidlig tilgang åpner. Hold øye med innboksen din."}
                  </p>
                  <div className="glass rounded-xl p-4 text-left space-y-2">
                    <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-3">
                      {isEn ? "Your details" : "Dine detaljer"}
                    </p>
                    <p className="text-white/70 text-sm"><span className="text-white/40">Name:</span> {form.name}</p>
                    <p className="text-white/70 text-sm"><span className="text-white/40">Email:</span> {form.email}</p>
                    {form.company && <p className="text-white/70 text-sm"><span className="text-white/40">Company:</span> {form.company}</p>}
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="glass rounded-3xl p-8 sm:p-10 border border-white/10 space-y-5"
                >
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">
                      {isEn ? "Request early access" : "Be om tidlig tilgang"}
                    </h2>
                    <p className="text-white/40 text-sm">
                      {isEn ? "Takes 30 seconds. No credit card needed." : "Tar 30 sekunder. Inget kredittkort trengs."}
                    </p>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="flex items-center gap-1.5 text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">
                      <User className="w-3.5 h-3.5" />
                      {isEn ? "Full name" : "Fullt navn"} *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={set("name")}
                      placeholder={isEn ? "Kari Nordmann" : "Kari Nordmann"}
                      className={inputClass(!!errors.name)}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="flex items-center gap-1.5 text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">
                      <Mail className="w-3.5 h-3.5" />
                      {isEn ? "Work email" : "Jobb-e-post"} *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="kari@bedrift.no"
                      className={inputClass(!!errors.email)}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Company */}
                  <div>
                    <label className="flex items-center gap-1.5 text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">
                      <Building2 className="w-3.5 h-3.5" />
                      {isEn ? "Company (optional)" : "Bedrift (valgfritt)"}
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={set("company")}
                      placeholder={isEn ? "Acme AS" : "Acme AS"}
                      className={inputClass(false)}
                    />
                  </div>

                  {/* Use case */}
                  <div>
                    <label className="flex items-center gap-1.5 text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">
                      <Briefcase className="w-3.5 h-3.5" />
                      {isEn ? "Primary use case" : "Primært brukstilfelle"} *
                    </label>
                    <select
                      value={form.useCase}
                      onChange={set("useCase")}
                      className={`${inputClass(!!errors.useCase)} appearance-none cursor-pointer`}
                    >
                      <option value="" disabled style={{ background: "#0A0F2C" }}>
                        {isEn ? "Select one…" : "Velg ett…"}
                      </option>
                      {useCases.map((u) => (
                        <option key={u.value} value={u.value} style={{ background: "#0A0F2C" }}>
                          {isEn ? u.label : u.labelNo}
                        </option>
                      ))}
                    </select>
                    {errors.useCase && <p className="text-red-400 text-xs mt-1">{errors.useCase}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.98 }}
                    disabled={status === "loading"}
                    className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-base disabled:opacity-70"
                  >
                    {status === "loading" ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {isEn ? "Join the waitlist" : "Bli med på ventelisten"}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>

                  <p className="text-white/25 text-xs text-center">
                    {isEn
                      ? "No spam. We'll only contact you about early access."
                      : "Ingen spam. Vi kontakter deg kun om tidlig tilgang."}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
