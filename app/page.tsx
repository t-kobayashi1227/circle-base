import { SiteHeader } from "@/components/home/site-header";
import { HeroSection } from "@/components/home/hero-section";
import { CategoryGrid } from "@/components/home/category-grid";
import { NoticesSection } from "@/components/home/notices-section";
import { NewCirclesSection } from "@/components/home/new-circles-section";
import { CtaSection } from "@/components/home/cta-section";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { getCurrentUser } from "@/lib/auth";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <SiteHeader isLoggedIn={!!user} />
      <main className="flex-1">
        <HeroSection />
        <CategoryGrid />
        <NewCirclesSection />
        <NoticesSection />
        <CtaSection />
      </main>
      <SiteFooter />
      <MobileBottomNav />
    </div>
  );
}
