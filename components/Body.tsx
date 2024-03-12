import React from "react";
import { useSession } from "next-auth/react";

export default function Body() {
    const { data: session, status } = useSession();

    return (
        <div className="h-[93vh] bg-[#f5f6f7]">
            <h1>Hello {session?.user?.firstname} {session?.user?.lastname} {session?.user?.name} status {status}</h1>
        </div>
    );
}