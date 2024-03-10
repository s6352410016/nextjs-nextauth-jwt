import * as bcrypt from "bcrypt";
import { OtpPayload } from "@/type/otpPayload";

export const generateOtp = async (): Promise<OtpPayload> => {
    const otp = `${Math.floor(Math.random() * 900000 + 100000)}`; // generate otp 6 digits
    const hashOtp = await bcrypt.hash(otp, 10);
    const expiredAt = Date.now() + 600000; // generate expiredAt of otp in 10 minutes
    return {
        otp,
        hashOtp,
        expiredAt
    }
}