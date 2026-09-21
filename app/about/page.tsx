import type { Metadata } from "next";
import { SiteSearchHeader } from "@/components/site-search-header";
import { ListBreadcrumb } from "@/components/circles-list/list-breadcrumb";
import { AboutHero } from "@/components/about/about-hero";
import { AboutFeatures } from "@/components/about/about-features";
import { AboutStats } from "@/components/about/about-stats";
import { AboutCta } from "@/components/about/about-cta";
import { LegalNavSidebar } from "@/components/legal/legal-nav-sidebar";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";

export const metadata: Metadata = {
  title: "サイト概要",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <SiteSearchHeader />

      <main className="flex-1 bg-white">
        <div className="hidden lg:block">
          <ListBreadcrumb items={[{ label: "ホーム", href: "/" }]} current="サイト概要" />
        </div>

        <AboutHero />

        <div className="px-[18px] pb-2 lg:grid lg:grid-cols-[224px_minmax(0,1fr)] lg:gap-6 lg:px-7 lg:pb-2">
          <LegalNavSidebar activeHref="/about" />

          <div className="min-w-0">
            <AboutFeatures />
            <AboutStats />
          </div>
        </div>

        <AboutCta />
      </main>

      <SiteFooter />
      <MobileBottomNav activeHref="/about" />
    </div>
  );
}
