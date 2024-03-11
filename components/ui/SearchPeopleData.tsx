import Image from "next/image";
import Link from "next/link";

interface SearchPeopleDataProp {
    img: string;
    name: string;
}

export default function SearchPeopleData({ img, name }: SearchPeopleDataProp) {
    return (
        <Link href="#" className="flex items-center gap-2 py-4 hover:bg-[#DADDE1] duration-200 rounded-[5px]">
            <div className="w-[45px] h-[45px] ml-2 overflow-hidden rounded-full">
                <Image src={img} width={100} height={100} alt="userProfileImage" />
            </div>
            <div className="flex-grow break-all">
                <p className="">{name}</p>
            </div>
        </Link>
    );
}