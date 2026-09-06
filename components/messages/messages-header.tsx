import { LoggedInHeaderNav } from "@/components/logged-in-header-nav";
import { MessagesMobileHeader } from "./messages-mobile-header";

export function MessagesHeader({ showMobileBar = true }: { showMobileBar?: boolean }) {
  return (
    <header
      className={`sticky top-0 z-20 bg-cb-header lg:border-b lg:border-[#F3ECE0] ${
        showMobileBar ? "border-b border-[#F3ECE0]" : ""
      }`}
    >
      <LoggedInHeaderNav ctaLabel="サークルを作成する" ctaHref="/mypage/circles/new" activeMessages />
      {showMobileBar ? <MessagesMobileHeader /> : null}
    </header>
  );
}
