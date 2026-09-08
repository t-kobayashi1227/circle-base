import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListHeader } from "@/components/circles-list/list-header";
import { ListBreadcrumb } from "@/components/circles-list/list-breadcrumb";
import { KeywordSearchBar } from "@/components/circles-list/keyword-search-bar";
import { SortBar } from "@/components/circles-list/sort-bar";
import { CircleListCard } from "@/components/circles-list/circle-list-card";
import { ListPagination } from "@/components/circles-list/list-pagination";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { getAreaBySlug, getCircles } from "@/lib/circles";
import { buildOpenGraph } from "@/lib/seo";
import { getCurrentUser } from "@/lib/auth";
import type { ListParams } from "@/lib/url-params";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ areaSlug: string }>;
}): Promise<Metadata> {
  const { areaSlug } = await params;
  const area = await getAreaBySlug(areaSlug);
  if (!area) return { title: "エリアが見つかりません" };
  const title = `${area.name}のサークル一覧`;
  const description = `新潟市${area.name}を拠点に活動するサークル・イベントの一覧です。カテゴリやキーワードで絞り込んで探せます。`;
  return {
    title,
    description,
    openGraph: buildOpenGraph({ title, description }),
  };
}

export default async function AreaPage({
  params,
  searchParams,
}: {
  params: Promise<{ areaSlug: string }>;
  searchParams: Promise<ListParams>;
}) {
  const { areaSlug } = await params;
  const sp = await searchParams;
  const area = await getAreaBySlug(areaSlug);
  if (!area) notFound();

  const sort = sp.sort === "updated" ? "updated" : "new";
  const page = Number(sp.page) > 0 ? Number(sp.page) : 1;
  const basePath = `/area/${areaSlug}`;

  const [{ circles, total, pageCount }, user] = await Promise.all([
    getCircles({ areaSlug, keyword: sp.q, sort, page }),
    getCurrentUser(),
  ]);

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <ListHeader isLoggedIn={!!user} />

      <main className="flex-1">
        <ListBreadcrumb items={[{ label: "ホーム", href: "/" }, { label: "サークルを探す", href: "/circles" }]} current={`${area.name}のサークル`} />

        <div className="px-[18px] pb-6 pt-3.5 lg:px-7 lg:pb-[34px] lg:pt-1.5">
          <h1 className="font-heading text-[25px] font-bold text-[#2F2B24]">{area.name}のサークル一覧</h1>
          <p className="mt-[9px] text-[11.5px] text-cb-muted-2 lg:text-[12.5px]">
            {area.name}を拠点に活動するサークルが{total}件見つかりました
          </p>

          <div className="mt-4 lg:mt-[22px]">
            <KeywordSearchBar basePath={basePath} current={sp} />
          </div>

          <SortBar current={sp} sort={sort} basePath={basePath} />

          {circles.length === 0 ? (
            <p className="mt-10 text-center text-[12.5px] text-cb-muted">
              現在、{area.name}で公開中のサークルはありません。
            </p>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-3.5 lg:grid-cols-4">
              {circles.map((circle) => (
                <CircleListCard key={circle.id} circle={circle} />
              ))}
            </div>
          )}

          <div className="mt-4 lg:mt-6">
            <ListPagination current={sp} page={page} pageCount={pageCount} basePath={basePath} />
          </div>
        </div>
      </main>

      <SiteFooter />
      <MobileBottomNav activeHref="/circles" />
    </div>
  );
}
