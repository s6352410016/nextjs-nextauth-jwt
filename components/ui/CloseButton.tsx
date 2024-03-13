import React from "react";
import { HiOutlineXMark } from "react-icons/hi2";

interface CloseButtonProp {
    onClick?: () => void;
}

export default function CloseButton({ onClick }: CloseButtonProp) {
    return (
        <div onClick={onClick} className="absolute top-[10px] right-[10px] w-[40px] h-[40px] bg-[#e7e9eb] rounded-full flex justify-center items-center cursor-pointer duration-200 hover:bg-[#DADDE1]">
            <HiOutlineXMark className="text-2xl text-[#353535]" />
        </div>
    );
}