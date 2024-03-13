"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEarthAmericas } from "react-icons/fa6";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { PiLockKeyFill } from "react-icons/pi";
import CloseButton from "@/components/ui/CloseButton";
import OptionCreatePostPopup from "@/components/ui/OptionCreatePostPopup";
import { MdEmojiEmotions } from "react-icons/md";

interface ModalProp {
    setOpenCreatePostModal: (value: React.SetStateAction<boolean>) => void;
}

export default function Modal({ setOpenCreatePostModal }: ModalProp) {
    const [openOptionCreatePostPopup, setOpenOptionCreatePostPopup] = useState<boolean>(false);
    const [textOptionCreatePostPopup, setTextOptionCreatePostPopup] = useState<"Public" | "Private">("Public");

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,_0,_0,_.3)] flex justify-center items-center">
            <div className="relative w-[500px] h-[500px] bg-[#fff] rounded-[10px] p-4 flex flex-col justify-start items-center gap-4">
                <p className="text-[#353535] text-lg font-bold">Create post</p>
                <CloseButton onClick={() => setOpenCreatePostModal(false)} />
                <div className="border border-solid border-gray-200 w-full"></div>
                <div className="relative w-full h-[50px] flex justify-start items-center gap-2">
                    <Link href="#" className="w-[45px] h-[45px] rounded-full overflow-hidden">
                        <Image src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" width={100} height={100} alt="userProfileImg" />
                    </Link>
                    <div className="break-all h-full flex flex-col justify-center items-start">
                        <Link href="#" className="h-[25px] text-[#353535]">Bell bunlung</Link>
                        <div onClick={() => setOpenOptionCreatePostPopup(!openOptionCreatePostPopup)} className="relative bg-[#e7e9eb] h-[25px] rounded-[5px] flex justify-start items-center p-2 gap-[5px] cursor-pointer duration-200 hover:bg-[#DADDE1]">
                            {textOptionCreatePostPopup === "Private" && <PiLockKeyFill className="text-[#353535] text-sm" />}
                            {textOptionCreatePostPopup === "Public" && <FaEarthAmericas className="text-[#353535] text-sm" />}
                            <p className="text-[#353535] text-xs font-semibold">{textOptionCreatePostPopup}</p>
                            {openOptionCreatePostPopup
                                ?
                                <TiArrowSortedUp className="text-[#353535] text-sm" />
                                :
                                <TiArrowSortedDown className="text-[#353535] text-sm" />
                            }
                            {
                                openOptionCreatePostPopup &&
                                <OptionCreatePostPopup
                                    setOpenOptionCreatePostPopup={setOpenOptionCreatePostPopup}
                                    setTextOptionCreatePostPopup={setTextOptionCreatePostPopup}
                                    textOptionCreatePostPopup={textOptionCreatePostPopup}
                                />
                            }
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-[35px] h-[35px] rounded-full cursor-pointer flex justify-center items-center bg-[#f3f3f3] duration-200 hover:bg-[#e7e9eb]">
                        <MdEmojiEmotions className="text-[#ef4040] text-2xl" />
                    </div>
                </div>
                <textarea style={{ scrollbarWidth: "thin" }} className="mt-[10px] outline-none w-full h-[100px] text-[#353535] resize-none" placeholder="Write something"></textarea>
            </div>
        </div>
    );
}