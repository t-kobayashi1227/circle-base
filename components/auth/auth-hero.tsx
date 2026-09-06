import { MaterialSymbol } from "@/components/icons/material-symbol";
import { PhotoPlaceholder } from "@/components/photo-placeholder";

const features = [
  { icon: "groups", title: "新潟市限定", note: "地域密着で安心" },
  { icon: "verified_user", title: "安心・安全", note: "通報・ブロック機能" },
  { icon: "forum", title: "気軽に交流", note: "メッセージ機能" },
];

function DashedUnderline({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-[5px] rounded-[3px] ${className}`}
      style={{
        backgroundImage: "repeating-linear-gradient(90deg, #EBB967 0 7px, transparent 7px 13px)",
      }}
    />
  );
}

export function AuthHero() {
  return (
    <div className="bg-gradient-to-b from-[#FEF9F1] to-[#FFFDF9] lg:bg-[linear-gradient(160deg,#FDF6EA_0%,#FBEFDC_55%,#F7E7CD_100%)]">
      {/* モバイル: 写真＋見出しのみ */}
      <div className="lg:hidden">
        <div className="h-[118px] overflow-hidden">
          <PhotoPlaceholder caption="萬代橋と新潟の街並み" iconSize={20} />
        </div>
        <div className="px-5 pt-[22px] text-center">
          <h1 className="font-heading text-[23px] font-bold leading-[1.65] text-[#332E26]">
            新潟で、つながる。
            <br />
            趣味で、仲間ができる。
          </h1>
          <DashedUnderline className="mx-auto mt-3 w-[104px]" />
        </div>
      </div>

      {/* デスクトップ: 写真＋見出し＋本文＋特徴3つ */}
      <div className="relative hidden min-w-0 overflow-hidden py-11 pl-[46px] pr-10 lg:block">
        <div className="absolute inset-0">
          <PhotoPlaceholder caption="ヒーロー画像：萬代橋と新潟の街並みのイラスト" iconSize={26} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,250,240,.82)_0%,rgba(255,248,235,.62)_46%,rgba(253,243,225,.4)_100%)]" />
        <div className="relative">
          <h1 className="font-heading text-[34px] font-bold leading-[1.55] text-[#332E26]">
            新潟で、つながる。
            <br />
            趣味で、仲間ができる。
          </h1>
          <DashedUnderline className="mt-3.5 w-[118px]" />
          <p className="mt-[26px] text-[13px] leading-[2.05] text-[#4F483E]">
            「にいがたサークルベース」は
            <br />
            新潟市限定のサークル・イベント募集サイトです。
            <br />
            趣味やスポーツ、文化活動など、
            <br />
            あなたにぴったりの仲間がきっと見つかります。
          </p>
          <div className="mt-[34px] flex gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex h-[104px] w-[104px] flex-col items-center justify-center gap-1.5 rounded-full bg-[rgba(255,255,255,.86)] text-center shadow-[0_4px_14px_rgba(140,100,40,.14)]"
              >
                <MaterialSymbol name={f.icon} size={26} className="text-[#D9902B]" />
                <span className="text-[11.5px] font-bold text-[#3B352C]">{f.title}</span>
                <span className="text-[9.5px] text-cb-muted-3">{f.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
