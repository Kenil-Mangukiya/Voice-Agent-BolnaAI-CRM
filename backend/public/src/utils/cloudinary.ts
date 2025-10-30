import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_SECRET
});

console.log("cloud_name", process.env.CLOUD_NAME);
console.log("cloud_key", process.env.CLOUD_KEY);
console.log("cloud_secret", process.env.CLOUD_SECRET);

const uploadOnCloudinary = async (filePath: string) => {
    try {
        if (!filePath) {
            return null;
        }
        
        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto"
        });
        
        console.log("Success: File uploaded to cloudinary at:", response.url);
        
        // Delete local file after successful upload
        fs.unlinkSync(filePath);
        
        return response;
    } catch (error) {
        console.log("Error: While uploading file to cloudinary:", error);
        
        // Delete local file even if upload fails
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        
        return null;
    }
};

export default uploadOnCloudinary;