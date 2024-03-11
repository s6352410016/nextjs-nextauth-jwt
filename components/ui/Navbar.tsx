import { useState } from "react";
import { FaBell } from "react-icons/fa";
import { BsChatFill } from "react-icons/bs";
import { RiArrowDownSLine } from "react-icons/ri";
import NotificationPopup from "@/components/ui/NotificationPopup";
import Link from "next/link";

export default function NavBar() {
    const [openNotification, setOpenNotification] = useState<boolean>(false);

    return (
        <nav className="w-[300px] h-full flex justify-center items-center">
            <ul className="w-full h-full flex justify-center items-center gap-4">
                <li onClick={() => setOpenNotification(true)} className="relative w-[45px] h-[45px] bg-[#e7e9eb] rounded-full flex justify-center items-center hover:bg-[#DADDE1] cursor-pointer duration-200">
                    <FaBell className="text-[#353535]" />
                    {openNotification && <NotificationPopup setOpenNotification={setOpenNotification} />}
                </li>
                <li className="w-[45px] h-[45px] bg-[#e7e9eb] rounded-full flex justify-center items-center hover:bg-[#DADDE1] cursor-pointer duration-200">
                    <Link href="/chat"><BsChatFill className="text-[#353535]" /></Link>
                </li>
                <li className="w-[45px] h-[45px] bg-[#e7e9eb] rounded-full flex justify-center items-center hover:bg-[#DADDE1] cursor-pointer duration-200">
                    <RiArrowDownSLine className="text-[#353535] text-3xl" />
                </li>
            </ul>
        </nav>
    );
}