import {ApiError} from "../utils/apiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/apiResponse.js"
import {User} from "../models/user.models.js"
import mongoose from "mongoose"
import {uploadOnCloudinary} from "../utils/cloudinary.js"



const registerUser = asyncHandler(async(req, res) => {
    const {fullName, email, username, password } = req.body
    // console.log( req.body);
    // console.log("email: ", email);
    if([fullName, email, username, password].some((field)=>field?.trim()==="")){
        throw new ApiError (400,"All fields are required");
    }
    const existedUserCheck= await User.findOne({
        $or: [{username},{email}]
    })
    if(existedUserCheck){
        throw new ApiError(409,"User already exists")
    }
    // const avatarLocalPath = req.files?.avatar[0]?.path;
    // if(!avatarLocalPath){
    //     throw new ApiError(400,"Avatar is req")
    // }

    let avatarLocalPath
    if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0){
        avatarLocalPath=req.files.avatar[0].path;
    }



    let coverLocalPath
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverLocalPath=req.files.coverImage[0].path;
    }
    
    const avatar=uploadOnCloudinary(avatarLocalPath);
    const coverImage=uploadOnCloudinary(coverLocalPath);


    const user=await User.create({
        username:username.toLowerCase(),
        avatar: avatar?.url || "",
        email,
        fullName,
        password,
        coverImage:coverImage?.url || ""
    })
    const createdUser= await User.findById(user._id).select("-password -refershToken");
    
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user");
    }
    res.status(201).json(
        new ApiResponse(200,"createdUser","user created successfully")
    )
    
});


const loginUser=asyncHandler

export { registerUser };
