import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/layout/Header";
import { NextAuthProvider } from "./lib/next-auth/provider";
import LoadingSpinner from "./components/loading/LoadingSpinner";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trip Web",
  description: "Trip Web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Header />
          <Suspense fallback={<LoadingSpinner />}>
            {children}
          </Suspense>
        </NextAuthProvider>
      </body>
    </html>
  );
}
