import express from "express";
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import mongoose from "mongoose";


const app=express();




const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})