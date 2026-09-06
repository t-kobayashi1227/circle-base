import { LoggedInHeaderNav } from "@/components/logged-in-header-nav";
import { MessagesMobileHeader } from "@/components/messages/messages-mobile-header";

// このページのモバイルヘッダーは通知・メニューのみ（メッセージアイコンなし）で、
// メッセージ画面のモバイルトップバーと同一構成のため共有する。
export function ProfileEditHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#F3ECE0] bg-cb-header">
      <LoggedInHeaderNav ctaLabel="サークルを作成する" ctaHref="/mypage/circles/new" />
      <MessagesMobileHeader />
    </header>
  );
}
