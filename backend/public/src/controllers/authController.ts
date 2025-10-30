import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";

const registerUser = asyncHandler(async (req: any, res: any) => {
    console.log("=== Registration Request ===");
    console.log("Body:", req.body);
    console.log("File:", req.file);
    console.log("Files:", req.files);
    console.log("==========================");
    
    const { username, email, password } = req.body;
    
    // Validation
    if (!username || !email || !password) {
        console.log("Validation failed - missing fields");
        return res.status(400).json(new apiError(400, "All fields are required", [], ""));
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        return res.status(409).json(new apiError(409, "User is already registered", [], ""));
    }

    // Upload avatar if provided
    // upload.any() stores files in req.files array, not req.file
    const avatarFile = req.files && req.files.length > 0 ? req.files[0] : null;
    const localFilePath = avatarFile?.path;
    let avatarUrl = null;
    if (localFilePath) {
        console.log("Uploading avatar to Cloudinary...");
        const cloudinaryResponse = await uploadOnCloudinary(localFilePath);
        avatarUrl = cloudinaryResponse?.secure_url || null;
        console.log("Avatar URL:", avatarUrl);
    } else {
        console.log("No avatar file provided");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const createdUser = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
            avatar: avatarUrl,
        },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = createdUser;

    return res.status(201).json(new apiResponse(201, "User created successfully", userWithoutPassword));
});

export { registerUser };