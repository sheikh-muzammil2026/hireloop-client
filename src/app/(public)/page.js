import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import JobRolesSection from "@/components/home/JobRolesSection";
import PricingSection from "@/components/home/PricingSection";
import StatsSection from "@/components/home/StatsSection";


export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection/>
      <StatsSection/>
      <JobRolesSection/>
      <FeaturesSection/>
      <PricingSection/>
    </div>
  );
}
