"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

export default function FeedPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status]);

    useEffect(() => {
        document.title = "bynsocial | feed";
    }, []);

    if (session && session?.user && status === "authenticated") {
        return (
            <>
                <Header />
                <h1>Hello {session.user.firstname} {session.user.lastname} {session.user?.name} status {status}</h1>
                <button onClick={() => signOut({ callbackUrl: "/" })} className="w-[70px] h-[35px] bg-blue-500 rounded-[5px] text-white">Signout</button>
            </>
        );
    }
}