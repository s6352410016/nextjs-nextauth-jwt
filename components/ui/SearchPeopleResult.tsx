import React, { useEffect, useState, useRef } from "react";
import SearchPeopleData from "@/components/ui/SearchPeopleData";

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

interface SearchPeopleResultProp {
    search: string;
    setOpenSearchPeopleResult: (value: React.SetStateAction<boolean>) => void;
}

export default function SearchPeopleResult({ search, setOpenSearchPeopleResult }: SearchPeopleResultProp) {
    const [userLength, setUserLength] = useState<number>(0);
    const searchPeopleResultContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setUserLength(users.filter((user) => user.name.toLowerCase().includes(search.trim().toLowerCase())).length);
    }, [search]);

    useEffect(() => {
        const targetClickHandler = (e: MouseEvent) => {
            if (searchPeopleResultContainerRef.current && !searchPeopleResultContainerRef.current?.contains(e.target as Node)) {
                setOpenSearchPeopleResult(false);
            }
        }
        document.addEventListener("mousedown", targetClickHandler);

        return () => {
            document.removeEventListener("mousedown", targetClickHandler);
        }
    }, []);

    return (
        <div ref={searchPeopleResultContainerRef} className={`absolute top-[100%] w-full ${userLength > 3 ? "h-[260px]" : ""} flex flex-col shadow-[0_4px_16px_rgba(17,17,26,.05),_0_8px_32px_rgba(17,17,26,.05)] rounded-[10px]`}>
            <div className="w-full h-full overflow-y-scroll cursor-pointer p-4">
                {userLength !== 0
                    ?
                    users.filter((user) => {
                        return user.name.toLowerCase().includes(search.trim().toLowerCase());
                    }).map((user, index) => {
                        return <SearchPeopleData key={index} img={user.img} name={user.name} />;
                    })
                    :
                    <p className="text-center text-[#353535]">User not found</p>
                }
            </div>
        </div>
    );
}