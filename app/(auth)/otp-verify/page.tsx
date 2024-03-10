"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";
import { OTPVerifySchema } from "@/libs/formFields";
import { OTPVerifyField } from "@/libs/formFields";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/hooks";
import { otpVerify, otpGenerate } from "@/features/otp/otpSlice";
import { signUp } from "@/features/user/userSlice";

export default function OTPVerifyPage() {
    const [userEmail, setUserEmail] = useState<string>("");
    const [disableResendBtn, setDisableResendBtn] = useState<boolean>(false);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<OTPVerifySchema>({
        resolver: zodResolver(OTPVerifyField)
    });

    const OTPVerifyHandler: SubmitHandler<OTPVerifySchema> = async ({ otp }) => {
        try {
            const emailVerify = Cookies.get("emailVerify") ?? "";
            const firstnameSignUp = Cookies.get("firstnameSignUp") ?? "";
            const lastnameSignUp = Cookies.get("lastnameSignUp") ?? "";
            const passwordSignUp = Cookies.get("passwordSignUp") ?? "";
            const flag = Cookies.get("flag") ?? "";

            const resultOtpVerify = await dispatch(otpVerify({ emailVerify, otp }));
            if (resultOtpVerify.payload === "Email or otp is not valid") {
                return toast.error("OTP is not valid");
            } else if (resultOtpVerify.payload === "Otp has expire") {
                return toast.error("OTP has expire");
            }

            if (flag === "signup") {
                const resultSignUp = await dispatch(signUp({ firstnameSignUp, lastnameSignUp, emailVerify, passwordSignUp }));
                if (resultSignUp.payload === "Signup success") {
                    Cookies.remove("firstnameSignUp");
                    Cookies.remove("lastnameSignUp");
                    Cookies.remove("emailVerify");
                    Cookies.remove("passwordSignUp");
                    Cookies.remove("flag");
                    Cookies.remove("email");
                    Cookies.remove("password");

                    toast.success("Signup success");
                    return router.push("/");
                }
            }

            router.push("/reset-password");
        } catch (error: any) {
            console.error(`Error: ${error}`);
        }
    }

    const resendOtp = async () => {
        setDisableResendBtn(true);
        const email = Cookies.get("emailVerify") ?? "";

        const resultGenOtp = await dispatch(otpGenerate({ email }));
        if (resultGenOtp.payload === "Otp generate success") {
            toast.success("Resend otp success");
            setDisableResendBtn(false);
        }
    }

    const obscureEmailText = () => {
        const emailVerify = Cookies.get("emailVerify") ?? "";

        if (emailVerify !== "") {
            const [email, domain] = emailVerify.split('@');
            const firstTextEmail = email[0];
            const lastTextEmailLength = email.length - 1;
            const lastTextEmail = email[lastTextEmailLength];
            const asteriskEmail = new Array(email.slice(1, email.length - 1).length + 1).join('*');
            const emailObscureWithAsterisk = `${firstTextEmail}${asteriskEmail}${lastTextEmail}@${domain}`;

            setUserEmail(emailObscureWithAsterisk);
        }
    }

    useEffect(() => {
        document.title = "bynsocial | otp-verify";

        obscureEmailText();
    }, []);

    return (
        <>
            <div className="w-[400px] max-[480px]:container">
                <h1 className="text-center text-[2rem] text-[#3f3f3f] max-[480px]:text-2xl">OTP Verify</h1>
                <p className="text-center text-[#848484] my-4 max-[480px]:text-sm max-[480px]:my-2">OTP has been send to your email.</p>
                <p className="text-center text-[#848484] my-4 max-[480px]:text-sm max-[480px]:my-2">Check your email <span className="text-slate-800 font-medium max-[480px]:text-sm max-[480px]:block max-[480px]:my-2">{userEmail}</span></p>
                <form onSubmit={handleSubmit(OTPVerifyHandler)}>
                    <div className="flex flex-col my-4">
                        <label className="text-[#3f3f3f] font-medium max-[480px]:text-sm">OTP:</label>
                        <input {...register("otp")} className={`my-2 border border-solid border-[#cacaca] w-full h-[40px] rounded-[5px] outline-none px-2 max-[480px]:text-sm ${errors?.otp ? "border-[1px] border-rose-600" : ""}`} type="text" />
                        {errors?.otp && <span className="text-red-500 max-[480px]:text-sm">{errors.otp.message as string}</span>}
                    </div>
                    <button disabled={isSubmitting} className={`${isSubmitting ? "bg-blue-400 hover:bg-blue-400" : "bg-[#1982ff] hover:bg-[#0d6efd]"} w-full h-[40px] rounded-[5px] bg-[#1982ff] hover:bg-[#0d6efd] text-white text-lg font-medium duration-200 max-[480px]:text-sm`} type="submit">Confirm</button>
                    <div className="flex my-4 justify-center items-center gap-1">
                        <p className="text-[#848484] font-normal max-[480px]:text-xs">Don't receive an otp?</p>&nbsp;&nbsp;
                        <button disabled={disableResendBtn} onClick={resendOtp} className="text-slate-800 font-medium hover:text-slate-900 max-[480px]:text-xs">Resend</button>
                    </div>
                    <div className="flex my-4 justify-center">
                        <Link className="transition duration-200 text-[#3f3f3f] font-medium max-[480px]:text-xs flex justify-center items-center gap-2 hover:text-[#2e2e2e]" href="/"><IoArrowBackOutline className="text-[#3f3f3f] text-xl transition duration-200 hover:text-[#2e2e2e] max-[480px]:text-sm" />Back to sign in</Link>
                    </div>
                </form>
            </div>
        </>
    );
}
