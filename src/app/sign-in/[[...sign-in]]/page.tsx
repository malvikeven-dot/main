import { SignIn } from "@clerk/nextjs";
import { Zap } from "lucide-react";
import Link from "next/link";

const clerkAppearance = {
  variables: {
    colorBackground: "#0d1235",
    colorInputBackground: "rgba(255,255,255,0.05)",
    colorInputText: "#ffffff",
    colorText: "#ffffff",
    colorTextSecondary: "rgba(255,255,255,0.5)",
    colorPrimary: "#2D6AFF",
    colorDanger: "#f87171",
    borderRadius: "12px",
    fontFamily: "inherit",
  },
  elements: {
    card: "bg-transparent shadow-none border-0 !p-0",
    rootBox: "w-full",
    formButtonPrimary:
      "bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all",
    formFieldInput:
      "bg-white/5 border border-white/15 text-white placeholder-white/30 rounded-xl focus:ring-2 focus:ring-blue-500/50",
    footerActionLink: "text-blue-400 hover:text-blue-300",
    identityPreviewText: "text-white",
    identityPreviewEditButton: "text-blue-400",
    dividerLine: "bg-white/10",
    dividerText: "text-white/30",
    socialButtonsBlockButton:
      "border border-white/15 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all",
    socialButtonsBlockButtonText: "text-white/80",
    headerTitle: "text-white",
    headerSubtitle: "text-white/50",
  },
};

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-navy-900 bg-grid flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center glow-blue">
            <Zap className="w-4.5 h-4.5 text-white fill-white" />
          </div>
          <span className="font-bold text-white text-xl">Malvik</span>
        </div>

        {/* Card wrapper */}
        <div className="glass rounded-3xl border border-white/10 p-8">
          <SignIn
            appearance={clerkAppearance}
            signUpUrl="/sign-up"
            fallbackRedirectUrl="/dashboard"
          />
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          <Link href="/" className="hover:text-white/60 transition-colors">← Back to site</Link>
        </p>
      </div>
    </div>
  );
}
