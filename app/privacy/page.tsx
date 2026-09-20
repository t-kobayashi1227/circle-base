import type { Metadata } from "next";
import { SiteSearchHeader } from "@/components/site-search-header";
import { ListBreadcrumb } from "@/components/circles-list/list-breadcrumb";
import { PrivacyHero } from "@/components/legal/privacy-hero";
import { LegalNavSidebar } from "@/components/legal/legal-nav-sidebar";
import { LegalArticles } from "@/components/legal/legal-articles";
import { LegalSkylineBanner } from "@/components/legal/legal-skyline-banner";
import { PrivacyClosingNote } from "@/components/legal/privacy-closing-note";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { privacyArticles, privacyIntro, privacyLastUpdated } from "@/lib/legal-mock-data";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <SiteSearchHeader />

      <main className="flex-1 bg-white">
        <ListBreadcrumb items={[{ label: "ホーム", href: "/" }]} current="プライバシーポリシー" />

        <PrivacyHero
          title="プライバシーポリシー"
          description={"にいがたサークルベースは、ユーザーの皆さまの個人情報を適切に取り扱い、\n安心してご利用いただけるサービスを目指します。"}
        />

        <div className="px-[18px] lg:hidden">
          <div className="mt-3.5 rounded-full border border-[#EFE7DA] px-3.5 py-2 text-center text-[11px] text-cb-muted-2">
            最終更新日：{privacyLastUpdated}
          </div>
        </div>

        <div className="px-[18px] pb-2 pt-4 lg:grid lg:grid-cols-[224px_minmax(0,1fr)] lg:gap-6 lg:px-7 lg:pb-2 lg:pt-[22px]">
          <LegalNavSidebar activeHref="/privacy" />

          <div className="relative min-w-0 pb-2">
            <div className="hidden text-right text-[11px] text-cb-placeholder lg:block">
              最終更新日：{privacyLastUpdated}
            </div>
            <p className="mt-3 max-w-[760px] text-xs leading-[1.9] text-[#4B453C] lg:mt-3.5 lg:text-[12.5px] lg:leading-[1.95]">
              {privacyIntro}
            </p>

            <div className="mt-4 max-w-[820px] lg:mt-5">
              <LegalArticles articles={privacyArticles} mobileAccordion />
            </div>

            <PrivacyClosingNote />
          </div>
        </div>

        <LegalSkylineBanner />
      </main>

      <SiteFooter />
      <MobileBottomNav activeHref="/privacy" />
    </div>
  );
}
