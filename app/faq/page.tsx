import type { Metadata } from "next";
import { SiteSearchHeader } from "@/components/site-search-header";
import { ListBreadcrumb } from "@/components/circles-list/list-breadcrumb";
import { LegalHero } from "@/components/legal/legal-hero";
import { FaqBrowser } from "@/components/faq/faq-browser";
import { FaqContactCta } from "@/components/faq/faq-contact-cta";
import { LegalSkylineBanner } from "@/components/legal/legal-skyline-banner";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { faqCategories, faqItems } from "@/lib/legal-mock-data";

export const metadata: Metadata = {
  title: "よくあるご質問",
};

export default function FaqPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <SiteSearchHeader />

      <main className="flex-1 bg-white">
        <ListBreadcrumb items={[{ label: "ホーム", href: "/" }]} current="よくあるご質問" />

        <LegalHero title="よくあるご質問" kicker="FAQ" />

        <section className="px-[18px] pb-6 pt-4 lg:px-8 lg:pb-8 lg:pt-[22px]">
          <p className="mx-auto max-w-[640px] text-center text-xs leading-[1.9] text-[#4B453C] lg:text-[13.5px]">
            よくいただくご質問をまとめました。
            <br />
            お探しの内容が見つからない場合は、
            <br className="lg:hidden" />
            お問い合わせフォームよりご連絡ください。
          </p>

          <div className="mt-4 lg:mt-[22px]">
            <FaqBrowser categories={faqCategories} items={faqItems} />
          </div>

          <FaqContactCta />
        </section>

        <LegalSkylineBanner />
      </main>

      <SiteFooter />
      <MobileBottomNav activeHref="/faq" />
    </div>
  );
}
