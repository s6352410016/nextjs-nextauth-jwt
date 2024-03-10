import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { ApiResetPWDFields } from "@/libs/apiBodyFields";
import prisma from "@/libs/db";

export const PATCH = async (req: Request) => {
    try {
        const body = await req.json();
        const validatedData = ApiResetPWDFields.parse(body);
        if (validatedData) {
            const { email, password } = validatedData;
            const hashPassword = await bcrypt.hash(password, 10);
            await prisma.user.update({
                where: {
                    email
                },
                data: {
                    hashPassword
                }
            });
            return NextResponse.json({ message: "Password updated success" });
        }
    } catch (error: any) {
        console.log(`Error: ${error.message}`);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}