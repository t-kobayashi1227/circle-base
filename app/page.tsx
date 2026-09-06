import { SiteHeader } from "@/components/home/site-header";
import { HeroSection } from "@/components/home/hero-section";
import { CategoryGrid } from "@/components/home/category-grid";
import { NewCirclesSection } from "@/components/home/new-circles-section";
import { FeaturesSection } from "@/components/home/features-section";
import { CtaSection } from "@/components/home/cta-section";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <CategoryGrid />
        <NewCirclesSection />
        <FeaturesSection />
        <CtaSection />
      </main>
      <SiteFooter />
      <MobileBottomNav />
    </div>
  );
}
