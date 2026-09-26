import type { Metadata } from "next";
import { MenuAvatarHeader } from "@/components/mypage/menu-avatar-header";
import { MypageNavSidebar } from "@/components/mypage/mypage-nav-sidebar";
import { ContactForm } from "@/components/mypage/contact-form";
import { ContactResponseNotice } from "@/components/mypage/contact-response-notice";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";

export const metadata: Metadata = {
  title: "お問い合わせ",
};

export default function MypageContactPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <MenuAvatarHeader />

      <div className="lg:grid lg:grid-cols-[246px_minmax(0,1fr)] lg:items-start">
        <div className="hidden flex-col gap-[34px] border-r border-cb-border bg-cb-header py-4 lg:flex">
          <MypageNavSidebar activeHref="/mypage/contact" />
        </div>

        <div className="min-w-0">
          <div className="bg-cb-header px-[18px] pb-4 pt-4 lg:bg-transparent lg:px-6 lg:pb-0 lg:pt-6">
            <h1 className="font-heading text-[22px] font-bold text-[#2F2B24] lg:text-[26px]">お問い合わせ</h1>
            <p className="mt-2 text-[11.5px] leading-[1.7] text-cb-muted-2 lg:mt-2.5 lg:text-[12.5px] lg:leading-normal">
              サービスに関するご質問やご要望など、お気軽にお問い合わせください。
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-4 px-3.5 pb-6 lg:mt-5 lg:px-6 lg:pb-7">
            <ContactForm />
            <ContactResponseNotice />
          </div>

          <div className="hidden pb-6 text-center text-[11px] text-cb-muted-3 lg:block">
            © 2024 にいがたサークルベース
          </div>
        </div>
      </div>

      <MobileBottomNav activeHref="/mypage" />
    </div>
  );
}
