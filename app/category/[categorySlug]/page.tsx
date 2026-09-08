import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteSearchHeader } from "@/components/site-search-header";
import { ListBreadcrumb } from "@/components/circles-list/list-breadcrumb";
import { KeywordSearchBar } from "@/components/circles-list/keyword-search-bar";
import { SortBar } from "@/components/circles-list/sort-bar";
import { CircleListCard } from "@/components/circles-list/circle-list-card";
import { ListPagination } from "@/components/circles-list/list-pagination";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { getCategories, getCategoryBySlug, getCircles } from "@/lib/circles";
import { buildOpenGraph } from "@/lib/seo";
import { getCurrentUser } from "@/lib/auth";
import type { ListParams } from "@/lib/url-params";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return { title: "カテゴリが見つかりません" };
  const title = `${category.name}のサークル一覧`;
  const description = `新潟市内の${category.name}に関するサークル・イベントの一覧です。エリアやキーワードで絞り込んで探せます。`;
  return {
    title,
    description,
    openGraph: buildOpenGraph({ title, description }),
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<ListParams>;
}) {
  const { categorySlug } = await params;
  const sp = await searchParams;
  const [category, categories] = await Promise.all([getCategoryBySlug(categorySlug), getCategories()]);
  if (!category) notFound();

  const parent = category.parent_id ? (categories.find((c) => c.id === category.parent_id) ?? null) : null;

  const sort = sp.sort === "updated" ? "updated" : "new";
  const page = Number(sp.page) > 0 ? Number(sp.page) : 1;
  const basePath = `/category/${categorySlug}`;

  const [{ circles, total, pageCount }, user] = await Promise.all([
    getCircles({ categorySlug, keyword: sp.q, sort, page }),
    getCurrentUser(),
  ]);

  const breadcrumbItems = [
    { label: "ホーム", href: "/" },
    { label: "サークルを探す", href: "/circles" },
    ...(parent ? [{ label: parent.name, href: `/category/${parent.slug}` }] : []),
  ];

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <SiteSearchHeader isLoggedIn={!!user} />

      <main className="flex-1">
        <ListBreadcrumb items={breadcrumbItems} current={category.name} />

        <div className="px-[18px] pb-6 pt-3.5 lg:px-7 lg:pb-[34px] lg:pt-1.5">
          <h1 className="font-heading text-[25px] font-bold text-[#2F2B24]">{category.name}のサークル一覧</h1>
          <p className="mt-[9px] text-[11.5px] text-cb-muted-2 lg:text-[12.5px]">
            {category.name}に関するサークルが{total}件見つかりました
          </p>

          <div className="mt-4 lg:mt-[22px]">
            <KeywordSearchBar basePath={basePath} current={sp} />
          </div>

          <SortBar current={sp} sort={sort} basePath={basePath} />

          {circles.length === 0 ? (
            <p className="mt-10 text-center text-[12.5px] text-cb-muted">
              現在、{category.name}で公開中のサークルはありません。
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
