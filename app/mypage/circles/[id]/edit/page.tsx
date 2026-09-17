import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ManageHeader } from "@/components/circle-manage/manage-header";
import { ManageBreadcrumb } from "@/components/circle-manage/manage-breadcrumb";
import { CircleNavSidebar } from "@/components/circle-manage/circle-nav-sidebar";
import { CircleDeleteButton } from "@/components/mypage/circle-delete-button";
import { CirclePublishToggle } from "@/components/mypage/circle-publish-toggle";
import { CircleForm } from "@/components/circle-create/circle-form";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { getAreas, getCategories, getOwnedCircleById, coverImagePath, sortedImages } from "@/lib/circles";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "基本情報",
};

export default async function CircleEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) notFound();

  const [circle, categories, areas] = await Promise.all([
    getOwnedCircleById(id, user.id),
    getCategories(),
    getAreas(),
  ]);
  if (!circle) notFound();

  const majorSlug = circle.category?.parent_id
    ? (categories.find((c) => c.id === circle.category!.parent_id)?.slug ?? "")
    : "";
  const isCitywide = circle.area?.slug === "citywide";

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <ManageHeader mobileTitle="基本情報" backHref="/mypage/circles/owned" />

      <main className="flex-1">
        <ManageBreadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "マイページ", href: "/mypage" },
            { label: "サークル一覧", href: "/mypage/circles/owned" },
          ]}
          current={circle.name}
        />

        <div className="lg:grid lg:grid-cols-[246px_minmax(0,1fr)] lg:gap-[26px] lg:px-7 lg:pb-[34px]">
          <CircleNavSidebar
            circleId={id}
            circleName={circle.name}
            tagline={circle.description}
            type={circle.type}
            status={circle.status}
            imagePath={coverImagePath(circle)}
            activeKey="info"
          />

          <div className="min-w-0">
            <div className="bg-cb-header px-[18px] pb-4 pt-4 lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-0">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <h1 className="font-heading text-[22px] font-bold text-[#2F2B24] lg:text-[25px]">基本情報</h1>
                  <p className="mt-2 text-[11.5px] text-cb-muted-2 lg:mt-2.5 lg:text-[12.5px]">
                    サークルの基本情報を編集できます。<span className="text-[#E5731B]">＊</span>の項目は必須です。
                  </p>
                </div>
                <div className="hidden flex-col items-end gap-2.5 lg:flex">
                  <CirclePublishToggle circleId={circle.id} status={circle.status} />
                  <CircleDeleteButton circleId={circle.id} />
                </div>
              </div>
              <div className="mt-3.5 flex items-center justify-between gap-3 lg:hidden">
                <CirclePublishToggle circleId={circle.id} status={circle.status} />
              </div>
              <CircleDeleteButton circleId={circle.id} className="mt-3.5 w-full lg:hidden" />
            </div>

            <div className="px-3.5 py-4 lg:px-0 lg:py-0">
              <div className="rounded-xl border border-cb-border bg-cb-surface px-4 py-[18px] lg:mt-5 lg:px-[26px] lg:py-6">
                <CircleForm
                  mode="edit"
                  circleId={circle.id}
                  categories={categories}
                  areas={areas}
                  redirectTo="/mypage/circles/owned"
                  defaultImages={sortedImages(circle)}
                  defaultActivities={circle.activities ? circle.activities.split("\n").filter(Boolean) : []}
                  defaultValues={{
                    type: circle.type as "ongoing" | "one_time",
                    name: circle.name,
                    tagline: circle.tagline,
                    categoryMajorId: majorSlug,
                    categoryMinorId: circle.category?.slug ?? "",
                    isCitywide,
                    areaId: isCitywide ? "" : (circle.area?.slug ?? ""),
                    location: circle.location,
                    locationAccess: circle.location_access,
                    scheduleFrequency: circle.schedule_frequency,
                    scheduleTime: circle.schedule_time,
                    memberCount: circle.member_count,
                    foundedAt: circle.founded_at,
                    eventDate: circle.event_date ?? "",
                    description: circle.description,
                  }}
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
