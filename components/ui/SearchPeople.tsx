"use client";

import { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import SearchPeoplePopup from "@/components/ui/SearchPeoplePopup";

export default function SearchPeople() {
    const [openSearhPeopleResult, setOpenSearchPeopleResult] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        if (search.trim() !== "") {
            setOpenSearchPeopleResult(true);
        } else {
            setOpenSearchPeopleResult(false);
        }
    }, [search]);

    return (
        <>
            <div className="w-[500px] h-full relative flex justify-center items-center max-[480px]:hidden">
                <form className="w-full h-[45px] flex justify-around items-center bg-[#f5f6f7] rounded-[2rem] p-2 hover:bg-[#e7e9eb] duration-300">
                    <IoSearchSharp className="text-2xl mx-2 text-[#353535]" />
                    <input onChange={(e) => setSearch(e.target.value)} type="text" className="outline-none flex-grow bg-transparent pr-2 text-[#353535] text-[1.1rem] max-[480px]:placeholder:text-[0.8rem]" placeholder="Search people" />
                </form>
                {openSearhPeopleResult && <SearchPeoplePopup search={search} setOpenSearchPeopleResult={setOpenSearchPeopleResult} />}
            </div>
        </>
    );
}