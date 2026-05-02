import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ProblemSolution from "@/components/ProblemSolution";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import B2BCallout from "@/components/B2BCallout";
import SecuritySection from "@/components/SecuritySection";
import WaitlistCTA from "@/components/WaitlistCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-navy-900">
      <Navbar />
      <HeroSection />
      <TrustBar />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <B2BCallout />
      <SecuritySection />
      <WaitlistCTA />
      <Footer />
    </main>
  );
}
