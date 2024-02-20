import { nextAuthOptions } from "@/app/lib/next-auth/options";
import NextAuth from "next-auth/next";

// NextAuthの設定を適用し、認証機能を提供するためのAPIルート

// NextAuth.jsインスタンス
const handler = NextAuth(nextAuthOptions);

// HTTPのGETとPOSTメソッドのリクエストを処理するためにエクスポート
export { handler as GET, handler as POST };