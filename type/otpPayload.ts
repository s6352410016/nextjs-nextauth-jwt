export interface OtpPayload {
    otp: string;
    hashOtp: string;
    expiredAt: number;
}