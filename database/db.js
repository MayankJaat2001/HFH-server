import mongoose from "mongoose";

const Connection= async(URL)=>{
    try{
        await mongoose.connect(URL)
        console.log("Database Connected Successfully");
    }catch(err){
        console.log("Error while connecting to Database",err.message)
    }

}
export default Connection;