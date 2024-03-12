"use client";

import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import SearchPeopleData from "@/components/ui/SearchPeopleData";
import { useRouter } from "next/navigation";

const users = [
    {
        img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        name: "bell bunlung"
    },
    {
        img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        name: "alex xander"
    },
    {
        img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        name: "dj poom eiei"
    },
    {
        img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        name: "pop naikaty eiei"
    },
];

export default function FindPeoplePage() {
    const [userLength, setUserLength] = useState<number>(0);
    const [search, setSearch] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        document.title = "bynsocial | find-people";
    }, []);

    useEffect(() => {
        if (search.trim() !== "") {
            setUserLength(users.filter((user) => user.name.toLowerCase().includes(search.trim().toLowerCase())).length);
        } else {
            setUserLength(0);
        }
    }, [search]);

    return (
        <div className="w-screen h-screen flex flex-col items-center p-4">
            <div className="w-full h-[50px] flex justify-between items-center">
                <div onClick={() => router.push("/feed")} className="w-[40px] h-[40px] flex justify-center items-center">
                    <MdKeyboardArrowLeft className='text-[#353535] text-4xl' />
                </div>
                <div className="flex-grow h-full rounded-full bg-[#f5f6f7] hover:bg-[#DADDE1] duration-200 flex items-center justify-around p-2">
                    <IoSearchSharp className="text-[#353535] text-xl" />
                    <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search people" className="w-full h-full outline-none text-[#353535] text-[0.8rem] bg-transparent px-[5px] placeholder:text-[0.8rem]" />
                </div>
            </div>
            <div className="border border-solid border-gray-200 mt-4 w-full"></div>
            <div className="w-full h-full overflow-y-scroll cursor-pointer mt-4">
                {userLength !== 0
                    ?
                    users.filter((user) => {
                        return user.name.toLowerCase().includes(search.trim().toLowerCase());
                    }).map((user, index) => {
                        return <SearchPeopleData key={index} img={user.img} name={user.name} />;
                    })
                    :
                    <p className="text-center text-[#353535] max-[480px]:text-[0.8rem]">User not found</p>
                }
            </div>
        </div>
    );
}