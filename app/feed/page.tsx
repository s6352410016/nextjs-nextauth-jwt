"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Body from "@/components/Body";

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
                <Body />
            </>
        );
    }
}