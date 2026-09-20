import Image from "next/image";

export function AdminInfoHero() {
  return (
    <>
      {/* デスクトップ */}
      <div className="relative mx-7 mt-3.5 hidden h-[210px] overflow-hidden rounded-xl lg:block">
        <Image
          src="/images/about-top.png"
          alt="新潟市街と川辺の写真"
          fill
          priority
          sizes="(min-width: 1024px) calc(100vw - 56px)"
          className="object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(90deg,rgba(20,16,10,.18) 0%,rgba(20,16,10,0) 60%)" }}
        />
        <div className="pointer-events-none absolute left-7 top-[34px]">
          <h1 className="m-0 font-heading text-[34px] font-bold text-cb-ink">サイト管理者情報</h1>
          <div className="mt-2.5 font-heading text-[14px] font-bold tracking-[.06em] text-cb-accent">ADMIN</div>
        </div>
        <div className="pointer-events-none absolute right-9 top-[26px] text-right font-heading text-[15px] font-bold leading-[1.6] text-cb-ink">
          好きなことで
          <br />
          つながる、
          <br />
          新潟の毎日
        </div>
      </div>

      {/* モバイル */}
      <div className="relative h-[118px] lg:hidden">
        <Image
          src="/images/about-top.png"
          alt="新潟市街と川辺の写真"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(180deg,rgba(20,16,10,.06) 0%,rgba(20,16,10,.28) 100%)" }}
        />
        <div className="pointer-events-none absolute left-[18px] top-4">
          <h1 className="m-0 font-heading text-[22px] font-bold text-cb-ink">サイト管理者情報</h1>
          <div className="mt-1.5 font-heading text-[11px] font-bold tracking-[.06em] text-cb-accent">ADMIN</div>
        </div>
      </div>
    </>
  );
}
