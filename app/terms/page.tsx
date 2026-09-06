import type { Metadata } from "next";
import { SiteSearchHeader } from "@/components/site-search-header";
import { ListBreadcrumb } from "@/components/circles-list/list-breadcrumb";
import { LegalHero } from "@/components/legal/legal-hero";
import { LegalNavSidebar } from "@/components/legal/legal-nav-sidebar";
import { LegalArticles } from "@/components/legal/legal-articles";
import { LegalSkylineBanner } from "@/components/legal/legal-skyline-banner";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { termsArticles, termsIntro, termsLastUpdated } from "@/lib/legal-mock-data";

export const metadata: Metadata = {
  title: "利用規約",
};

export default function TermsPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <SiteSearchHeader />

      <main className="flex-1 bg-white">
        <div className="hidden lg:block">
          <ListBreadcrumb items={[{ label: "ホーム", href: "/" }]} current="利用規約" />
        </div>

        <LegalHero
          title="利用規約"
          description={"にいがたサークルベースをご利用いただく際のルールについてご説明します。\n安心してご利用いただくために、必ずお読みください。"}
        />

        <div className="px-[18px] pb-2 pt-4 lg:grid lg:grid-cols-[224px_minmax(0,1fr)] lg:gap-6 lg:px-7 lg:pb-2 lg:pt-[22px]">
          <LegalNavSidebar activeHref="/terms" />

          <div className="min-w-0 pb-2">
            <div className="text-right text-[10.5px] text-cb-placeholder lg:text-[11px]">
              最終更新日：{termsLastUpdated}
            </div>
            <p className="mt-3 text-xs leading-[1.9] text-[#4B453C] lg:mt-3.5 lg:text-[12.5px] lg:leading-[1.95]">
              {termsIntro}
            </p>

            <div className="mt-4 lg:mt-5">
              <LegalArticles articles={termsArticles} />
            </div>
          </div>
        </div>

        <LegalSkylineBanner />
      </main>

      <SiteFooter />
      <MobileBottomNav activeHref="/terms" />
    </div>
  );
}
