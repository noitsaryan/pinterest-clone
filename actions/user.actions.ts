"use server"
import { User } from "@/models/user.model";
import { connectDB } from "@/utils/mongodb";
import { isValidEmail } from "@/utils/utils";
import { hash } from "bcrypt";
import UIDGenerator from 'uid-generator'
import { cookies } from 'next/headers'
import { sign } from 'jsonwebtoken'
import { getUserData } from "./cookies.actions";
import { authorize } from "./auth.actions";
import { Pin } from "@/models/pin.model";

export const register = async ({ name, email, username, password }: { name: string, email: string, username: string, password: string }) => {
    try {
        if (!name || !email || !username || !password) return { message: 'Enter complete details', success: false };

        const hashed = await hash(password, 10)
        const userObject = {
            name,
            email,
            username,
            authentication: {
                password: hashed
            },
            profileImage: 'https://utfs.io/f/29f6f774-a86a-41cc-8951-6998b7ef169a-5482fr.png'
        }
        await connectDB();
        const user = await User.create(userObject);
        if (!user) return { message: 'Register: User creation failed', success: false };
        return { message: 'Success registration', success: true };
    } catch (error: any) {
        if (error.code === 11000) return { message: 'Email or Username already exists', success: false }
        return error.message;
    }
}

export const login = async ({ identity, password }: { identity: string, password: string }) => {
    try {
        if (!identity || !password) {
            throw new Error('Fill all the inputs');
        }
        await connectDB();
        let uid = new UIDGenerator();
        const isEmail = isValidEmail(identity);
        const user = isEmail
            ? await User.findOne({ email: identity }).select("+authentication")
            : await User.findOne({ username: identity }).select("+authentication");

        if (!user) {
            throw new Error("User does not exist");
        }

        const sessionToken = uid.generateSync();
        const sessionTimeout = Date.now() + 24 * 60 * 60 * 1000;

        try {
            cookies().set("pintrest-session", sessionToken, {
                maxAge: 24 * 60 * 60
            });
            const userJwt = sign({
                name: user.name,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
                about: user.about,
                website: user.website,
                birthday: user.birthday,
                userId: user._id
            }, process.env.JWT_SECRET as string);
            cookies().set('pintrest-user', userJwt, {
                maxAge: 24 * 60 * 60
            });
        } catch (cookieError: any) {
            return { message: cookieError.message, success: false }
        }

        user.authentication.sessionToken = sessionToken;
        user.authentication.sessionTimeout = sessionTimeout;
        await user.save();

        return { message: 'Logged in successfully', success: true };
    } catch (error: any) {
        return { message: error.message, success: false };
    }
};

export const fetchUserByID = async (id: string) => {
    try {
        if (!id) return { message: 'Id is empty', success: false }
        await connectDB();
        const user = await User.findOne({ username: id });
        if (!user) return { message: 'User does not exists', success: false };
        const pins = await Pin.find({ userId: user._id });
        return { message: 'User data fetched', data: user, success: true, pins }
    } catch (error: any) {
        return error.message;
    }
}
export const fetchUserData = async () => {
    try {
        const { data } = await getUserData();
        await connectDB();
        const user = await User.findOne({ email: data.email })
        if (!user) return { message: 'User does not exists', success: false };
        return {
            message: 'User fetched success', data: {
                _id: user._id.toString(),
                name: user.name,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
                about: user.about,
                birthday: user.birthday,
                gender: user.gender,
                website: user.website
            }, success: true
        }
    } catch (error: any) {
        return error.message;
    }
}

export const updateProfile = async (object: {
    name?: string,
    username?: string,
    email?: string,
    about?: string,
    birthday?: string,
    gender?: string,
    website?: string,
    image?: string
}) => {
    try {
        if (!object) return { message: 'No fields submitted', success: false }
        const response = await authorize();
        if (!response.success) return { message: 'Session Not Valid', success: false }
        await connectDB();
        const update = await User.findOneAndUpdate(
            { email: object.email },
            [
                {
                    $set: {
                        name: object.name,
                        username: object.username,
                        about: object.about,
                        birthday: object.birthday,
                        gender: object.gender,
                        website: object.website,
                        profileImage: object.image
                    }
                }
            ],
            { new: true }
        );
        if (!update) return { message: 'Profile update failed', success: false };
        const jwt = sign({
            name: update.name,
            username: update.username,
            email: update.email,
            profileImage: update.profileImage,
            birthday: update.birthday,
            about: update.about,
            website: update.website,
            gender: update.gender,
            userId: update._id
        }, process.env.JWT_SECRET as string);
        cookies().set("pintrest-user", jwt);
        return { message: 'Profile Updated Successfully', success: true };
    } catch (error: any) {
        if (error.code === 11000) return { message: 'Username not available', success: false }
        return error.message;
    }
}