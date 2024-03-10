"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { IoIosEye, IoIosEyeOff, IoLogoGithub } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormFields } from "@/libs/formFields";
import { SignInSchema } from "@/libs/formFields";
import Cookies from "js-cookie";

export default function SignInPage() {
  const router = useRouter();
  const [pwdInputType, setPwdInputType] = useState<string>("password");
  const rememberCBRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<SignInSchema>({
    resolver: zodResolver(SignInFormFields)
  });

  const showPasswordHandler = () => {
    if (pwdInputType === "text") {
      setPwdInputType("password");
    } else {
      setPwdInputType("text");
    }
  }

  const signInHandler: SubmitHandler<SignInSchema> = async (data) => {
    const { email, password } = data;
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password
    });

    if (result?.error) {
      return toast.error("Invalid credential");
    }

    if (rememberCBRef.current?.checked) {
      Cookies.set("email", email, { expires: 7 });
      Cookies.set("password", password, { expires: 7 });
    } else {
      Cookies.remove("email");
      Cookies.remove("password");
    }

    toast.success("Signin success");
    router.push("/feed");
  }

  useEffect(() => {
    document.title = "bynsocial | signin";
  }, []);

  return (
    <>
      <div className="w-[400px] max-[480px]:container">
        <h1 className="text-center text-[2rem] text-[#3f3f3f] max-[480px]:text-2xl">Sign in</h1>
        <form onSubmit={handleSubmit(signInHandler)}>
          <div className="flex flex-col my-4">
            <label className="text-[#3f3f3f] font-medium max-[480px]:text-sm">Email:</label>
            <input defaultValue={Cookies.get("email") ?? ""} {...register("email")} className={`my-2 border border-solid border-[#cacaca] w-full h-[40px] rounded-[5px] outline-none px-2 max-[480px]:text-sm ${errors?.email ? "border-[1px] border-rose-600" : ""}`} type="text" />
            {errors?.email && <span className="text-red-500 max-[480px]:text-sm">{errors.email.message as string}</span>}
          </div>
          <div className="flex flex-col my-4">
            <label className="text-[#3f3f3f] font-medium max-[480px]:text-sm">Password:</label>
            <div className={`h-[40px] py-1 flex items-center border border-solid border-[#cacaca] rounded-[5px] my-2 ${errors?.password ? "border-[1px] border-rose-600" : ""}`}>
              <input defaultValue={Cookies.get("password") ?? ""} {...register("password")} className="w-full h-full outline-none px-2 max-[480px]:text-sm" type={pwdInputType} />
              {pwdInputType === "password"
                ?
                <IoIosEye onClick={showPasswordHandler} className="pr-2 text-4xl text-[#545454] hover:cursor-pointer max-[480px]:text-3xl" />
                :
                <IoIosEyeOff onClick={showPasswordHandler} className="pr-2 text-4xl text-[#545454] hover:cursor-pointer max-[480px]:text-3xl" />
              }
            </div>
            {errors?.password && <span className="text-red-500 max-[480px]:text-sm">{errors.password.message as string}</span>}
          </div>
          <div className="flex justify-between my-4 max-[480px]:flex-col max-[480px]:gap-1">
            <div className="max-[480px]:text-center">
              <input ref={rememberCBRef} type="checkbox" defaultChecked />&nbsp;<span className="text-[#3f3f3f] font-medium max-[480px]:text-xs">Remember me?</span>
            </div>
            <div className="max-[480px]:text-center">
              <Link className="text-[#3f3f3f] font-medium hover:text-[#2e2e2e] max-[480px]:text-xs" href="/email-verify">Forgot password</Link>
            </div>
          </div>
          <button disabled={isSubmitting} className={`${isSubmitting ? "bg-blue-400 hover:bg-blue-400" : "bg-[#1982ff] hover:bg-[#0d6efd]"} w-full h-[40px] rounded-[5px] bg-[#1982ff] hover:bg-[#0d6efd] text-white text-lg font-medium duration-200 max-[480px]:text-sm`} type="submit">Sign in</button>
          <div className="flex gap-4 my-4 max-[480px]:flex-col max-[480px]:w-full">
            <div onClick={() => signIn("google", { callbackUrl: "/feed" })} className="cursor-pointer w-[50%] h-[40px] rounded-[5px] border border-solid border-slate-200 hover:bg-slate-100 flex justify-center items-center gap-2 text-base hover:duration-200 max-[480px]:w-full max-[480px]:text-sm"><FcGoogle className="text-lg max-[480px]:text-sm max-[480px]:text-sm" />Sign in with google</div>
            <div onClick={() => signIn("github", { callbackUrl: "/feed" })} className="cursor-pointer w-[50%] h-[40px] rounded-[5px] border border-solid border-slate-200 hover:bg-slate-100 flex justify-center items-center gap-2 text-base hover:duration-200 max-[480px]:w-full max-[480px]:text-sm"><IoLogoGithub className="text-lg max-[480px]:text-sm max-[480px]:text-sm" />Sign in with github</div>
          </div>
          <div className="flex my-4 justify-center">
            <p className="text-[#848484] font-normal max-[480px]:text-xs">Don't have accout?</p>&nbsp;&nbsp;
            <Link className="text-[#3f3f3f] font-medium hover:text-[#2e2e2e] max-[480px]:text-xs" href="/signup">Sign up</Link>
          </div>
        </form>
      </div>
    </>
  );
}