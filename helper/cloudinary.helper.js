import { cloudinary } from "../configuration/cloudinary.config.js";

export const uploadToCloudinary = async(filePath)=>{
    try {
        const result = await cloudinary.uploader.upload(filePath);
        return {
            url :result.secure_url,
            publicId: result.public_id,
            
        }
    } catch (err) {
        console.error("Error while uploding to cloudinary ",err);
    }
}