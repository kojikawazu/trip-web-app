"use client";

import { FC, PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

// 子コンポーネントをpropsとして受け取り、それらの子コンポーネントをSessionProviderで
// ラップするカスタムプロバイダーコンポーネントを定義しています。この定義により、NextAuthProviderコンポーネントの
// 内部に配置されたすべてのコンポーネントは、NextAuthによるセッション管理の恩恵を受けることができます。

/**
 * NextAuth.js(プロバイダー)
 * @param param0 
 * @returns 
 */
export const NextAuthProvider: FC<PropsWithChildren> = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>;
};