import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaUserCheck, FaUserPlus } from "react-icons/fa6";

export default function PeopleYouMayKnowData() {
    return (
        <div className="h-[80px] w-full flex items-center justify-between rounded-[10px] hover:bg-[#f3f3f3] duration-200 px-2 cursor-pointer">
            <div className="flex h-full items-center gap-4">
                <Link href="#" className="h-[45px] w-[45px] rounded-full overflow-hidden">
                    <Image src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" width={100} height={100} alt="userProfileImg" />
                </Link>
                <Link href="#" className="text-[#353535] break-all">Alex xander</Link>
            </div>
            <div className="h-[40px] w-[40px] rounded-full flex justify-center items-center bg-[#e7e9eb] duration-200 hover:bg-[#DDDFE1]">
                <FaUserPlus className="text-[#353535] text-xl" />
            </div>
        </div>
    );
}