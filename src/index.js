import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import connectDB from "./db/index.js";
import {app} from "./app.js";




const port = process.env.PORT || 3000;

connectDB().then(()=>{
    app.on("err",()=>{
        console.log("Erron on listen:",err);
        throw err;
    })
    app.listen(port,()=>{
        console.log(`Server running on port ${port}`);
    })
}).catch((err)=>{
    console.log("Failed Mongo connection in index app file:\n",err);
});


