// ページ単位のmetadata（generateMetadata）で使う共通ヘルパー。
// Next.jsはページ側でopenGraph/twitterを指定すると親レイアウトの値を
// マージせず丸ごと上書きするため、画像フォールバックなどを都度ここで補う。

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const defaultOgImageUrl = `${siteUrl}/images/top-main.png`;

export function buildOpenGraph({
  title,
  description,
  imageUrl,
}: {
  title: string;
  description: string;
  imageUrl?: string | null;
}) {
  return {
    type: "website" as const,
    locale: "ja_JP",
    siteName: "にいがたサークルベース",
    title,
    description,
    images: [{ url: imageUrl || defaultOgImageUrl }],
  };
}
