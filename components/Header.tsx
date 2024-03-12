"use client";

import { useState } from "react";
import Logo from "@/components/ui/Logo";
import SearchPeople from "@/components/ui/SearchPeople";
import NavBar from "@/components/ui/Navbar";
import HamburgerMenu from "@/components/ui/HamburgerMenu";
import HamburgerPopup from "@/components/ui/HamburgerPopup";

export default function Header() {
    const [openHamburgerMenu, setOpenHamburgerMenu] = useState<boolean>(false);

    return (
        <div className="h-[7vh] flex justify-around items-center max-[480px]:justify-between max-[480px]:px-4">
            <Logo />
            <SearchPeople />
            <NavBar />
            <HamburgerMenu openHamburgerMenu={openHamburgerMenu} setOpenHamburgerMenu={setOpenHamburgerMenu} />
            <HamburgerPopup openHamburgerMenu={openHamburgerMenu} />
        </div>
    );
}