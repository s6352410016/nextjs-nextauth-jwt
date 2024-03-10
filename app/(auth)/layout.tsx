"use client";

import React from "react";
import Image from "next/image";
import userCredential from "@/assets/images/userCredential.svg";
import Snowfall from "react-snowfall";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Snowfall />
            <div className="w-screen h-screen flex justify-center items-center">
                <div className="w-[50vw] h-[100vh] flex flex-col justify-center items-center">
                    {children}
                </div>
                <div className="w-[50vw] h-[100vh] bg-[#f7f7f7] flex flex-col justify-center items-center max-[480px]:hidden">
                    <Image src={userCredential} width={550} height={550} alt="authImage" />
                </div>
            </div>
        </>
    );
}
