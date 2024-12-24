import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"

const connectDB=async()=>{
    try {
        const dbInitialization=await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        // console.log(dbInitialization);
        console.log("Database connected");
    } catch (err) {
        console.log("Mongoose me error aa gayi \n",err);
        process.exit(1);
    }
}

export default connectDB;