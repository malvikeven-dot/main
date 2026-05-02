import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";

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
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
