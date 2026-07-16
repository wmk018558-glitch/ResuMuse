import { Hero } from "./components/Hero";
import { StatsBar } from "./components/StatsBar";
import { AppPeek } from "./components/AppPeek";
import { FeatureGrid } from "./components/FeatureGrid";
import { Step } from "./components/Step";
import { Testimonials } from "./components/Testimonials";
export default function LandingPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Hero />
      <StatsBar />
      <AppPeek />
      <FeatureGrid />

      <Step />

      <Testimonials />

    </div>
  );
}
