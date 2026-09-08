# にいがたサークルベース 実装ロードマップ

作成日：2026-09-06
参照仕様書：`spec.md`（にいがたサークルベース MVP仕様書 v2）

このドキュメントは、仕様書と現在のリポジトリの実装状況を照らし合わせ、
今後の実装手順を整理したものです。フェーズを進めるごとに本ファイルの
チェック状態を更新してください。

---

## 1. 現状把握（2026-09-06時点）

### できている（設計レベルで仕様書と一致）
- 全URL構成に対応する画面・コンポーネント一式（一覧・詳細・カテゴリ・エリア・
  マイページ・メッセージ・管理画面まで、UIとしては仕様書のURL設計をほぼ網羅）
- `supabase/migrations/`：`profiles`〜`blocks`の全テーブル、トリガー
  （未成年判定・`updated_at`更新・`touch_conversation`）
- RLSポリシー一式（仕様書4.10節の方針と一致。`profiles_public`ビューで
  実名等を隠す設計も実装済み）
- `supabase/seed.sql`（新潟市9区＋カテゴリ階層の初期マスタ）
- zodバリデーション（`lib/validations/circle-schema.ts`, `profile-schema.ts`ほか）
- react-hook-form / zod / @supabase/ssr / resend の依存関係導入済み
- `proxy.ts` + `lib/supabase/middleware.ts` でセッションリフレッシュの土台実装済み

### 手つかず・要接続（＝「表示のみ」の中身）
1. **Supabase実プロジェクト未接続**：`.env.local`がplaceholder、
   `types/database.ts`もプレースホルダ（`supabase gen types`未実行）。
   マイグレーション自体まだ本番/開発プロジェクトに適用されていない
2. **認証未接続**：signup/loginフォームは`console.info`のTODOのまま。
   `supabase.auth.signUp()` / `signInWithPassword()`、ログイン状態による
   ヘッダー出し分け、mypage配下の未ログイン時リダイレクトが未実装
3. **全画面がモックデータ**：`lib/*-mock-data.ts`を参照しているだけで、
   一覧・詳細・カテゴリ/エリアページ・マイページ・メッセージ・管理画面の
   いずれもSupabaseへの実クエリなし
4. サークルCRUD（新規作成／編集／非公開化／削除）、画像アップロード
   （Storage）、「活動の様子」投稿の書き込み処理が未実装
5. メッセージ機能の実データ連携＋Resendによるメール通知が未実装
6. 通報・ブロック機能の書き込み処理が未実装
7. 管理画面（サークル管理・通報対応・カテゴリ/エリアマスタ管理）の
   実データ連携が未実装
8. SEO対応（動的meta/OGP/sitemap.xml/robots.txt）、Turnstile等の
   Bot対策が未着手

### 仕様書側の未確定事項（実装ギャップとは別管理）
- 初期投稿として運営者自身が野球・登山ジャンルのサークルを2〜3件投稿するか
- ロゴ・カラー・デザインテイスト

---

## 2. 実装フェーズ

- [x] **A. Supabase実接続**（2026-09-06 完了）
  プロジェクト作成 → `.env.local`更新 → マイグレーション適用 →
  `supabase gen types typescript --linked > types/database.ts`
  - project ref: `zxisfvwbxdjbifdysauh`（Tokyo リージョン）
  - `supabase link` 済み、`db push`で`init_schema`/`rls_policies`適用済み、
    `seed.sql`投入済み、`types/database.ts`生成済み

