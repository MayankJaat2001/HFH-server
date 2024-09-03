import mongoose from "mongoose";

const weblinkSchema = new mongoose.Schema({
    weblink_id:Number,
    Description:String,
    Links:String
})

const weblinks = mongoose.model("weblinks",weblinkSchema);
export default weblinks;