import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaitlistCTA from "@/components/WaitlistCTA";
import ProductsPageContent from "@/components/ProductsPageContent";

export const metadata = {
  title: "Product — Malvik Corporation AS",
  description: "Stablecoin payment tools for Norwegian businesses and consumers. B2B API, consumer wallet, multi-currency.",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-navy-900">
      <Navbar />
      <ProductsPageContent />
      <WaitlistCTA />
      <Footer />
    </main>
  );
}
