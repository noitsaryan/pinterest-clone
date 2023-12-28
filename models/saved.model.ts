import mongoose, { model, Schema, models } from 'mongoose';
import { User } from '@/models/user.model';
import { Pin } from './pin.model';

const SavedSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    pinId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pin',
        required: true,
        unique: true
    }
});

SavedSchema.index({ userId: 1, pinId: 1 }, { unique: true });

export const Saved = models?.Saved || model("Saved", SavedSchema);
