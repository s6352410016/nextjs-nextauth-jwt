import React from 'react';
import { GiHamburgerMenu } from "react-icons/gi";

interface HamburgerMenuProp {
    openHamburgerMenu: boolean;
    setOpenHamburgerMenu: (value: React.SetStateAction<boolean>) => void;
}

export default function HamburgerMenu({ openHamburgerMenu, setOpenHamburgerMenu }: HamburgerMenuProp) {
    return (
        <div onClick={() => setOpenHamburgerMenu(!openHamburgerMenu)} className="relative z-50 w-[60px] h-[60px] hidden max-[480px]:flex max-[480px]:justify-end max-[480px]:items-center">
            <GiHamburgerMenu className="text-[#353535] text-xl" />
        </div>
    );
}
