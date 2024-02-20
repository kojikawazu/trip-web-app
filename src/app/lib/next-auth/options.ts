import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../prisma/prisma";

// GitHubを認証プロバイダーとして使用し、Prismaをデータベースアダプターとして統合

/**
 * NextAuth.js(オプション)
 */
export const nextAuthOptions: NextAuthOptions = {
    debug: true,
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
            httpOptions: {
                timeout: 10000,
            },
        }),
    ],
    // Prismaを使用してデータベース操作を行うためのアダプター
    adapter: PrismaAdapter(prisma),
    callbacks: {
        // セッションオブジェクトにユーザーIDを追加
        // フロントエンドでユーザーIDに簡単にアクセスできるようになります。
        session: ({ session, user }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: user.id,
                }
            };
        },
    },
    // NextAuthで使用するセッションとトークンを暗号化するための秘密鍵
    secret: process.env.NEXTAUTH_SECRET,
};