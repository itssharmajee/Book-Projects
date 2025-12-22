import mongoose from 'mongoose';
import multer from 'multer';

const imageSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    publicId: {
        type: String,
        required: true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
},{timestamps:true})

export const Image = mongoose.model("image", imageSchema);

