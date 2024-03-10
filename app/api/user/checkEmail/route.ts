import prisma from "@/libs/db";
import { NextResponse } from "next/server";
import { EmailVerifyField } from "@/libs/formFields";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const validatedData = EmailVerifyField.parse(body);
        if (validatedData) {
            const { email } = validatedData;
            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            });
            if (user) {
                return NextResponse.json({ message: "Email is already exist" }, { status: 400 });
            }
            return NextResponse.json({ message: "Email is already use" });
        }
    } catch (error: any) {
        console.log(`Error: ${error.message}`);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}