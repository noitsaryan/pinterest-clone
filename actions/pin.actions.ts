"use server"
import { Pin } from "@/models/pin.model";
import { getUserData } from "./cookies.actions";
import { connectDB } from "@/utils/mongodb";
import { authorize } from "./auth.actions";
import { User } from "@/models/user.model";

export const createPin = async ({
    image, title, description, link, tags
}: {
    image: string,
    title: string,
    description: string,
    link: string,
    tags: string[]
}) => {
    try {
        await connectDB();
        const isValid = await authorize();

        if (!isValid.success) return { message: 'Session Invalid', success: false }

        if (!image || !title || !description) return { message: 'Fill all the data', success: false };

        if (tags.length === 0) return { message: 'Add atleast one tag', success: false };

        const user = await getUserData();

        const { data } = user
        const pinObject = {
            image, title, description, link, tags, userId: data.userId
        }
        const pin = await Pin.create(pinObject);
        if (!pin) return { message: 'Error creating new pin', success: false }

        return { message: 'Pin created successfully ', success: true }
    } catch (error: any) {
        if (error.code === 11000) return { message: 'Same Pin already exists. Please add other image.', success: false }
        return { message: error.message, success: false };
    }
}

export const getUserPins = async (index = 0, quantity = 10) => {
    try {
        await connectDB();
        const isValid: any = await authorize();
        if (!isValid.success) return { message: 'Session invalid', success: false };
        const pins = await Pin.find({ userId: isValid.user.userId }).skip(index * quantity).limit(quantity);
        if (pins.length === 0) return { message: 'Pins does not exists', success: false };
        return { message: 'Pins fetched Sucessfully', success: true, data: pins };
    } catch (error: any) {
        return { message: error.message, success: false };
    }
}

export const getPins = async (index = 0, quantity = 10) => {
    try {
        await connectDB();

        const pins = (await Pin.find().skip(index * quantity).limit(quantity)).reverse();

        if (pins.length === 0) return { message: 'Pins does not exists', success: false };

        return { message: 'Pins fetched Sucessfully', success: true, data: pins };
    } catch (error: any) {
        return { message: error.message, success: false };
    }
}

export async function searchPinByString(userInput: string) {
    try {
        const results = await Pin.aggregate([
            {
                $match: {
                    $or: [
                        {
                            tags: {
                                $regex: new RegExp(userInput, 'i')
                            }
                        },
                        { title: { $regex: userInput, $options: 'i' } },
                    ],
                },
            },
        ]);

        return results;
    } catch (error) {
        console.error('Error searching pins:', error);
        throw error;
    }
}

export const fetchPinById = async (id: string) => {
    try {
        if (!id) return {
            message: 'Please enter pin id',
            success: false
        }
        await connectDB();
        const pin = await Pin.findOne({ _id: id }).exec();
        
        return {
            message: 'Fetched pin successfully',
            success: true,
            data: pin
        }
    } catch (error: any) {
        return {
            message: error.message,
            success: false
        }
    }
}