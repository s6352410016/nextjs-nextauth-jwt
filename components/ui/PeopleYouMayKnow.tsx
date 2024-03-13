import React from "react";
import PeopleYouMayKnowData from "@/components/ui/PeopleYouMayKnowData";

export default function PeopleYouMayKnow() {
    return (
        <div className="w-[28vw] h-full bg-[#fff] p-4 rounded-[10px] flex flex-col justify-start items-center">
            <p className="text-lg text-[#353535] text-center font-bold">People you may know</p>
            <div className="border border-solid border-gray-200 my-4 w-full"></div>
            <div style={{ scrollbarWidth: "thin" }} className="w-full h-full overflow-y-auto">
                <PeopleYouMayKnowData />
                <PeopleYouMayKnowData />
                <PeopleYouMayKnowData />
                <PeopleYouMayKnowData />
                <PeopleYouMayKnowData />
                <PeopleYouMayKnowData />
                <PeopleYouMayKnowData />
                <PeopleYouMayKnowData />
                <PeopleYouMayKnowData />
                <PeopleYouMayKnowData />
                <PeopleYouMayKnowData />
                <PeopleYouMayKnowData />
            </div>
        </div>
    );
}
