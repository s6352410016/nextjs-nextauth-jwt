import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import prisma from "@/libs/db";
import * as bcrypt from "bcrypt";
import { JWTPayload } from "@/type/jwtPayload";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import { SignInFormFields } from "@/libs/formFields";

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Fields input is required");
                }
                try {
                    const validatedData = SignInFormFields.parse({
                        email: credentials?.email,
                        password: credentials?.password
                    });
                    if (validatedData) {
                        const { email, password } = validatedData;
                        const user = await prisma.user.findUnique({
                            where: {
                                email
                            }
                        });
                        if (user && user.hashPassword !== "") {
                            const result = await bcrypt.compare(password, (user.hashPassword as string));
                            if (!result) {
                                throw new Error("Invalid Credential");
                            }

                            return {
                                id: user.id,
                                email: user.email,
                                firstname: user.firstname,
                                lastname: user.lastname,
                            }
                        }
                        throw new Error("Invalid Credential");
                    }
                    throw new Error("Error zod validation");
                } catch (error: any) {
                    throw new Error(error);
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            allowDangerousEmailAccountLinking: true
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            allowDangerousEmailAccountLinking: true
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET as string,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    ...user
                }
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token as JWTPayload;
            return session;
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }