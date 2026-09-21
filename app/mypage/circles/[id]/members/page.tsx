import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ManageHeader } from "@/components/circle-manage/manage-header";
import { ManageBreadcrumb } from "@/components/circle-manage/manage-breadcrumb";
import { CircleNavSidebar } from "@/components/circle-manage/circle-nav-sidebar";
import { MemberRow } from "@/components/circle-manage/member-row";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { coverImagePath, getOwnedCircleById } from "@/lib/circles";
import { getCircleMembers } from "@/lib/circle-members";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "参加者管理",
};

export default async function CircleMembersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) notFound();

  const circle = await getOwnedCircleById(id, user.id);
  if (!circle) notFound();

  const members = await getCircleMembers(id);
  const managePath = `/mypage/circles/${id}`;

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <ManageHeader mobileTitle="参加者管理" backHref="/mypage/circles/owned" />

      <main className="flex-1">
        <ManageBreadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "マイページ", href: "/mypage" },
            { label: "サークル一覧", href: "/mypage/circles/owned" },
            { label: circle.name, href: `${managePath}/edit` },
          ]}
          current="参加者管理"
        />

        <div className="lg:grid lg:grid-cols-[246px_minmax(0,1fr)] lg:gap-[26px] lg:px-7 lg:pb-[34px]">
          <CircleNavSidebar
            circleId={id}
            circleName={circle.name}
            tagline={circle.description}
            type={circle.type}
            status={circle.status}
            imagePath={coverImagePath(circle)}
            activeKey="members"
          />

          <div className="min-w-0 px-4 py-4 lg:px-0 lg:py-0">
            <div className="hidden lg:block">
              <h1 className="font-heading text-[25px] font-bold text-[#2F2B24]">参加者管理</h1>
              <p className="mt-[9px] text-[12.5px] text-cb-muted-2">
                {circle.name}に参加しているメンバーの一覧です。新しいメンバーは、メッセージでのやり取り画面から「参加者にする」を実行して追加できます。
              </p>
            </div>

            <section className="mt-4 lg:mt-5">
              <h2 className="text-[13.5px] font-bold text-cb-ink">
                参加中のメンバー {members.length > 0 ? `（${members.length}人）` : ""}
              </h2>
              {members.length === 0 ? (
                <p className="mt-2.5 text-[12px] text-cb-muted">
                  まだ参加中のメンバーはいません。メッセージのやり取り画面から参加者を追加できます。
                </p>
              ) : (
                <div className="mt-2.5 flex flex-col gap-2.5">
                  {members.map((member) => (
                    <MemberRow key={member.id} member={member} />
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <SiteFooter />
      <MobileBottomNav activeHref="/mypage" />
    </div>
  );
}
