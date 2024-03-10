import { z } from "zod";

export type SignInSchema = z.infer<typeof SignInFormFields>;
export type SignUpSchema = z.infer<typeof SignUpFormFields>;
export type EmailVerifySchema = z.infer<typeof EmailVerifyField>;
export type OTPVerifySchema = z.infer<typeof OTPVerifyField>;
export type PWDSchema = z.infer<typeof ResetPWDFields>;

export const SignInFormFields = z.object({
    email: z.string().trim().min(1, {
        message: "Email is required"
    }).email({
        message: "Please enter a valid email address for example example@domain.com"
    }),
    password: z.string().trim().min(6, {
        message: "Password must contain at least 6 characters"
    }).max(20, {
        message: "Password must contain at most 20 character"
    }).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*[A-Z]+[A-Za-z\d]*\d+[A-Za-z\d]*$/, {
        message: "Password must contain at least one uppercase letter and mix with numbers or lowercase letters."
    }),
});

export const SignUpFormFields = z.object({
    firstname: z.string().trim().min(1, {
        message: "Firstname is required"
    }).regex(/^([ก-ฮa-zA-Z\D])[^\s]+$/),
    lastname: z.string().trim().min(1, {
        message: "Lastname is required"
    }).regex(/^([ก-ฮa-zA-Z\D])[^\s]+$/),
    email: z.string().trim().min(1, {
        message: "Email is required"
    }).email({
        message: "Please enter a valid email address for example example@domain.com"
    }),
    password: z.string().trim().min(6, {
        message: "Password must contain at least 6 characters"
    }).max(20, {
        message: "Password must contain at most 20 character"
    }).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*[A-Z]+[A-Za-z\d]*\d+[A-Za-z\d]*$/, {
        message: "Password must contain at least one uppercase letter and mix with numbers or lowercase letters."
    }),
});

export const EmailVerifyField = z.object({
    email: z.string().trim().min(1, {
        message: "Email is required"
    }).email({
        message: "Please enter a valid email address for example example@domain.com"
    })
});

export const OTPVerifyField = z.object({
    otp: z.string().trim().min(1, {
        message: "OTP is required"
    }).max(6, {
        message: "OTP can have a maximum of 6 digits"
    }).regex(/^[0-9]{6}$/, {
        message: "OTP is wrong format"
    })
});

export const ResetPWDFields = z.object({
    newPassword: z.string().trim().min(6, {
        message: "Password must contain at least 6 characters"
    }).max(20, {
        message: "Password must contain at most 20 character"
    }).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*[A-Z]+[A-Za-z\d]*\d+[A-Za-z\d]*$/, {
        message: "Password must contain at least one uppercase letter and mix with numbers or lowercase letters."
    }),
    confirmNewPassword: z.string().trim().min(6, {
        message: "Password must contain at least 6 characters"
    }).max(20, {
        message: "Password must contain at most 20 character"
    }).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*[A-Z]+[A-Za-z\d]*\d+[A-Za-z\d]*$/, {
        message: "Password must contain at least one uppercase letter and mix with numbers or lowercase letters."
    })
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Password do not match",
    path: ["confirmNewPassword"]
});