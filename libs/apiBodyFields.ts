import { z } from "zod";

export const ApiOtpVerifyFields = z.object({
    userEmail: z.string().trim().min(1, {
        message: "Email is required"
    }).email({
        message: "Please enter a valid email address for example example@domain.com"
    }),
    otp: z.string().trim().min(1, {
        message: "OTP is required"
    }).max(6, {
        message: "OTP can have a maximum of 6 digits"
    }).regex(/^[0-9]{6}$/, {
        message: "OTP is wrong format"
    })
});

export const ApiResetPWDFields = z.object({
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
    })
});