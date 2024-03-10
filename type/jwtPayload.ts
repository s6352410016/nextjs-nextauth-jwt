export type JWTPayload = {
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