
import mongoose from "mongoose";

const ownershipSchema = new mongoose.Schema({
        owner_id:String,
        Name:String,
        Percentage:String,
        FICO:String,
        DOB:String
    
})
const ownerships = mongoose.model('ownerships',ownershipSchema)
export default ownerships;