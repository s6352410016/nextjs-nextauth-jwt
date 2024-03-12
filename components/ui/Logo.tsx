import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/feed" className="w-[300px] h-full flex justify-center items-center max-[480px]:w-[150px] max-[480px]:justify-start">
            <h1 className="text-[#353535] text-3xl font-bold max-[480px]:text-lg">BYNSocial</h1>
        </Link>
    );
}