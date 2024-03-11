import Image from "next/image";
import Link from "next/link";

interface NotificationDataProp {
    img: string;
    name: string;
    detail: string;
    createdAt: string;
}

export default function NotificationData({ img, name, detail, createdAt }: NotificationDataProp) {
    return (
        <Link href="#" className="w-full h-[100px] my-2 flex gap-3 items-center hover:bg-[#DADDE1] duration-200 rounded-[5px]">
            <div className="w-[50px] h-[50px] ml-2 overflow-hidden rounded-full">
                <Image src={img} width={100} height={100} alt="userProfileImage" />
            </div>
            <div className="flex-grow break-all">
                <p className="text-[#353535]">{name}</p>
                <p className="text-[#353535]">{detail}</p>
                <p className="text-[#a0a0a0]">{createdAt}</p>
            </div>
        </Link>
    );
}