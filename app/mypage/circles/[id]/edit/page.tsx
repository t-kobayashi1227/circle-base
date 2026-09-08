import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CircleEditHeader } from "@/components/mypage/circle-edit-header";
import { MypageNavSidebar } from "@/components/mypage/mypage-nav-sidebar";
import { CircleEditTipsBox } from "@/components/mypage/circle-edit-tips-box";
import { CircleDeleteButton } from "@/components/mypage/circle-delete-button";
import { CirclePublishToggle } from "@/components/mypage/circle-publish-toggle";
import { CircleForm } from "@/components/circle-create/circle-form";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { getAreas, getCategories, getOwnedCircleById, coverImagePath } from "@/lib/circles";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "サークル編集",
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
      <CircleEditHeader />

      <div className="lg:grid lg:grid-cols-[246px_minmax(0,1fr)] lg:items-start">
        <div className="hidden flex-col gap-[34px] border-r border-cb-border bg-cb-header py-4 lg:flex">
          <MypageNavSidebar activeHref="/mypage/circles/owned" />
          <CircleEditTipsBox />
        </div>

        <div className="min-w-0">
          <div className="bg-cb-header px-[18px] pb-4 pt-4 lg:bg-transparent lg:px-6 lg:pb-0 lg:pt-6">
            <div className="flex items-start justify-between gap-5">
              <div>
                <h1 className="font-heading text-[22px] font-bold text-[#2F2B24] lg:text-[26px]">サークル編集</h1>
                <p className="mt-2 text-[11.5px] text-cb-muted-2 lg:mt-2.5 lg:text-[12.5px]">
                  サークルの情報を編集できます。<span className="text-[#E5731B]">＊</span>の項目は必須です。
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

          <div className="px-3.5 pb-6 pt-4 lg:px-6 lg:pb-7 lg:pt-5">
            <CircleForm
              mode="edit"
              circleId={circle.id}
              categories={categories}
              areas={areas}
              redirectTo="/mypage/circles/owned"
              existingImageLabel={coverImagePath(circle) ? "現在のメイン画像あり" : null}
              defaultValues={{
                type: circle.type as "ongoing" | "one_time",
                name: circle.name,
                categoryMajorId: majorSlug,
                categoryMinorId: circle.category?.slug ?? "",
                isCitywide,
                areaId: isCitywide ? "" : (circle.area?.slug ?? ""),
                location: circle.location,
                schedule: circle.schedule,
                eventDate: circle.event_date ?? "",
                description: circle.description,
                requirements: circle.requirements,
              }}
            />
          </div>
        </div>
      </div>

      <MobileBottomNav activeHref="/mypage" />
    </div>
  );
}
