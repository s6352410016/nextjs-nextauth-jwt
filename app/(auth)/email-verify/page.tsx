"use client";

import { useEffect } from "react";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailVerifyField } from "@/libs/formFields";
import { EmailVerifySchema } from "@/libs/formFields";
import { useAppDispatch } from "@/app/hooks";
import { otpGenerate } from "@/features/otp/otpSlice";
import { checkEmailExist } from "@/features/user/userSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export default function EmailVerifyPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<EmailVerifySchema>({
        resolver: zodResolver(EmailVerifyField)
    });

    const emailVerifyHandler: SubmitHandler<EmailVerifySchema> = async ({ email }) => {
        const resultCheckEmail = await dispatch(checkEmailExist(email));
        if (resultCheckEmail.payload !== "Email is already exist") {
            return toast.error("Invalid Email");
        }

        const resultGenOtp = await dispatch(otpGenerate({ email }));
        if (resultGenOtp.payload === "Otp generate success") {
            Cookies.set("emailVerify", email, { expires: 7 });
            Cookies.set("flag", "reset-password", { expires: 7 });

            router.push("/otp-verify");
        }
    }

    useEffect(() => {
        document.title = "bynsocial | email-verify";
    }, []);

    return (
        <>
            <div className="w-[400px] max-[480px]:container">
                <h1 className="text-center text-[2rem] text-[#3f3f3f] max-[480px]:text-2xl">Email Verify</h1>
                <p className="text-center text-[#848484] my-4 max-[480px]:text-sm">We'll send an otp for verification to your email.</p>
                <form onSubmit={handleSubmit(emailVerifyHandler)}>
                    <div className="flex flex-col my-4">
                        <label className="text-[#3f3f3f] font-medium max-[480px]:text-sm">Email:</label>
                        <input {...register("email")} className={`my-2 border border-solid border-[#cacaca] h-[40px] rounded-[5px] outline-none px-2 max-[480px]:text-sm ${errors?.email ? "border-[1px] border-rose-600" : ""}`} type="text" />
                        {errors?.email && <span className="text-red-500 max-[480px]:text-sm">{errors.email.message}</span>}
                    </div>
                    <button disabled={isSubmitting} className={`${isSubmitting ? "bg-blue-400 hover:bg-blue-400" : "bg-[#1982ff] hover:bg-[#0d6efd]"} w-full h-[40px] rounded-[5px] bg-[#1982ff] hover:bg-[#0d6efd] text-white text-lg font-medium duration-200 max-[480px]:text-sm`} type="submit">Send otp</button>
                    <div className="flex my-4 justify-center items-center">
                        <Link className="transition duration-200 text-[#3f3f3f] font-medium max-[480px]:text-xs flex justify-center items-center gap-2 hover:text-[#2e2e2e]" href="/"><IoArrowBackOutline className="text-[#3f3f3f] text-xl transition duration-200 hover:text-[#2e2e2e] max-[480px]:text-sm" />Back to sign in</Link>
                    </div>
                </form>
            </div>
        </>
    );
}
