import Image from "next/image";
import Link from "next/link";
import { IoSearchSharp } from "react-icons/io5";
import { FaBell, FaUserEdit, FaSignOutAlt } from "react-icons/fa";
import { BsChatFill } from "react-icons/bs";
import { useSession, signOut } from "next-auth/react";

interface HamburgerPopupProp {
    openHamburgerMenu: boolean;
}

export default function HamburgerPopup({ openHamburgerMenu }: HamburgerPopupProp) {
    const { data: session, status } = useSession();

    if (session && session?.user && status === "authenticated") {
        return (
            <div style={{ right: `${openHamburgerMenu ? "0" : "-500px"}` }} className={`bg-[#fff] fixed z-40 top-0 right-[500px] duration-300 w-full h-full hidden max-[480px]:flex max-[480px]:flex-col max-[480px]:justify-start`}>
                <Link href="#" className="w-full h-[7vh] flex justify-start items-center px-4 bg-[#fff]">
                    <div className="h-full flex items-center gap-2">
                        <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                            <Image src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" width={100} height={100} alt="userProfileImg" />
                        </div>
                        <p className="text-[#353535] text-[0.8rem]">{session.user.firstname} {session.user.lastname} {session.user.name}</p>
                    </div>
                </Link>
                <div className="border border-solid border-gray-200 w-full"></div>
                <Link href="/find-people" className="w-full h-[7vh] flex justify-start items-center pl-4 gap-4 hover:bg-[#DADDE1] duration-200">
                    <IoSearchSharp className="text-[#353535] text-base" /> <p className="text-[#353535] text-[0.8rem]">Search people</p>
                </Link>
                <Link href="/notification" className="w-full h-[7vh] flex justify-start items-center hover:bg-[#DADDE1] duration-200 pl-4 gap-4">
                    <FaBell className="text-[#353535] text-base" /> <p className="text-[#353535] text-[0.8rem]">Notifications</p>
                </Link>
                <Link href="#" className="w-full h-[7vh] flex justify-start items-center hover:bg-[#DADDE1] duration-200 pl-4 gap-4">
                    <BsChatFill className="text-[#353535] text-base" /> <p className="text-[#353535] text-[0.8rem]">Chat</p>
                </Link>
                <Link href="#" className="w-full h-[7vh] flex justify-start items-center hover:bg-[#DADDE1] duration-200 pl-4 gap-4">
                    <FaUserEdit className="text-[#353535] text-base" /> <p className="text-[#353535] text-[0.8rem]">Profile</p>
                </Link>
                <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full h-[7vh] flex justify-start items-center hover:bg-[#DADDE1] duration-200 pl-4 gap-4">
                    <FaSignOutAlt className="text-[#353535] text-base" /> <p className="text-[#353535] text-[0.8rem]">Signout</p>
                </button>
            </div>
        );
    }
}