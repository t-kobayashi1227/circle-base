import Link from "next/link";
import { MaterialSymbol } from "@/components/icons/material-symbol";

const infoCards = [
  { icon: "person", label: "名前", value: "小林 亨有", sub: "Takanari Kobayashi" },
  { icon: "location_on", label: "居住地", value: "新潟県", sub: null },
  { icon: "laptop_mac", label: "運営サイト", value: "にいがたサークルベース", sub: null },
  {
    icon: "edit",
    label: "活動内容",
    value: "Webサイト運営・企画・開発",
    sub: "新潟の地域コミュニティづくりを応援しています",
  },
];

function AdminPhoto({ size }: { size: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full bg-cb-accent/10 font-heading font-bold text-cb-accent"
      style={{ width: size, height: size, fontSize: size * 0.35 }}
    >
      小林
    </div>
  );
}

export function AdminInfoContent() {
  return (
    <section className="pb-6 lg:pb-8">
      {/* 挨拶カード */}
      <div className="rounded-xl border border-cb-border bg-white px-6 py-6 lg:px-8 lg:py-7">
        {/* デスクトップ: 左テキスト・右写真 */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_190px] lg:gap-8">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-[18px] w-1 flex-shrink-0 rounded-sm bg-cb-accent" />
              <h2 className="m-0 font-heading text-[18px] font-bold text-cb-ink">管理者からのごあいさつ</h2>
            </div>
            <p className="mt-[18px] text-[13px] leading-[2.1] text-cb-ink-soft">
              にいがたサークルベースをご利用いただき、ありがとうございます。
              <br />
              こちらのサイトは、新潟で活動するサークル・イベント・趣味友達とのつながりを応援するために運営しています。
              <br />
              <br />
              新潟での出会いが、日常をもっと楽しく、豊かなものにしてくれる。
              <br />
              そんなきっかけをつくれる場を目指して、これからもサイトの運営・改善に努めていきます。
              <br />
              <br />
              ご意見・ご要望などがありましたら、いつでもお気軽にご連絡ください。
              <br />
              今後とも、にいがたサークルベースをよろしくお願いいたします。
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="h-[150px] w-[150px] overflow-hidden rounded-full border-[3px] border-cb-accent-soft">
                <AdminPhoto size={150} />
              </div>
              <MaterialSymbol
                name="bolt"
                size={20}
                className="absolute -right-0.5 top-1.5 text-cb-accent"
              />
            </div>
            <div className="mt-3.5 font-heading text-[17px] font-bold text-cb-ink">小林 亨有</div>
            <div className="mt-1 text-[11.5px] text-cb-muted-3">Takanari Kobayashi</div>
            <div className="mt-2.5 text-[11.5px] leading-[1.7] text-cb-muted">
              新潟の「人」と「好き」をつなぐ
              <br />
              お手伝いができれば嬉しいです！
            </div>
          </div>
        </div>

        {/* モバイル: テキスト→写真の縦並び */}
        <div className="lg:hidden">
          <div className="flex items-center gap-2.5">
            <span className="h-4 w-1 flex-shrink-0 rounded-sm bg-cb-accent" />
            <h2 className="m-0 font-heading text-[15px] font-bold text-cb-ink">管理者からのごあいさつ</h2>
          </div>
          <p className="mt-3.5 text-[12px] leading-[2] text-cb-ink-soft">
            にいがたサークルベースをご利用いただき、ありがとうございます。
            <br />
            こちらのサイトは、新潟で活動するサークル・イベント・趣味友達とのつながりを応援するために運営しています。
            <br />
            <br />
            新潟での出会いが、日常をもっと楽しく、豊かなものにしてくれる。
            <br />
            そんなきっかけをつくれる場を目指して、これからもサイトの運営・改善に努めていきます。
            <br />
            <br />
            ご意見・ご要望などがありましたら、いつでもお気軽にご連絡ください。
            <br />
            今後とも、にいがたサークルベースをよろしくお願いいたします。
          </p>
          <div className="mt-5 flex flex-col items-center text-center">
            <div className="relative">
              <div className="h-[120px] w-[120px] overflow-hidden rounded-full border-[3px] border-cb-accent-soft">
                <AdminPhoto size={120} />
              </div>
              <MaterialSymbol
                name="bolt"
                size={17}
                className="absolute -right-0.5 top-1 text-cb-accent"
              />
            </div>
            <div className="mt-3 font-heading text-[16px] font-bold text-cb-ink">小林 亨有</div>
            <div className="mt-1 text-[11px] text-cb-muted-3">Takanari Kobayashi</div>
            <div className="mt-2 text-[11px] leading-[1.7] text-cb-muted">
              新潟の「人」と「好き」をつなぐ
              <br />
              お手伝いができれば嬉しいです！
            </div>
          </div>
        </div>
      </div>

      {/* お問い合わせCTA */}
      <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#F2E4CB] bg-[#FDF6EA] px-[18px] py-4 lg:items-center lg:gap-4 lg:px-6 lg:py-[18px]">
        <span className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[8px] bg-cb-accent lg:h-[42px] lg:w-[42px] lg:rounded-[9px]">
          <MaterialSymbol name="mail" size={17} className="msf text-white lg:text-[21px]" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[12.5px] font-bold text-cb-ink lg:text-[13.5px]">お問い合わせ</div>
          <div className="mt-1.5 text-[11px] leading-[1.65] text-cb-muted-2 lg:text-[11.5px] lg:leading-[1.7]">
            サイトに関するご質問・ご意見・ご要望がありましたら、お気軽にお問い合わせください。
          </div>
        </div>
        <Link
          href="/contact"
          className="hidden flex-shrink-0 items-center gap-1.5 rounded-full border border-cb-accent bg-white px-7 py-3 text-[12.5px] font-bold text-cb-accent-dark hover:bg-cb-accent-soft lg:flex"
        >
          お問い合わせフォームへ
          <MaterialSymbol name="chevron_right" size={16} />
        </Link>
      </div>
      <Link
        href="/contact"
        className="mt-3 flex items-center justify-center gap-1.5 rounded-full border border-cb-accent bg-white py-3 text-[12px] font-bold text-cb-accent-dark lg:hidden"
      >
        お問い合わせフォームへ
        <MaterialSymbol name="chevron_right" size={15} />
      </Link>

      {/* 管理者情報カード */}
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-3.5">
        {infoCards.map((card) => (
          <div key={card.label} className="rounded-xl border border-cb-border bg-white px-4 py-4 lg:px-[18px] lg:py-4">
            <div className="flex items-center gap-1.5 text-[11.5px] font-bold text-cb-ink-soft">
              <MaterialSymbol name={card.icon} size={16} className="text-cb-accent" />
              {card.label}
            </div>
            <div className="mt-2.5 text-[13px] font-bold text-cb-ink lg:text-[13.5px]">{card.value}</div>
            {card.sub && <div className="mt-1 text-[10.5px] text-cb-muted-3">{card.sub}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}
