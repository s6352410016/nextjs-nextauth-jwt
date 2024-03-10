import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import * as bcrypt from "bcrypt";
import { ApiOtpVerifyFields } from "@/libs/apiBodyFields";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const validatedData = ApiOtpVerifyFields.parse(body);
        if (validatedData) {
            const { userEmail, otp } = validatedData;
            const userOtp = await prisma.otp.findFirst({
                where: {
                    userEmail
                }
            });

            if (userOtp && (await bcrypt.compare(otp, userOtp.hashOtp))) {
                if (Date.now() < userOtp.expiredAt) {
                    await prisma.otp.deleteMany({
                        where: {
                            userEmail
                        }
                    });
                    return NextResponse.json({ message: "Otp is valid" });
                }
                await prisma.otp.deleteMany({
                    where: {
                        userEmail
                    }
                });
                return NextResponse.json({ message: "Otp has expire" }, { status: 400 });
            }
            return NextResponse.json({ message: "Email or otp is not valid" }, { status: 400 });
        }
    } catch (error: any) {
        console.log(`Error: ${error}`);
        return NextResponse.json({ message: error }, { status: 500 });
    }
}