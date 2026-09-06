import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMessageNotification(params: {
  to: string;
  senderDisplayName: string;
  circleName: string | null;
  conversationUrl: string;
}) {
  const { to, senderDisplayName, circleName, conversationUrl } = params;

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
