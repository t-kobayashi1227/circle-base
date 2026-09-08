import { Resend } from "resend";

export async function sendMessageNotification(params: {
  to: string;
  senderDisplayName: string;
  circleName: string | null;
  conversationUrl: string;
}) {
  if (!process.env.RESEND_API_KEY) return;

  const { to, senderDisplayName, circleName, conversationUrl } = params;
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "にいがたサークルベース <notify@niigata-circlebase.jp>",
    to,
    subject: `${senderDisplayName}さんからメッセージが届いています`,
    text: [
      `${senderDisplayName}さんからメッセージが届きました。`,
      circleName ? `（${circleName} 経由）` : null,
      "",
      `返信はこちらから: ${conversationUrl}`,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}
