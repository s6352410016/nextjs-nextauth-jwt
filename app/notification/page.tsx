"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdKeyboardArrowLeft } from "react-icons/md";
import NotificationData from "@/components/ui/NotificationData";

const notifications = [
    {
        img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        name: "bell bunlung",
        detail: "create post",
        createdAt: "1 minute"
    },
    {
        img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        name: "bell bunlung",
        detail: "create post",
        createdAt: "1 minute"
    }
];

export default function NotificationPage() {
    const router = useRouter();

    useEffect(() => {
        document.title = "bynsocial | notification";
    }, []);

    return (
        <div className="w-screen h-screen flex flex-col items-center p-4">
            <div className="w-full h-[50px] flex justify-center items-center relative">
                <div onClick={() => router.push("/feed")} className="absolute top-[50%] translate-y-[-50%] left-0 w-[40px] h-[40px] flex justify-center items-center">
                    <MdKeyboardArrowLeft className='text-[#353535] text-4xl' />
                </div>
                <p className="text-[#353535] text-base">Notifications</p>
            </div>
            <div className="border border-solid border-gray-200 mt-4 w-full"></div>
            <div className="w-full h-full overflow-y-scroll cursor-pointer mt-2">
                {notifications.map((noti, index) => (
                    <NotificationData key={index} img={noti.img} name={noti.name} detail={noti.detail} createdAt={noti.createdAt} />
                ))}
            </div>
        </div>
    );
}