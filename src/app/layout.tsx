import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { I18nProvider } from "@/lib/i18n";
import Web3Provider from "@/components/Web3Provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Malvik Corporation AS — Nordic Stablecoin Payments",
  description:
    "Send money globally in seconds. 0.3% flat fee. Powered by USDC and EURC on Base blockchain. Built in Norway, works everywhere.",
  keywords: [
    "stablecoin payments",
    "USDC",
    "EURC",
    "Norway",
    "fintech",
    "crypto payments",
    "Base blockchain",
    "international transfers",
  ],
  openGraph: {
    title: "Malvik Corporation AS — Nordic Stablecoin Payments",
    description: "Send money globally in seconds. 0.3% flat fee. Built in Norway.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignOutUrl="/"
    >
      <html lang="en" className={inter.variable}>
        <body className={`${inter.className} antialiased`}>
          <Web3Provider>
            <I18nProvider>{children}</I18nProvider>
          </Web3Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
