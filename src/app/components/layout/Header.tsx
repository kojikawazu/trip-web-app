import React from 'react';
import Link from 'next/link';
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/lib/next-auth/options";
import { UserType } from "@/app/types/types";

const Header = async () => {
    const session = await getServerSession(nextAuthOptions);
    const user = session?.user as UserType;

    return (
        <header className="bg-slate-600 text-gray-100 shadow-lg">
            <nav className="flex items-center justify-between p-4">
                <Link href={"/"} className="text-xl font-bold">
                    Trip Web
                </Link>
                <div className="flex items-center gap-1">
                    <Link
                        href="/"
                        className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                        ホーム
                    </Link>
                    <Link
                        href={user ? "/profile" : "/api/auth/signin"}
                        className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                        {user ? "プロフィール" : "ログイン"}
                    </Link>

                    {user
                        ? <Link href={"/api/auth/signout"}>
                            ログアウト
                        </Link>
                        : ""
                    }
                </div>
            </nav>
        </header>
    );
};

export default Header;