import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ManageHeader } from "@/components/circle-manage/manage-header";
import { ManageBreadcrumb } from "@/components/circle-manage/manage-breadcrumb";
import { CircleNavSidebar } from "@/components/circle-manage/circle-nav-sidebar";
import { RecruitForm } from "@/components/circle-manage/recruit-form";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { coverImagePath, getOwnedCircleById } from "@/lib/circles";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "メンバー募集",
};

export default async function CircleRecruitEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) notFound();

  const circle = await getOwnedCircleById(id, user.id);
  if (!circle) notFound();

  const managePath = `/mypage/circles/${id}`;

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <ManageHeader mobileTitle="メンバー募集" backHref="/mypage/circles/owned" />

      <main className="flex-1">
        <ManageBreadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "マイページ", href: "/mypage" },
            { label: "サークル一覧", href: "/mypage/circles/owned" },
            { label: circle.name, href: `${managePath}/edit` },
          ]}
          current="メンバー募集"
        />

        <div className="lg:grid lg:grid-cols-[246px_minmax(0,1fr)] lg:gap-[26px] lg:px-7 lg:pb-[34px]">
          <CircleNavSidebar
            circleId={id}
            circleName={circle.name}
            tagline={circle.description}
            type={circle.type}
            status={circle.status}
            imagePath={coverImagePath(circle)}
            activeKey="recruit"
          />

          <div className="min-w-0 px-3.5 py-4 lg:px-0 lg:py-0">
            <div className="rounded-xl border border-cb-border bg-cb-surface px-4 py-[18px] lg:px-[26px] lg:py-6">
              <RecruitForm
                circleId={id}
                circleType={circle.type}
                redirectTo="/mypage/circles/owned"
                defaultValues={{
                  recruitTagline: circle.recruit_tagline,
                  requirements: circle.requirements,
                  recruitTarget: circle.recruit_target,
                  recruitCapacity: circle.recruit_capacity,
                  recruitCost: circle.recruit_cost,
                  recruitHowToApply: circle.recruit_how_to_apply,
                }}
              />
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
      <MobileBottomNav activeHref="/mypage" />
    </div>
  );
}
