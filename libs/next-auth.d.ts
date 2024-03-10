import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            picture: string;
            firstname: string;
            lastname: string;
            username: string;
            email: string;
            emailVerified: Date | null;
            image: string;
            iat: number;
            exp: number
            sub: string;
            jti: string;
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {

    }
}