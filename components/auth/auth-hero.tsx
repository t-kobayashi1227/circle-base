import Image from "next/image";
import { MaterialSymbol } from "@/components/icons/material-symbol";

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
        <div className="relative h-[118px] overflow-hidden">
          <Image
            src="/images/login-back.png"
            alt="萬代橋と新潟の街並み"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[15%_45%]"
          />
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

      {/* デスクトップ: 写真＋見出し＋本文＋特徴3つ（背景画像の上に重ねて配置） */}
      <div className="relative hidden min-w-0 flex-col overflow-hidden lg:flex lg:h-full">
        <div className="absolute inset-0">
          <Image
            src="/images/login-back-ver2.png"
            alt="萬代橋と新潟の街並み"
            fill
            priority
            sizes="50vw"
            className="object-cover object-[32%_38%]"
          />
        </div>
        <div className="relative flex flex-1 items-center justify-center px-10">
          <div className="relative isolate flex w-fit flex-col items-center px-24 py-35 text-center">
            <div className="pointer-events-none absolute inset-0 -z-10">
              <Image src="/Illustration/background-ver2.png" alt="" fill sizes="620px" className="object-fill" />
            </div>

            <h1 className="text-left font-heading text-[34px] font-bold leading-[1.55] text-[#332E26]">
              新潟で、つながる。
              <br />
              趣味で、仲間ができる。
            </h1>
            <DashedUnderline className="mt-3.5 w-[118px]" />
            <p className="text-left mt-[26px] text-sm leading-[1.8]">
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
                  className="flex h-[150px] w-[150px] flex-col items-center justify-center gap-1.5 rounded-full bg-white text-center shadow-[0_4px_14px_rgba(140,100,40,.16)]"
                >
                  <MaterialSymbol name={f.icon} size={50} className="text-[#D9902B]" />
                  <span className="text-sm font-bold text-[#3B352C]">{f.title}</span>
                  <span className="text-xs text-cb-muted-3">{f.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
