import type { Metadata } from "next";
import { SiteSearchHeader } from "@/components/site-search-header";
import { ListBreadcrumb } from "@/components/circles-list/list-breadcrumb";
import { LegalHero } from "@/components/legal/legal-hero";
import { ContactForm } from "@/components/mypage/contact-form";
import { ContactResponseNotice } from "@/components/mypage/contact-response-notice";
import { LegalSkylineBanner } from "@/components/legal/legal-skyline-banner";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";

export const metadata: Metadata = {
  title: "お問い合わせ",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <SiteSearchHeader />

      <main className="flex-1 bg-white">
        <div className="hidden lg:block">
          <ListBreadcrumb items={[{ label: "ホーム", href: "/" }]} current="お問い合わせ" />
        </div>

        <LegalHero
          title="お問い合わせ"
          description={"サービスに関するご質問やご要望など、お気軽にお問い合わせください。\nできる限り迅速にご回答いたします。"}
        />

        <div className="mt-4 flex flex-col gap-4 px-[18px] pb-6 lg:mt-6 lg:px-7 lg:pb-7">
          <ContactForm />
          <ContactResponseNotice />
        </div>

        <LegalSkylineBanner />
      </main>

      <SiteFooter />
      <MobileBottomNav activeHref="/contact" />
    </div>
  );
}
