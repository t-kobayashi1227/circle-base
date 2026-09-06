// Supabaseプロジェクトを作成・リンクした後、以下のコマンドで自動生成して
// このファイルを置き換えること:
//
//   npx supabase gen types typescript --linked > types/database.ts
//
// マイグレーション適用前の暫定プレースホルダ。
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Database {}
