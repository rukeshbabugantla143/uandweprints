import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { BestSellers } from "@/components/home/BestSellers";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PrintingBanner } from "@/components/home/PrintingBanner";
import { ReviewSection } from "@/components/home/ReviewSection";
import { InstagramFeed } from "@/components/home/InstagramFeed";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <CategoryGrid />
      <BestSellers />
      <HowItWorks />
      <PrintingBanner />
      <ReviewSection />
      <InstagramFeed />
    </div>
  );
}