- [x] **B. 認証実装**（2026-09-06 完了）
  signup/login/logoutをSupabase Authに接続、未成年判定・保護者同意の保存、
  ログイン状態のヘッダー出し分け、mypage系のログインガード
  - `components/auth/signup-form.tsx`：`supabase.auth.signUp()`接続。
    `options.data`に`real_name`/`display_name`/`birthdate`/`guardian_consent`を
    載せ、`handle_new_user`トリガーでprofilesへ反映。メール確認が必要な場合は
    確認メール送信案内を表示
  - `components/auth/login-form.tsx`：`supabase.auth.signInWithPassword()`接続
  - `components/mypage/logout-button.tsx`（新規）：`supabase.auth.signOut()`。
    `mypage-nav-sidebar.tsx`に追加
  - `app/mypage/layout.tsx`（新規）：未ログイン時は`/login`へリダイレクト
  - `app/page.tsx` / `components/home/site-header.tsx`：トップページのみ
    ログイン状態でヘッダーを出し分け（ゲスト用 or `LoggedInHeaderNav`）
  - 動作確認：agent-browserで signup（バリデーションエラー表示）→
    Admin APIで確認済みテストユーザー作成 → login →`/mypage`表示 →
    logout →`/`へ遷移・cookie削除 →`/mypage`再アクセスで`/login`へ
    リダイレクトを確認済み
  - **判明した注意点**：Supabaseはデフォルトで`@example.com`等一部ドメインの
    メールアドレスを`email_address_invalid`として拒否する。また無料枠の
    組み込みメール送信は送信数レート制限が厳しい
    （`over_email_send_rate_limit`）。本番運用時はカスタムSMTP
    （Resendなど、フェーズEで使用予定のサービスと共通化可）の設定を推奨
  - **未対応**（今回のスコープ外、他ページは元々モックのためログイン状態と
    無関係にログイン後ナビが表示される設計だった）：`/circles`, `/circle/[slug]`,
    `/category/[slug]`等の公開ページのヘッダーをゲスト/ログイン状態で
    出し分ける対応はフェーズCで実データ化と合わせて行う

- [x] **C. 一覧・詳細系の実データ化**（2026-09-07 完了）
  `/circles`, `/circle/[slug]`, `/area/[areaSlug]`（新規）, `/category/[categorySlug]` を
  モック→Supabaseクエリに置換（検索・絞り込み・並び替え・ページネーション）
  - `lib/circles.ts`（新規）：カテゴリ/エリア取得、サークル一覧検索
    （カテゴリ・エリア・キーワード・並び替え・20件ページング）、詳細取得、
    トップページ新着用取得。`types/database.ts`の型を用いてSupabaseクライアントを
    ジェネリクス化（`lib/supabase/client.ts` / `server.ts` / `middleware.ts`）
  - `/circles`：フィルタ（エリア・カテゴリ）とキーワード検索・並び替え
    （新着順/更新日順）・ページネーションをGETクエリパラメータ駆動で実装
    （`lib/url-params.ts`のhref組み立てヘルパー使用、JS不要でサーバー完結）
  - `/circle/[slug]`：実データ表示に全面書き換え。存在しないslugは404
    （`notFound()`）。ゲストが「メッセージを送る」を押すと`/login`へ遷移
  - `/area/[areaSlug]`：仕様書3.1に記載されていたが未実装だったため新規作成
  - `/category/[categorySlug]`：**カテゴリ一覧がモック独自の架空タクソノミー
    （outdoor-mountain/camping/yoga-pilatesなど仕様書1.3と無関係な9カテゴリ）
    だったため、実際にseed済みの21カテゴリ（大分類3・中分類）に置き換えて
    全面書き換え。旧`components/category/*`（架空データ前提の6コンポーネント）と
    `lib/category-mock-data.ts`は削除
  - トップページ：`new-circles-section.tsx`（新着サークル）、
    `category-grid.tsx`（カテゴリから探す）、`hero-section.tsx`の検索フォームを
    実データ・実検索に接続。`site-header.tsx`同様、`/circles`・`/circle/[slug]`・
    `/category/[slug]`のヘッダーもログイン状態を出し分け（共通化した
    `components/guest-header-nav.tsx`を使用）
  - `lib/*-mock-data.ts`のうち不要になった`circles-list-mock-data.ts` /
    `home-mock-data.ts` / `category-mock-data.ts`を削除
  - **仕様の簡略化・未対応点**（意図的なスコープ調整）：
    - サークルカードの「メンバー数」「いいね数」「初心者歓迎」等のタグは
      DB設計（4章）に存在しない項目のため廃止。種別・活動頻度・開催日など
      実データのみで表示を再設計
    - 単発募集の開催日超過時の自動非表示・ソート降格は未実装
      （仕様書に「フェーズ1では簡易でよい」と明記されている簡略化）
    - サークル画像（Storage）は未接続のため、詳細ページ・カードとも
      プレースホルダー表示のまま（画像アップロードはフェーズD予定）
    - 活動の様子タブは件数のみ実数表示、タブ切り替え自体は未実装
      （投稿機能はフェーズDで実装）
  - **投入した初期データ**：動作確認を兼ねて、運営者アカウント
    （表示名「にいがたサークルベース運営」）名義でサークル3件
    （新潟山歩きの会・角田山ハイキング会・ボードゲーム会）を
    本番同然のDBに投稿済み。ユーザーの意向により初期投稿として維持することを決定
  - 動作確認：agent-browserで一覧の絞り込み（エリア/カテゴリ/キーワード）、
    詳細ページ（継続団体・単発募集の両方）、404、トップページの検索フォーム、
    エリア別・カテゴリ別ランディングページを確認済み

