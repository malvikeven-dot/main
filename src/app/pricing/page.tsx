import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaitlistCTA from "@/components/WaitlistCTA";
import PricingPageContent from "@/components/PricingPageContent";

export const metadata = {
  title: "Pricing — Malvik Corporation AS",
  description: "Simple, transparent pricing. 0.3% per transaction. No monthly fees, no hidden charges.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-navy-900">
      <Navbar />
      <PricingPageContent />
      <WaitlistCTA />
      <Footer />
    </main>
  );
}
