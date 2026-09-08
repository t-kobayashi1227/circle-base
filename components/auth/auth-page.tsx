import type { ReactNode } from "react";
import { AuthHeader } from "./auth-header";
import { AuthHero } from "./auth-hero";
import { AuthTabs } from "./auth-tabs";
import { MinorNotice } from "./minor-notice";
import { AuthFooter } from "./auth-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";

export function AuthPage({ activeTab, children }: { activeTab: "login" | "signup"; children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-surface text-cb-ink">
      <AuthHeader />

      <main className="flex-1 lg:grid lg:grid-cols-[minmax(0,1fr)_490px] lg:items-stretch">
        <AuthHero />

        <div className="lg:flex lg:h-full lg:flex-col">
          <div className="mx-3.5 mt-5 flex min-h-[740px] flex-col border border-cb-border bg-white px-[18px] pb-[22px] shadow-[0_8px_24px_rgba(120,90,40,.09)] lg:mx-0 lg:mt-0 lg:h-full lg:min-h-[880px] lg:flex-1 lg:px-[30px] lg:pb-[26px] lg:shadow-[0_14px_40px_rgba(120,90,40,.12)]">
            <AuthTabs active={activeTab} />
            {children}
            <MinorNotice className="mt-6 hidden lg:flex" />
          </div>
        </div>

        <MinorNotice className="mx-3.5 mb-5 mt-4 flex lg:hidden" />
      </main>

      <AuthFooter />
      <MobileBottomNav activeHref="/circles" />
    </div>
  );
}
