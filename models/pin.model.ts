import mongoose, { model, models, Schema } from 'mongoose'
import { User } from '@/models/user.model'

const PinSchema = new Schema({
    title: String,
    description: String,
    link: String,
    tags: Array,
    image: { type: String, index: true, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export const Pin = models?.Pin || model("Pin", PinSchema)