- [x] **D. マイページ（サークルCRUD＋活動の様子）**（2026-09-07 完了）
  新規作成・編集・非公開化・削除、画像アップロード、活動報告投稿
  - `supabase/migrations/20260907000001_storage.sql`（新規）：画像アップロード用の
    公開バケット`circle-media`とパス先頭uid判定によるRLSを追加
    （パス規約：`{uid}/circles/...`, `{uid}/updates/...`, `{uid}/avatar/...`）
  - `lib/storage.ts`（新規）：アップロード・公開URL解決の共通ヘルパー
  - `components/circle-create/circle-form.tsx`（新規）：サークル作成・編集で共通の
    フォーム。旧モックの5ステップウィザード構想（基本情報/詳細情報/募集内容/確認/完了）は
    ステップ2以降が未実装のままだったため廃止し、1ページの実用フォームに統合。
    紹介文・応募資格・開催日など、旧ステップ1に無かった必須項目を追加
  - サークル作成（`/mypage/circles/new`）・編集（`/mypage/circles/[id]/edit`）・
    削除（`CircleDeleteButton`）・非公開化トグル（`CirclePublishToggle`）を実装。
    削除は`circle_images`/`circle_updates`とも`ON DELETE CASCADE`で連動削除
  - 活動の様子投稿（`/mypage/circles/[id]/updates/new`）・一覧
    （`/mypage/circles/[id]/updates`）を実装。`circle_updates`テーブルの実カラム
    （content・image_path・created_at）に合わせ、タイトル/カテゴリ/公開範囲/複数枚
    アップロードなど旧モックにあった非対応項目は廃止
  - 主催中のサークル一覧（`/mypage/circles/owned`）を実データ化。
    「総メンバー数」「今月のメッセージ」等DBに存在しない集計は廃止し、
    「主催中のサークル数」「公開中のサークル数」の実数のみ表示
  - **動作確認**（agent-browser、実際にDBへ作成→編集→活動投稿→削除まで実施）：
    カテゴリ大中カスケード選択・画像アップロード（Storage実接続）・単発募集の
    開催日入力・作成後one_time/ongoingの表示分岐・編集内容の反映・公開↔非公開の
    トグル（公開する方向をUIで確認、非公開にする方向はブラウザのネイティブ確認
    ダイアログが自動化ツールでブロックされるため、REST経由の直接確認で代替検証）・
    削除時のカスケード削除・Storageアップロード成功、いずれも正常動作を確認
  - **未対応（将来フェーズ）**：サークル1枚超の複数ギャラリー画像UI（DBは複数枚
    対応済みだが編集フォームは1枚のみ）、活動の様子のページネーション
    （現状は全件表示）、下書き保存

