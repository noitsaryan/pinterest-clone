import { model, models, Schema } from 'mongoose'

const UserSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, unique: true, lowercase: true, required: true },
    email: { type: String, unique: true, lowercase: true, required: true },
    gender: String,
    birthday: Date,
    authentication: {
        password: { type: String, required: true, select: false },
        sessionToken: { type: String, select: false },
        forgetToken: { type: String, select: false },
        sessionTimeout: { type: Date, select: false },
        forgetTimeout: { type: Date, select: false }
    },
    about: String,
    profileImage: String,
    website: String
});

export const User = models.User || model("User", UserSchema)