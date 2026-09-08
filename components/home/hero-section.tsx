import Image from "next/image";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { getAreas, getCategoryTree } from "@/lib/circles";

export async function HeroSection() {
  const [areas, categoryTree] = await Promise.all([getAreas(), getCategoryTree()]);

  return (
    <section className="relative">
      <div className="relative h-[300px] w-full overflow-hidden lg:h-[440px]">
        <Image
          src="/images/top-main.png"
          alt="信濃川沿いで楽器を弾く仲間たち"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="relative isolate max-w-[560px] px-5 py-6 lg:max-w-[530px] lg:px-[46px] lg:py-14 lg:h-[440px]">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[#FFF6E6]/90 via-[#FFF6E6]/65 to-[#FFF6E6]/25 backdrop-blur-[3px]" />
          <h1 className="font-heading text-[26px] font-bold leading-[1.45] text-[#332E26] lg:text-5xl lg:leading-[1.3]">
            新潟で、つながる。
            <br />
            仲間が見つかる。
          </h1>
          <p className="mt-3 text-[11.5px] lg:mt-6 lg:text-sm lg:leading-[2]">
            <span className="lg:hidden">新しい出会いを、ここからはじめよう。</span>
            <span className="hidden lg:inline">
              にいがたサークルベースは、新潟市限定の
              <br />
              サークル・イベント・趣味友達を見つけるためのサイトです。
              <br />
              新しい出会いを、ここからはじめよう。
            </span>
          </p>
          <div className="mt-[30px] hidden items-center gap-2.5 rounded-xl bg-cb-surface py-2.5 pr-4 pl-2.5 shadow-[0_3px_12px_rgba(120,90,40,.14)] lg:inline-flex">
            <span className="rounded-xl bg-cb-accent px-2.5 py-1 text-[11.5px] font-bold text-white">
              新潟市限定
            </span>
            <MaterialSymbol name="location_on" filled size={17} className="text-cb-accent" />
            <span className="text-[13px] font-medium text-[#463F35]">
              同じ趣味の仲間を見つけよう！
            </span>
          </div>
        </div>

        <div className="absolute right-25 top-[120px] hidden h-[150px] w-[150px] flex-col items-center justify-center gap-0.5 rounded-full bg-cb-surface text-center shadow-[0_6px_18px_rgba(90,65,25,.2)] lg:flex">
          <span className="text-[9.5px] leading-normal text-cb-muted lg:text-xs">
            初心者・ひとり参加も
          </span>
          <span className="font-heading text-[19px] font-bold text-cb-accent lg:text-xl">
            大歓迎！
          </span>
        </div>
      </div>

      {/* モバイル: ヒーロー直下のバッジ */}
      <div className="mx-3.5 -mt-3.5 inline-flex items-center gap-2 rounded-full bg-cb-surface py-1.5 pr-3.5 pl-1.5 shadow-[0_3px_12px_rgba(120,90,40,.16)] lg:hidden">
        <span className="rounded-full bg-cb-accent px-2 py-0.5 text-[10px] font-bold text-white">
          新潟市限定
        </span>
        <MaterialSymbol name="location_on" filled size={15} className="text-cb-accent" />
        <span className="text-[11.5px] font-medium text-[#463F35]">
          同じ趣味の仲間を見つけよう！
        </span>
      </div>

      <SearchCard areas={areas} categoryTree={categoryTree} />
    </section>
  );
}

function SearchCard({
  areas,
  categoryTree,
}: {
  areas: Awaited<ReturnType<typeof getAreas>>;
  categoryTree: Awaited<ReturnType<typeof getCategoryTree>>;
}) {
  return (
    <form
      method="get"
      action="/circles"
      className="relative z-10 mx-3.5 mt-7 flex flex-col gap-3.5 rounded-xl bg-cb-surface p-4 shadow-[0_6px_18px_rgba(90,65,25,.1)] lg:mx-[46px] lg:mt-[-58px] lg:ml-[220px] lg:grid lg:grid-cols-[1.7fr_1fr_1fr_auto] lg:items-end lg:gap-3 lg:rounded-xl lg:p-[18px_22px] lg:shadow-[0_10px_30px_rgba(90,65,25,.14)] xl:ml-[392px] xl:gap-5"
    >
      <label className="flex flex-col gap-2">
        <span className="flex items-center gap-1.5 text-xs font-medium text-cb-ink-soft lg:text-[12.5px]">
          <MaterialSymbol name="search" size={17} className="text-cb-accent" />
          キーワードで探す
        </span>
        <input
          type="text"
          name="q"
          placeholder="例）フットサル、登山、カメラなど"
          className="rounded-lg border border-cb-input-border px-3 py-3 text-xs text-cb-ink placeholder:text-cb-placeholder focus:border-cb-accent focus:outline-none lg:rounded-[7px] lg:py-2.5 lg:text-[12.5px]"
        />
      </label>
      <div className="grid grid-cols-2 gap-3 lg:contents">
        <label className="flex flex-col gap-2">
          <span className="flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-cb-ink-soft lg:text-[12.5px]">
            <MaterialSymbol name="place" size={17} className="text-cb-accent hidden lg:inline-block" />
            エリアを選ぶ
          </span>
          <div className="relative">
            <select
              name="area"
              defaultValue=""
              className="w-full appearance-none whitespace-nowrap rounded-lg border border-cb-input-border px-3 py-3 text-[11.5px] text-cb-ink-soft lg:rounded-[7px] lg:py-2.5 lg:text-[12.5px]"
            >
              <option value="">エリアを選択</option>
              {areas.map((area) => (
                <option key={area.id} value={area.slug}>
                  {area.name}
                </option>
              ))}
            </select>
            <MaterialSymbol
              name="expand_more"
              size={17}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cb-placeholder"
            />
          </div>
        </label>
        <label className="flex flex-col gap-2">
          <span className="flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-cb-ink-soft lg:text-[12.5px]">
            <MaterialSymbol name="category" size={17} className="text-cb-accent hidden lg:inline-block" />
            カテゴリを選ぶ
          </span>
          <div className="relative">
            <select
              name="category"
              defaultValue=""
              className="w-full appearance-none whitespace-nowrap rounded-lg border border-cb-input-border px-3 py-3 text-[11.5px] text-cb-ink-soft lg:rounded-[7px] lg:py-2.5 lg:text-[12.5px]"
            >
              <option value="">カテゴリを選択</option>
              {categoryTree.map((major) => (
                <optgroup key={major.id} label={major.name}>
                  <option value={major.slug}>{major.name}（すべて）</option>
                  {major.children.map((minor) => (
                    <option key={minor.id} value={minor.slug}>
                      {minor.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <MaterialSymbol
              name="expand_more"
              size={17}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cb-placeholder"
            />
          </div>
        </label>
      </div>
      <button
        type="submit"
        className="rounded-lg bg-cb-accent px-6 py-3.5 text-center text-sm font-bold text-white shadow-[0_2px_0_rgba(150,90,10,.25)] hover:bg-cb-accent-hover lg:rounded-lg lg:px-7 lg:py-3"
      >
        検索する
      </button>
    </form>
  );
}