- [x] **E. メッセージ機能**（2026-09-07 完了）
  スレッド作成・送受信、Resend通知メール
  - `lib/messages.ts`（新規）：`conversations`/`messages`の取得（会話一覧・
    相手の表示名/アバターを`profiles_public`から解決、直近メッセージのプレビュー）
  - サークル詳細ページの「メッセージを送る」を実接続
    （`components/circle-detail/message-owner-button.tsx`新規）：
    既存の会話があればそれを開き、なければ`circle_id`＋参加者2名で新規作成して
    スレッドへ遷移。ゲストは`/login`へ、主催者本人が自分のサークルを見た場合は
    メッセージボタンの代わりに「自分のサークルを管理する」を表示
  - `/mypage/messages`・`/mypage/messages/[id]`を実データ化。3カラム
    （スレッド一覧／チャット／サークル情報）はデスクトップ、モバイルは
    一覧・個別チャットの2画面に分割する既存構成を踏襲
  - `app/api/messages/route.ts`（新規）：メッセージ送信はこのRoute Handler経由に
    統一。理由：メール通知には送信先の`auth.users`のメールアドレスが必要で、
    これは`SUPABASE_SERVICE_ROLE_KEY`でしか読めずクライアントから直接扱えないため、
    「DB挿入はユーザーのセッション（RLS）で行い、メール送信のみ
    `lib/supabase/admin.ts`（新規）のSERVICE_ROLEクライアントで行う」構成にした。
    メール送信はベストエフォート（失敗してもメッセージ送信は成功として扱う）で、
    `RESEND_API_KEY`未設定時（現状の`.env.local`）は安全にスキップされる
  - 会話一覧・チャット画面から、DBに存在しない項目（既読表示・お気に入り・
    新規メッセージ作成・メンバー一覧・ファイル/リンク検索・通知ミュート等）を撤去。
    既読機能は仕様書2.4で明示的にフェーズ2以降とされている項目
  - 動作確認：2つのテストアカウント（別セッション）で実際に
    サークル詳細ページ→メッセージ送信→会話新規作成→主催者側での受信→返信、
    ゲストは`/login`へ誘導、主催者本人は自分のサークルで管理リンクが出ることを確認
  - **未対応（将来フェーズ）**：既読機能（仕様書どおりフェーズ2）、
    通報・ブロック（フェーズFで実装、メッセージ画面のブロック導線もその際追加）、
    実際のメール送信確認（本番運用前に`RESEND_API_KEY`の設定と送信ドメイン認証が必要）

- [x] **F. 通報・ブロック機能**（2026-09-07 完了）
  通報作成、ブロック登録/解除
  - `components/report-dialog.tsx`（新規）：`target_type`（circle/user）を
    受け取る汎用の通報ダイアログ。`reports`テーブルへ直接insert
    （`reporter_id`はRLSで本人固定）。ゲストはクリック時に`/login`へ誘導
  - サークル詳細ページの「このサークルを通報する」を実接続（ログイン済み・
    非オーナーのみ表示）
  - メッセージ画面（`CircleInfoSidebar`＝デスクトップ、新規
    `MobileThreadActions`＝モバイル）に「通報する」（相手ユーザーを通報）
    「ブロックする」を追加
  - `components/messages/block-user-button.tsx` / `lib/blocks.ts` / 
    `components/mypage/unblock-button.tsx`（いずれも新規）
  - `/mypage/blocked-users`（新規。仕様書のURL設計にはあったが未実装だった）：
    ブロック中ユーザー一覧・解除
  - ブロック済みユーザーからの新規メッセージ拒否は、フェーズB時点で
    マイグレーション済みのRLS（`messages_insert_participant_not_blocked`）が
    そのまま効くため、アプリ側の追加実装は不要だった
  - 動作確認：実際に別アカウントでサークルを通報→`reports`テーブルへの
    反映を確認、メッセージ画面から相手を通報・ブロック→ブロック一覧に反映を
    確認、ブロック後に相手（ブロックされた側）が新規メッセージを送信しようと
    すると`/api/messages`が500エラーを返しRLSで拒否されることをAPI直叩きで確認
  - **未対応（フェーズGで実装予定）**：管理者向け通報対応画面
    （`/admin/reports`は既存のモックのまま。今回作成した`reports`データを
    確認・ステータス更新できるようにするのは次フェーズ）

