import prisma from "@/libs/db";
import { generateOtp } from "@/libs/generateOtp";
import { sendMail } from "@/libs/sendMail";
import { NextResponse } from "next/server";
import { EmailVerifyField } from "@/libs/formFields";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const validatedData = EmailVerifyField.parse(body);
        if (validatedData) {
            const { email: userEmail } = validatedData;
            const userOTP = await prisma.otp.findMany({
                where: {
                    userEmail
                }
            });

            if (userOTP.length !== 0) {
                await prisma.otp.deleteMany({
                    where: {
                        userEmail
                    }
                });

                const { otp, hashOtp, expiredAt } = await generateOtp();
                await prisma.otp.create({
                    data: {
                        userEmail,
                        hashOtp,
                        expiredAt
                    }
                });
                await sendMail(userEmail, otp);
                return NextResponse.json({ message: "Otp generate sucessfully" }, { status: 201 });
            }

            const { otp, hashOtp, expiredAt } = await generateOtp();
            await prisma.otp.create({
                data: {
                    userEmail,
                    hashOtp,
                    expiredAt
                }
            });
            await sendMail(userEmail, otp);
            return NextResponse.json({ message: "Otp generate sucessfully" }, { status: 201 });
        }
    } catch (error: any) {
        console.log(`Error: ${error.message}`);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}