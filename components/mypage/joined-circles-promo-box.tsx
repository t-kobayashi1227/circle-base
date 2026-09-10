import Link from "next/link";

export function JoinedCirclesPromoBox() {
  return (
    <div className="mx-4 hidden rounded-[11px] border border-[#F2E6D2] bg-[#FDF8F0] px-4 py-[18px] text-center lg:block">
      <div className="text-[12.5px] font-bold leading-[1.7] text-[#3B352C]">
        サークルを作って
        <br />
        仲間を集めよう！
      </div>
      <Link
        href="/mypage/circles/new"
        className="mt-3.5 flex items-center justify-center rounded-lg border border-cb-accent bg-white py-2.5 text-xs font-bold text-cb-accent-dark hover:bg-cb-accent-soft"
      >
        サークルを作成する
      </Link>
    </div>
  );
}