- [x] **G. 管理画面**（2026-09-07 完了）
  サークル管理・通報対応・カテゴリ/エリアマスタ管理（`is_admin`判定）
  - `app/admin/login`（新規）＋`app/admin/(protected)/`（ルートグループで新規）：
    `/admin/login`はガード対象外、それ以外の`/admin/*`は
    `app/admin/(protected)/layout.tsx`でログイン必須かつ`profiles.is_admin`必須に。
    管理者権限がないアカウントでログインを試みるとサインアウトの上エラー表示
  - `lib/admin.ts`（新規）：`getAdminStats`（実ユーザー数・公開/非公開サークル数・
    未対応通報数）、`getAdminCircles`（全サークル＋主催者名）、`getAdminReports`
    （通報＋対象・通報者の名前解決）。型・定数は`lib/admin-types.ts`に分離
    （クライアントコンポーネントがサーバー専用コードを巻き込まないための対応。
    同様に`lib/circles.ts`の純粋関数も`lib/circles-format.ts`に分離した）
  - ダッシュボード（`/admin`）：モックだった成長グラフ・サークル承認待ち・
    お知らせ管理カードを撤去（フェーズ1の「事前審査なし即時公開」方針と矛盾する
    承認ワークフローや、DBに存在しないお知らせ機能だったため）。実数の統計と
    未対応の通報一覧のみ表示
  - `/admin/circles`（新規）：全サークル一覧（公開状態フィルタ・検索）、
    主催者名表示、公開⇔非公開切り替え、削除
  - `/admin/reports`：モックだった管理画面を実データ化。DBのstatus値
    （pending/in_progress/resolved）に合わせて選択肢を修正し、対応ステータス
    更新と、通報対象がサークルの場合の「対象のサークルを非公開にする」
    ショートカットを追加
  - `/admin/categories`・`/admin/areas`（新規）：大中カテゴリ・エリアの
    名称変更・追加・削除
  - ナビゲーション（`AdminNavSidebar`/`AdminMobileBottomNav`）も、存在しない
    ユーザー管理・お知らせ管理・サイト設定・ログ管理などのメニューを削除し、
    実装済みの4項目（サークル管理・通報対応・カテゴリ管理・エリア管理）のみに整理
  - 動作確認：一般アカウントでの管理者ログイン試行が拒否されること、
    運営者アカウント（`is_admin=true`を付与）でのログイン、ダッシュボードの
    実数表示、サークルの公開⇔非公開切り替え、通報のステータス更新、
    カテゴリ／エリアの追加・リネーム・削除をすべてブラウザ操作で確認済み
  - **未対応（今回のスコープ外）**：ユーザー管理画面（仕様書2.3にはそもそも
    含まれていない。通報経由でのユーザー対応のみが仕様範囲）

- [x] **H. 非機能対応**（2026-09-07 完了、Turnstileのみユーザー判断により見送り）
  動的meta/OGP/sitemap/robots、Turnstile検討
  - `app/sitemap.ts`（新規）：公開中サークル・カテゴリ・エリア・静的ページを
    実データから動的生成。Cookieに依存しない匿名クライアント
    （`lib/supabase/public.ts`新規）を使うことで、ビルド時に静的プリレンダー
    可能にした上で`revalidate = 3600`により1時間ごとに再生成（デプロイなしで
    新規サークル等を反映）
  - `app/robots.ts`（新規）：`/admin`・`/mypage`・`/api`を除きクロール許可、
    sitemapを参照
  - `app/layout.tsx`：`metadataBase`とサイト共通のOGP/Twitterカード
    （og:type・og:site_name・og:locale・デフォルト画像）を追加
  - `lib/seo.ts`（新規）：ページ単位の`generateMetadata`がopenGraphを指定すると
    親レイアウトの値を継承せず丸ごと上書きしてしまうNext.jsの仕様に対応する
    ための共通ヘルパー（画像未設定時はサイトデフォルト画像にフォールバック）
  - `/circles`・`/circle/[slug]`・`/category/[categorySlug]`・`/area/[areaSlug]`
    のmetadataに説明文とOGP（サークル詳細は本人のアップロード画像があれば
    それを使用）を追加
  - 動作確認：`/sitemap.xml`・`/robots.txt`の実データ反映、サークル詳細ページの
    og:title/og:description/og:image等の出力をcurlで確認済み
  - **Turnstile**：ユーザーに確認の上、今回は見送り（Cloudflareのアカウント・
    サイトキー発行が必要なため）。会員登録・サークル作成フォームへの導入は
    将来サイトキーが用意され次第、追加実装で対応可能
  - **未対応（今回のスコープ外）**：Lighthouseスコアの実測（実際のホスティング
    環境で計測すべきためフェーズIのデプロイ後に確認を推奨）。アクセシビリティの
    専用監査パス（フォームのlabel紐付け等はフェーズB・D・E構築時点で基本的に
    満たしているが、独立した監査は未実施）

