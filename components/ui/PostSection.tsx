import React from "react";
import CreatePost from "@/components/ui/CreatePost";

export default function PostSection() {
    return (
        <div className="w-[44vw] h-full flex flex-col justify-start items-center">
            <CreatePost />
        </div>
    );
}