import type { Metadata } from "next";
import { MenuAvatarHeader } from "@/components/mypage/menu-avatar-header";
import { MypageNavSidebar } from "@/components/mypage/mypage-nav-sidebar";
import { CircleImage } from "@/components/circle-image";
import { UnblockButton } from "@/components/mypage/unblock-button";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { getBlockedUsers } from "@/lib/blocks";
import { formatDateJa } from "@/lib/circles";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "ブロックしたユーザー",
};

export default async function BlockedUsersPage() {
  const user = await getCurrentUser();
  const blockedUsers = user ? await getBlockedUsers(user.id) : [];

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <MenuAvatarHeader />

      <div className="lg:grid lg:grid-cols-[224px_minmax(0,1fr)] lg:items-start">
        <div className="hidden flex-col gap-[22px] border-r border-cb-border bg-cb-header py-[18px] lg:flex">
          <MypageNavSidebar activeHref="/mypage/blocked-users" />
        </div>

        <div className="min-w-0 px-[18px] pb-[26px] pt-[18px] lg:px-[26px] lg:pt-6">
          <h1 className="font-heading text-xl font-bold text-[#2F2B24] lg:text-[23px]">ブロックしたユーザー</h1>
          <p className="mt-2.5 text-xs leading-[1.8] text-cb-muted-2 lg:mt-2.5 lg:text-[12.5px] lg:leading-normal">
            ブロックしたユーザーからは、以後メッセージを受け取らなくなります。
          </p>

          {blockedUsers.length === 0 ? (
            <p className="mt-6 rounded-xl border border-cb-border bg-cb-surface px-4 py-8 text-center text-[12.5px] text-cb-muted">
              ブロックしているユーザーはいません。
            </p>
          ) : (
            <div className="mt-5 flex flex-col gap-3">
              {blockedUsers.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center gap-3.5 rounded-xl border border-cb-border bg-cb-surface px-4 py-3.5"
                >
                  <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full">
                    <CircleImage path={b.avatarPath} alt={b.displayName} iconSize={12} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-bold text-[#2F2B24]">{b.displayName}</div>
                    <div className="mt-1 text-[10.5px] text-cb-muted-3">
                      ブロック日：{formatDateJa(b.blockedAt.slice(0, 10))}
                    </div>
                  </div>
                  <UnblockButton blockId={b.id} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <MobileBottomNav activeHref="/mypage" />
    </div>
  );
}
