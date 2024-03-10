"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormFields } from "@/libs/formFields";
import { SignUpSchema } from "@/libs/formFields";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/hooks";
import { checkEmailExist } from "@/features/user/userSlice";
import { otpGenerate } from "@/features/otp/otpSlice";
import Cookies from "js-cookie";

export default function SignUpPage() {
    const [pwdInputType, setPwdInputType] = useState<string>("password");
    const router = useRouter();
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<SignUpSchema>({
        resolver: zodResolver(SignUpFormFields)
    });

    const signUpHandler: SubmitHandler<SignUpSchema> = async ({ firstname, lastname, email, password }) => {
        try {
            const resultCheckEmail = await dispatch(checkEmailExist(email));
            if (resultCheckEmail.payload === "Email is already exist") {
                return toast.error("Email is already exist");
            }

            const resultGenOtp = await dispatch(otpGenerate({ email }));
            if (resultGenOtp.payload === "Otp generate success") {
                Cookies.set("firstnameSignUp", firstname, { expires: 7 });
                Cookies.set("lastnameSignUp", lastname, { expires: 7 });
                Cookies.set("emailVerify", email, { expires: 7 });
                Cookies.set("passwordSignUp", password, { expires: 7 });
                Cookies.set("flag", "signup", { expires: 7 });

                router.push("/otp-verify");
            }
        } catch (error: any) {
            console.error(`Error: ${error.message}`);
        }
    }

    const showPasswordHandler = () => {
        if (pwdInputType === "text") {
            setPwdInputType("password");
        } else {
            setPwdInputType("text");
        }
    }

    useEffect(() => {
        document.title = "bynsocial | signup";
    }, []);

    return (
        <>
            <div className="w-[400px] max-[480px]:container">
                <h1 className="text-center text-[2rem] text-[#3f3f3f] max-[480px]:text-2xl">Sign up</h1>
                <form onSubmit={handleSubmit(signUpHandler)}>
                    <div className="flex gap-4 my-4 max-[480px]:flex-col">
                        <div className="w-[50%] max-[480px]:w-full">
                            <label className="text-[#3f3f3f] font-medium max-[480px]:text-sm">Firstname:</label>
                            <input {...register("firstname")} className={`my-2 border border-solid border-[#cacaca] w-full h-[40px] rounded-[5px] outline-none px-2 max-[480px]:text-sm ${errors?.firstname ? "border-[1px] border-rose-600" : ""}`} type="text" />
                            {errors?.firstname && <span className="text-red-500 max-[480px]:text-sm">{errors.firstname.message as string}</span>}
                        </div>
                        <div className="w-[50%] max-[480px]:w-full">
                            <label className="text-[#3f3f3f] font-medium max-[480px]:text-sm">Lastname:</label>
                            <input {...register("lastname")} className={`my-2 border border-solid border-[#cacaca] w-full h-[40px] rounded-[5px] outline-none px-2 max-[480px]:text-sm ${errors?.lastname ? "border-[1px] border-rose-600" : ""}`} type="text" />
                            {errors?.lastname && <span className="text-red-500 max-[480px]:text-sm">{errors.lastname.message as string}</span>}
                        </div>
                    </div>
                    <div className="flex flex-col my-4">
                        <label className="text-[#3f3f3f] font-medium max-[480px]:text-sm">Email:</label>
                        <input {...register("email")} className={`my-2 border border-solid border-[#cacaca] h-[40px] rounded-[5px] outline-none px-2 max-[480px]:text-sm ${errors?.email ? "border-[1px] border-rose-600" : ""}`} type="text" />
                        {errors?.email && <span className="text-red-500 max-[480px]:text-sm">{errors.email.message as string}</span>}
                    </div>
                    <div className="flex flex-col my-4">
                        <label className="text-[#3f3f3f] font-medium max-[480px]:text-sm">Password:</label>
                        <div className={`h-[40px] py-1 flex items-center border border-solid border-[#cacaca] rounded-[5px] my-2 ${errors?.password ? "border-[1px] border-rose-600" : ""}`}>
                            <input {...register("password")} className="w-full h-full outline-none px-2 max-[480px]:text-sm" type={pwdInputType} />
                            {pwdInputType === "password"
                                ?
                                <IoIosEye onClick={showPasswordHandler} className="pr-2 text-4xl text-[#545454] hover:cursor-pointer max-[480px]:text-3xl" />
                                :
                                <IoIosEyeOff onClick={showPasswordHandler} className="pr-2 text-4xl text-[#545454] hover:cursor-pointer max-[480px]:text-3xl" />
                            }
                        </div>
                        {errors?.password && <span className="text-red-500 max-[480px]:text-sm">{errors.password.message as string}</span>}
                    </div>
                    <button disabled={isSubmitting} className={`${isSubmitting ? "bg-blue-400 hover:bg-blue-400" : "bg-[#1982ff] hover:bg-[#0d6efd]"} w-full h-[40px] rounded-[5px] bg-[#1982ff] hover:bg-[#0d6efd] text-white text-lg font-medium duration-200 max-[480px]:text-sm`} type="submit">Sign up</button>
                    <div className="flex my-4 justify-center">
                        <p className="text-[#848484] font-normal max-[480px]:text-xs">Have already an accout?</p>&nbsp;&nbsp;
                        <Link className="text-[#3f3f3f] font-medium hover:text-[#2e2e2e] max-[480px]:text-xs" href="/">Sign in</Link>
                    </div>
                </form>
            </div>
        </>
    );
}
