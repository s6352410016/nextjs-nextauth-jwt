import React, { useEffect, useRef } from 'react';
import { FaUserEdit, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";

interface SettingOptionsPopupProp {
    setOpenSettingOptionsPopup: (value: React.SetStateAction<boolean>) => void;
}

export default function SettingOptionsPopup({ setOpenSettingOptionsPopup }: SettingOptionsPopupProp) {
    const settingOptionsPopupContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const targetClickHandler = (e: MouseEvent) => {
            if (settingOptionsPopupContainerRef.current && !settingOptionsPopupContainerRef.current?.contains(e.target as Node)) {
                setOpenSettingOptionsPopup(false);
            }
        }
        document.addEventListener("mousedown", targetClickHandler);

        return () => {
            document.removeEventListener("mousedown", targetClickHandler);
        }
    }, []);

    return (
        <div ref={settingOptionsPopupContainerRef} className='absolute top-[120%] right-0 w-[130px] h-[100px] shadow-[0_4px_16px_rgba(17,17,26,.05),_0_8px_32px_rgba(17,17,26,.05)] rounded-[10px] bg-[#fff] flex flex-col justify-center overflow-hidden'>
            <button className='h-[50px] w-full flex justify-start items-center pl-4 gap-2 text-[#353535] hover:bg-[#DADDE1] duration-200'><FaUserEdit className='text-xl text-[#353535]' />Profile</button>
            <button onClick={() => signOut({ callbackUrl: "/" })} className='h-[50px] w-full flex justify-start items-center pl-4 gap-2 text-[#353535] hover:bg-[#DADDE1] duration-200'><FaSignOutAlt className='text-[1.1rem] text-[#353535]' />Signout</button>
        </div>
    );
}