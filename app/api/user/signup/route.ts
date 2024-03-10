import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import prisma from '@/libs/db';
import { SignUpFormFields } from "@/libs/formFields"

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const validatedData = SignUpFormFields.parse(body);
        if (validatedData) {
            const { firstname, lastname, email, password } = validatedData;
            const hashPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: {
                    email,
                    firstname,
                    lastname,
                    hashPassword
                }
            });
            return NextResponse.json({ user }, { status: 201 });
        }
    } catch (error: any) {
        console.log(`Error: ${error.message}`);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}