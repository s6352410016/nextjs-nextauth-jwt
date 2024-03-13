import React from "react";
import { useSession } from "next-auth/react";
import PeopleYouMayKnow from "@/components/ui/PeopleYouMayKnow";
import PostSection from "@/components/ui/PostSection";

export default function Body() {
    const { data: session, status } = useSession();

    return (
        <div className="h-[93vh] bg-[#f5f6f7] p-4">
            <div className="h-full flex gap-4 my-0 mx-auto max-w-[1400px]">
                <PeopleYouMayKnow />
                <PostSection />
                <h1 className="w-[28vw]">Hello {session?.user?.firstname} {session?.user?.lastname} {session?.user?.name} status {status}</h1>
            </div>
        </div>
    );
}