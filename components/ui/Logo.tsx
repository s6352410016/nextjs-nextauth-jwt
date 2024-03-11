import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/feed" className="w-[300px] h-full flex justify-center items-center ">
            <h1 className="text-[#353535] text-3xl font-bold">BYNSocial</h1>
        </Link>
    );
}