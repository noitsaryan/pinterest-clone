"use server"

import { cookies } from "next/headers";
import { decode } from "jsonwebtoken";

export const validateUser = async () => {
    try {
        const auth1 = cookies().get("pintrest-user")?.value
        const auth2 = cookies().get("pintrest-session")?.value;
        if (auth1 && auth2) return { message: 'User logged in', success: true };
        return { message: 'User not logged in', success: false }
    } catch (error: any) {
        return error.message;
    }
}

export const getUserData = () => {
    try {
        const auth1 = cookies().get("pintrest-user")?.value
        const jwt = auth1 && decode(auth1);
        if (!auth1) return { message: 'User data not fetched.', success: false };
        return { message: 'User data fetched successfully', success: true, data: jwt }
    } catch (error: any) {
        return error.message;
    }
}