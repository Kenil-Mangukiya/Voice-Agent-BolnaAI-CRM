import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req: any, res: any) => {
    const {username, email, password} = req.body;
    console.table({username, email, password});
    if(!username || !email || !password) {
        return res.status(400).json(new apiError(400, "All fields are required",[],""));
    }
    const localFilePath = req.file?.path;
    console.log("localFilePath is : ",localFilePath);
    let imageUrl = null;
    if(localFilePath) {
        const cloudinaryResponse = await uploadOnCloudinary(localFilePath);
        console.log("cloudinaryResponse is : ",cloudinaryResponse);
        imageUrl = cloudinaryResponse?.secure_url;
        return imageUrl;
    }
    else
    {
        return
    }
})