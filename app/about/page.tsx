import type { Metadata } from "next";
import { SiteSearchHeader } from "@/components/site-search-header";
import { ListBreadcrumb } from "@/components/circles-list/list-breadcrumb";
import { AboutHero } from "@/components/about/about-hero";
import { AboutFeatures } from "@/components/about/about-features";
import { AboutStats } from "@/components/about/about-stats";
import { AboutCta } from "@/components/about/about-cta";
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
        <AboutFeatures />
        <AboutStats />
        <AboutCta />
      </main>

      <SiteFooter />
      <MobileBottomNav activeHref="/about" />
    </div>
  );
}
