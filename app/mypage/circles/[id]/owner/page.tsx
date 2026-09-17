import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ManageHeader } from "@/components/circle-manage/manage-header";
import { ManageBreadcrumb } from "@/components/circle-manage/manage-breadcrumb";
import { CircleNavSidebar } from "@/components/circle-manage/circle-nav-sidebar";
import { ProfileForm } from "@/components/mypage/profile-form";
import { OwnerMessageForm } from "@/components/circle-manage/owner-message-form";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { coverImagePath, getOwnedCircleById } from "@/lib/circles";
import { getProfileForEdit } from "@/lib/mypage";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "主催者情報",
};

export default async function CircleOwnerEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) notFound();

  const [circle, profile] = await Promise.all([getOwnedCircleById(id, user.id), getProfileForEdit(user.id)]);
  if (!circle) notFound();

  const managePath = `/mypage/circles/${id}`;

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <ManageHeader mobileTitle="主催者情報" backHref="/mypage/circles/owned" />

      <main className="flex-1">
        <ManageBreadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "マイページ", href: "/mypage" },
            { label: "サークル一覧", href: "/mypage/circles/owned" },
            { label: circle.name, href: `${managePath}/edit` },
          ]}
          current="主催者情報"
        />

        <div className="lg:grid lg:grid-cols-[246px_minmax(0,1fr)] lg:gap-[26px] lg:px-7 lg:pb-[34px]">
          <CircleNavSidebar
            circleId={id}
            circleName={circle.name}
            tagline={circle.description}
            type={circle.type}
            status={circle.status}
            imagePath={coverImagePath(circle)}
            activeKey="owner"
          />

          <div className="min-w-0 px-3.5 py-4 lg:px-0 lg:py-0">
            <div className="rounded-lg bg-cb-accent-soft px-3.5 py-3 text-[11.5px] leading-[1.8] text-cb-ink-soft">
              主催者情報（ニックネーム・写真・自己紹介など）は、あなたが主催するすべてのサークルで共通です。ここでの変更はすべてのサークルの「主催者情報」タブに反映されます。
            </div>

            <div className="mt-4 rounded-xl border border-cb-border bg-cb-surface px-4 py-[18px] lg:px-[26px] lg:py-6">
              <ProfileForm userId={user.id} initialProfile={profile} />
            </div>

            <div className="mt-4 rounded-xl border border-cb-border bg-cb-surface px-4 py-[18px] lg:px-[26px] lg:py-6">
              <h3 className="font-heading text-[14px] font-bold text-cb-ink lg:text-[15px]">
                このサークルでの「主催者からのメッセージ」
              </h3>
              <p className="mt-2 text-[11.5px] leading-[1.8] text-cb-muted-2">
                サークル詳細ページの「主催者情報」タブに表示される、このサークル向けのメッセージです（自己紹介とは別に表示されます）。
              </p>
              <div className="mt-3.5">
                <OwnerMessageForm
                  circleId={id}
                  defaultValues={{ ownerMessage: circle.owner_message }}
                  redirectTo={`${managePath}/owner`}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
      <MobileBottomNav activeHref="/mypage" />
    </div>
  );
}
