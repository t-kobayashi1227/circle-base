import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MenuAvatarHeader } from "@/components/mypage/menu-avatar-header";
import { MypageNavSidebar } from "@/components/mypage/mypage-nav-sidebar";
import { AccountInfoCard } from "@/components/mypage/account-info-card";
import { PasswordChangeCard } from "@/components/mypage/password-change-card";
import { NotificationSettingsCard } from "@/components/mypage/notification-settings-card";
import { AccountDeleteCard } from "@/components/mypage/account-delete-card";
import { SecurityNoticeBanner } from "@/components/mypage/security-notice-banner";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { getCurrentUser } from "@/lib/auth";
import { getAccountInfo, getNotificationSettings } from "@/lib/mypage";

export const metadata: Metadata = {
  title: "アカウント設定",
};

export default async function AccountSettingsPage() {
  const user = await getCurrentUser();
  if (!user) notFound();

  const [notificationSettings, accountInfo] = await Promise.all([
    getNotificationSettings(user.id),
    getAccountInfo(user.id),
  ]);

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <MenuAvatarHeader />

      <div className="lg:grid lg:grid-cols-[246px_minmax(0,1fr)] lg:items-start">
        <div className="hidden flex-col gap-[34px] border-r border-cb-border bg-cb-header py-4 lg:flex">
          <MypageNavSidebar activeHref="/mypage/settings" />
        </div>

        <div className="min-w-0">
          <div className="bg-cb-header px-[18px] pb-4 pt-4 lg:bg-transparent lg:px-6 lg:pb-0 lg:pt-6">
            <h1 className="font-heading text-[22px] font-bold text-[#2F2B24] lg:text-[26px]">アカウント設定</h1>
            <p className="mt-2 text-[11.5px] leading-[1.7] text-cb-muted-2 lg:mt-2.5 lg:text-[12.5px] lg:leading-normal">
              アカウント情報や通知設定の確認・変更、セキュリティ設定を行います。
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-4 px-3.5 pb-6 lg:mt-5 lg:grid lg:grid-cols-2 lg:gap-4 lg:px-6 lg:pb-7">
            <AccountInfoCard
              userId={user.id}
              displayName={accountInfo.displayName}
              email={user.email ?? ""}
              gender={accountInfo.gender}
              birthdate={accountInfo.birthdate}
            />
            <PasswordChangeCard />
            <NotificationSettingsCard userId={user.id} initialSettings={notificationSettings} />
            <AccountDeleteCard />
          </div>

          <div className="px-3.5 pb-6 lg:px-6 lg:pb-7">
            <SecurityNoticeBanner />
          </div>
        </div>
      </div>

      <MobileBottomNav activeHref="/mypage" />
    </div>
  );
}