- [ ] **I. マイページトップ・設定・お問い合わせの実データ化**
  フェーズB〜Gの対象外だったため見落とされていた画面群。
  現状の問題点：
  - `/mypage`：`ProfileCard`/`MembershipCard`/`QuickMenu`/
    `JoinedCirclesSection`/`UpcomingEventsSection`/`NoticesCard`/
    `ActivitiesCard`が全て`lib/mypage-mock-data.ts`参照。誰でログインしても
    同じ架空プロフィール（表示名・参加数・いいね数等）が表示される
  - `/mypage/settings`：`AccountInfoCard`/`NotificationSettingsCard`/
    `AccountDeleteCard`が`lib/account-settings-mock-data.ts`のまま。
    `PasswordChangeCard`は送信処理が`console.info`のTODO止まり
  - `/mypage/profile`：`profile-form.tsx`も同様に送信処理がTODO止まり
    （`supabase`未接続）
  - `/contact`：`ContactForm`の送信処理がTODO止まり（Resend未接続）。
    `ContactFaqCard`/`ContactChecklistCard`は静的モック文言のまま
  - リンク切れ：`/reset-password`（`login-form.tsx`からリンクあり）、
    `/mypage/circles/joined`（`joined-circles-section.tsx`からリンクあり）、
    `/mypage/events`（`upcoming-events-section.tsx`からリンクあり）が
    いずれもページ未作成
  想定対応：
  1. `/mypage`トップを実データ化。プロフィール統計（参加中/主催中サークル数、
     もらったいいね等DBにない項目は`lib/circles.ts`等と同様に廃止 or
     実カラムに置換）、参加中サークル一覧（`/mypage/circles/joined`を新規
     作成し、`circle_members`等の参加テーブルが未設計なら仕様書を確認して
     設計要否を判断）、お知らせ（DBに存在しなければ機能ごと撤去）
  2. `/mypage/events`は「参加予定イベント」が単発募集サークルの開催日を指す
     想定か仕様書で確認し、実データ化 or リンク自体を撤去
  3. `/mypage/settings`：`AccountInfoCard`はログイン中ユーザーの実メール/
     登録日等に置換、`NotificationSettingsCard`は通知設定テーブルが
     DBに無ければスコープ外として撤去、`AccountDeleteCard`は
     退会処理（Supabase Auth削除＋関連データ削除）を実装
  4. `PasswordChangeCard`・`profile-form.tsx`：`supabase.auth.updateUser()`・
     `profiles`テーブルの`update()`に接続
  5. `/reset-password`：`supabase.auth.resetPasswordForEmail()`を使った
     パスワードリセットフロー（メール送信→トークン付きページで再設定）を新規作成
  6. `ContactForm`：Resend接続（フェーズEの`lib/supabase/admin.ts`と
     同様の構成を流用可）。またはSupabaseに`contact_messages`テーブルを
     追加してDB保存＋管理画面で確認できるようにするかを検討
  7. Googleログイン：`login-form.tsx`の「Googleでログイン」ボタンは
     外部OAuth設定が未着手のため一旦非表示にした。実装時はGoogle Cloud
     ConsoleでOAuthクライアントID/シークレットを取得のうえ、
     `supabase/config.toml`に`[auth.external.google]`ブロックを追加
     （`[auth.external.apple]`が参考テンプレートになる）、環境変数を設定、
     `supabase.auth.signInWithOAuth({ provider: "google" })`で呼び出し、
     `/app/auth/callback/route.ts`（`exchangeCodeForSession`でセッション
     交換）を新規作成する必要がある。`signup-form.tsx`側にもボタンを
     追加するかは要検討

- [ ] **J. デプロイ**
  Vercel接続・独自ドメイン
  （最後）

---

## 3. 次のアクション

フェーズIから着手。特に`/mypage`トップは最も通る導線が架空データの
ままになっているため優先度が高い。参加中サークル・お知らせ等、DB設計
（4章）に対応カラム/テーブルが無い項目は「廃止するか、テーブル追加が
必要か」をユーザーに確認してから着手する。
