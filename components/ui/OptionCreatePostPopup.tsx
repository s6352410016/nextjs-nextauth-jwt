import React, { useEffect, useRef } from "react";
import { PiLockKeyFill } from "react-icons/pi";
import { FaEarthAmericas } from "react-icons/fa6";

interface OptionCreatePostPopupProp {
    setOpenOptionCreatePostPopup: (value: React.SetStateAction<boolean>) => void;
    setTextOptionCreatePostPopup: (value: React.SetStateAction<"Public" | "Private">) => void;
    textOptionCreatePostPopup: "Public" | "Private";
}

export default function OptionCreatePostPopup(
    {
        setOpenOptionCreatePostPopup,
        setTextOptionCreatePostPopup,
        textOptionCreatePostPopup
    }: OptionCreatePostPopupProp
) {
    const optionCreatePostPopupContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const targetClickHandler = (e: MouseEvent) => {
            if (optionCreatePostPopupContainer.current && !optionCreatePostPopupContainer.current?.contains(e.target as Node)) {
                setOpenOptionCreatePostPopup(false);
            }
        }
        document.addEventListener("mousedown", targetClickHandler);

        return () => {
            document.removeEventListener("mousedown", targetClickHandler);
        }
    }, []);

    return (
        <div onClick={() => setTextOptionCreatePostPopup((prev) => prev === "Public" ? "Private" : "Public")} ref={optionCreatePostPopupContainer} className="absolute top-[115%] left-0 w-[100%] h-[25px] flex justify-start pl-2 items-center bg-[#e7e9eb] duration-200 cursor-pointer hover:bg-[#DADDE1] rounded-[5px] gap-[5px]">
            {textOptionCreatePostPopup === "Public"
                ?
                <PiLockKeyFill className="text-[#353535]" />
                :
                <FaEarthAmericas className="text-[#353535] text-sm" />
            }
            <p className="text-[#353535] text-xs font-semibold">{textOptionCreatePostPopup === "Public" ? "Private" : "Public"}</p>
        </div>
    );
}