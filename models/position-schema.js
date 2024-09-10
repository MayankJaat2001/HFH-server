import mongoose from "mongoose";

const positionSchema = new mongoose.Schema({
    Position_id:String,
    Active:String,
    Position:String,
    Funder:String,
    AmountFunded:String,
    FactorRate:String,
    PaybackAmount:String,
    Frequency:String,
    ACH:String,
    Date:String,
    PercentageOfGross:String,
    ApproxDatePositionCloses:String,
    ApproxBalance:String
})

const positions=mongoose.model("position",positionSchema);
export default positions