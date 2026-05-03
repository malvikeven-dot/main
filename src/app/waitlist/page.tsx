import WaitlistPageContent from "@/components/WaitlistPageContent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Join the Waitlist — Malvik Corporation AS",
  description: "Be among the first to access Malvik. Sign up for early access to the Nordic stablecoin payment platform.",
};

export default function WaitlistPage() {
  return (
    <main className="min-h-screen bg-navy-900">
      <Navbar />
      <WaitlistPageContent />
      <Footer />
    </main>
  );
}
