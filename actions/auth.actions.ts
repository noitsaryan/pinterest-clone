"use server"
import { User } from "@/models/user.model";
import { decode } from "jsonwebtoken";
import { cookies } from "next/headers";

export const authorize = async () => {
    try {
        const session = cookies().get("pintrest-session")?.value;
        const user = cookies().get("pintrest-user")?.value;
        const jwt: any = user && decode(user)
        if (!jwt) return { message: 'JWT error', success: false };
        const checkSession = await User.findOne({ username: jwt.username }).select('authentication').exec();
        if (checkSession.authentication.sessionToken === session && checkSession.authentication.sessionTimeout > Date.now()) {
            return { message: 'Session Valid', success: true, user: jwt }
        }
        return { message: 'Session Invalid', success: false }
    } catch (error: any) {
        return { message: error.message, success: false }
    }
}