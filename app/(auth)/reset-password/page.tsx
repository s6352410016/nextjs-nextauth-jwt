"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { ResetPWDFields } from "@/libs/formFields";
import { PWDSchema } from "@/libs/formFields";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/app/hooks";
import { resetPWD } from "@/features/user/userSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
    const [newPwdInputType, setNewPwdInputType] = useState<string>("password");
    const [confirmNewPwdInputType, setConfirmNewPwdInputType] = useState<string>("password");
    const dispatch = useAppDispatch();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<PWDSchema>({
        resolver: zodResolver(ResetPWDFields)
    });

    const resetPWDHandler: SubmitHandler<PWDSchema> = async ({ confirmNewPassword }) => {
        const password = confirmNewPassword;
        const email = Cookies.get("emailVerify") ?? "";
        const resultResetPWD = await dispatch(resetPWD({ email, password }));
        if (resultResetPWD.payload === "Password updated success") {
            Cookies.remove("email");
            Cookies.remove("password");
            Cookies.remove("emailVerify");
            Cookies.remove("flag");

            toast.success("Reset password");
            router.push("/");
        }
    }

    const showNewPWDHandler = () => {
        if (newPwdInputType === "text") {
            setNewPwdInputType("password");
        } else {
            setNewPwdInputType("text");
        }
    }

    const showConfirmNewPWDHandler = () => {
        if (confirmNewPwdInputType === "text") {
            setConfirmNewPwdInputType("password");
        } else {
            setConfirmNewPwdInputType("text");
        }
    }

    useEffect(() => {
        document.title = "bynsocial | reset-password";
    }, []);

    return (
        <>
            <div className="w-[400px] max-[480px]:container">
                <h1 className="text-center text-[2rem] text-[#3f3f3f] max-[480px]:text-2xl">Reset password</h1>
                <form onSubmit={handleSubmit(resetPWDHandler)}>
                    <div className="flex flex-col my-4">
                        <label className="text-[#3f3f3f] font-medium max-[480px]:text-sm">New password:</label>
                        <div className={`h-[40px] py-1 flex items-center border border-solid border-[#cacaca] rounded-[5px] my-2  ${errors?.newPassword ? "border-[1px] border-rose-600" : ""} ${errors?.confirmNewPassword && errors?.confirmNewPassword.message === "Password do not match" ? "border-[1px] border-rose-600" : ""}`}>
                            <input {...register("newPassword")} className="w-full h-full outline-none px-2 max-[480px]:text-sm" type={newPwdInputType} />
                            {newPwdInputType === "password"
                                ?
                                <IoIosEye onClick={showNewPWDHandler} className="pr-2 text-4xl text-[#545454] hover:cursor-pointer max-[480px]:text-3xl" />
                                :
                                <IoIosEyeOff onClick={showNewPWDHandler} className="pr-2 text-4xl text-[#545454] hover:cursor-pointer max-[480px]:text-3xl" />
                            }
                        </div>
                        {errors?.confirmNewPassword && errors?.confirmNewPassword?.message === "Password do not match"
                            ?
                            <span className="text-red-500 max-[480px]:text-sm">{errors.confirmNewPassword.message as string}</span>
                            :
                            errors?.newPassword && <span className="text-red-500 max-[480px]:text-sm">{errors.newPassword.message as string}</span>
                        }
                    </div>
                    <div className="flex flex-col my-4">
                        <label className="text-[#3f3f3f] font-medium max-[480px]:text-sm">Confirm new password:</label>
                        <div className={`h-[40px] py-1 flex items-center border border-solid border-[#cacaca] rounded-[5px] my-2 ${errors?.confirmNewPassword ? "border-[1px] border-rose-600" : ""}`}>
                            <input {...register("confirmNewPassword")} className="w-full h-full outline-none px-2 max-[480px]:text-sm" type={confirmNewPwdInputType} />
                            {confirmNewPwdInputType === "password"
                                ?
                                <IoIosEye onClick={showConfirmNewPWDHandler} className="pr-2 text-4xl text-[#545454] hover:cursor-pointer max-[480px]:text-3xl" />
                                :
                                <IoIosEyeOff onClick={showConfirmNewPWDHandler} className="pr-2 text-4xl text-[#545454] hover:cursor-pointer max-[480px]:text-3xl" />
                            }
                        </div>
                        {errors?.confirmNewPassword && <span className="text-red-500 max-[480px]:text-sm">{errors.confirmNewPassword.message as string}</span>}
                    </div>
                    <button disabled={isSubmitting} className={`${isSubmitting ? "bg-blue-400 hover:bg-blue-400" : "bg-[#1982ff] hover:bg-[#0d6efd]"} w-full h-[40px] rounded-[5px] bg-[#1982ff] hover:bg-[#0d6efd] text-white text-lg font-medium duration-200 max-[480px]:text-sm`} type="submit">Confirm</button>
                    <div className="flex my-4 justify-center">
                        <Link className="transition duration-200 text-[#3f3f3f] font-medium max-[480px]:text-xs flex justify-center items-center gap-2 hover:text-[#2e2e2e]" href="/"><IoArrowBackOutline className="text-[#3f3f3f] text-xl transition duration-200 hover:text-[#2e2e2e] max-[480px]:text-sm" />Back to sign in</Link>
                    </div>
                </form>
            </div>
        </>
    );
}