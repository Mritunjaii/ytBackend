import {ApiError} from "../utils/apiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/apiResponse.js"
import {User} from "../models/user.models.js"
import mongoose from "mongoose"



const registerUser = asyncHandler(async(req, res) => {
    const {fullName, email, username, password } = req.body;
    if([fullName, email, username, password].some((field)=>field?.trim()==="")){
        throw new ApiError (400,"All fields are required");
    }
    const existedUserCheck= await User.findone({
        $or: [{username},{email}]
    })
    if(existedUserCheck){
        throw new ApiError(409,"User already exists")
    }

    const user=await User.create({
        username:username.lowercase(),
        avatar: avatar.url,
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
        new ApiResponse(200,createdUser,"user created successfully")
    )
    
});

export { registerUser };
