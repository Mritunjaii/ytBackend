import {ApiError} from "../utils/apiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/apiResponse.js"
import {User} from "../models/user.models.js"
import mongoose from "mongoose"



const registerUser=(req,res)=>{
    console.log("afffff")
    res.status(201).send("dfgh")
}

export {registerUser}