"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaImages, FaPlayCircle } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import Modal from "@/components/ui/Modal";

export default function CreatePost() {
    const [openCreatePostModal, setOpenCreatePostModal] = useState<boolean>(false);

    return (
        <div className="w-full h-[130px] bg-[#fff] rounded-[10px] flex flex-col gap-4 items-center justify-center p-4">
            <div className="w-full h-[65px] flex justify-between items-center gap-2">
                <Link href="#" className="w-[50px] h-[45px] rounded-full overflow-hidden">
                    <Image src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" width={100} height={100} alt="userProfileImg" />
                </Link>
                <div onClick={() => setOpenCreatePostModal(true)} className="w-full h-full rounded-full bg-[#f5f6f7] duration-200 hover:bg-[#e7e9eb] cursor-pointer flex justify-start items-center px-4">
                    <p className="text-gray-500">What's happening</p>
                </div>
            </div>
            <div className="w-full h-[65px] flex justify-around items-center">
                <div onClick={() => setOpenCreatePostModal(true)} className="w-[80px] h-full flex justify-center items-center gap-2 cursor-pointer">
                    <FaImages className="text-[#57cb6e] text-xl" /><span className="text-[#57cb6e]">Photo</span>
                </div>
                <div onClick={() => setOpenCreatePostModal(true)} className="w-[80px] h-full flex justify-center items-center gap-2 cursor-pointer">
                    <FaPlayCircle className="text-[#bb34d3] text-xl" /><span className="text-[#bb34d3]">Video</span>
                </div>
                <div onClick={() => setOpenCreatePostModal(true)} className="w-[80px] h-full flex justify-center items-center gap-2 cursor-pointer">
                    <MdEmojiEmotions className="text-[#ef4040] text-xl" /><span className="text-[#ef4040]">Emoji</span>
                </div>
                <button onClick={() => setOpenCreatePostModal(true)} className="w-[100px] h-full bg-[#1982ff] rounded-[5px] hover:bg-[#0d6efd] duration-200 text-[#fff]">Create post</button>
            </div>
            {openCreatePostModal && <Modal setOpenCreatePostModal={setOpenCreatePostModal} />}
        </div>
    );
}