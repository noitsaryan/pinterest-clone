"use server"
import { Saved } from "@/models/saved.model";
import { connectDB } from "@/utils/mongodb"
import { getUserData } from "./cookies.actions";

export const savePin = async (postId: string) => {
    try {
        const userId = postId && await getUserData();
        if (!userId) return {
            message: 'Please login to continue',
            success: false
        }
        const user = userId.data.userId;
        await connectDB();

        const userSaved = await Saved.findOne({
            userId: user, pinId: postId
        })

        if (userSaved) {
            const remove = await Saved.deleteOne({
                userId: user, pinId: postId
            });
            return {
                message: 'Removed from saved',
                success: true,
                confirmation: remove
            }
        }

        const save = await Saved.create({
            pinId: postId,
            userId: user
        });

        return {
            message: 'Saved Successfully', success: true, data: {
                userId: save.userId.toString(),
                pinId: save.pinId.toString(),
                _id: save._id.toString()
            }
        }
    } catch (error: any) {
        if (error.message === "Cannot read properties of undefined (reading 'userId')") {
            return {
                message: 'Please login to continue.',
                success: false
            }
        }
        return { message: error.message, success: false }
    }
}

export const getUserSaved = async (index = 0, quantity = 10) => {
    try {
        const user = await getUserData();
        if (!user) return { message: "Session invalid", success: false };
        await connectDB();
        const savedUsers = await Saved.find({
            userId: user.data.userId
        }).skip(index * quantity).limit(quantity).populate("pinId").exec();
        if (savedUsers.length === 0) return {
            message: 'No saved pins available.',
            saved: false
        }
        return {
            message: 'Fetched Saved Pins',
            success: true,
            data: savedUsers
        }
    } catch (error: any) {
        return {
            message: error.message,
            success: false
        }
    }
}