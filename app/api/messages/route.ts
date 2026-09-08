import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendMessageNotification } from "@/lib/email/send-message-notification";

// メッセージ送信エンドポイント。
// 送信者宛のメール通知には auth.users のメールアドレスが必要で、これは
// SERVICE_ROLE権限でしか読めないため、DB挿入自体はユーザーのセッション（RLS）で行い、
// 通知メール送信のみ管理者クライアントを使う、という構成にしている。
export async function POST(request: Request) {
  let body: { conversationId?: string; content?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const conversationId = body.conversationId;
  const content = body.content?.trim();

  if (!conversationId || !content) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { data: conversation, error: convError } = await supabase
    .from("conversations")
    .select("*, circle:circles(name)")
    .eq("id", conversationId)
    .maybeSingle();

  if (convError || !conversation) {
    return NextResponse.json({ error: "conversation_not_found" }, { status: 404 });
  }
  if (conversation.participant_a !== user.id && conversation.participant_b !== user.id) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const { data: message, error: insertError } = await supabase
    .from("messages")
    .insert({ conversation_id: conversationId, sender_id: user.id, content })
    .select()
    .single();

  if (insertError || !message) {
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }

  // メール通知はベストエフォート。失敗してもメッセージ送信自体は成功として扱う。
  try {
    const recipientId = conversation.participant_a === user.id ? conversation.participant_b : conversation.participant_a;
    const admin = createAdminClient();
    const [{ data: recipientAuth }, { data: senderProfile }] = await Promise.all([
      admin.auth.admin.getUserById(recipientId),
      supabase.from("profiles_public").select("display_name").eq("id", user.id).maybeSingle(),
    ]);

    const recipientEmail = recipientAuth?.user?.email;
    if (recipientEmail && process.env.RESEND_API_KEY) {
      await sendMessageNotification({
        to: recipientEmail,
        senderDisplayName: senderProfile?.display_name ?? "サークルベースの会員",
        circleName: conversation.circle?.name ?? null,
        conversationUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/mypage/messages/${conversationId}`,
      });
    }
  } catch (err) {
    console.error("sendMessageNotification failed", err);
  }

  return NextResponse.json({ message });
}
