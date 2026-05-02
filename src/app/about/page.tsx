import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaitlistCTA from "@/components/WaitlistCTA";
import AboutPageContent from "@/components/AboutPageContent";

export const metadata = {
  title: "About — Malvik Corporation AS",
  description: "We're building the Nordic payment infrastructure for the stablecoin era. Based in Norway.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-navy-900">
      <Navbar />
      <AboutPageContent />
      <WaitlistCTA />
      <Footer />
    </main>
  );
}
