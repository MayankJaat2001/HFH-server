import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    note_id:Number,
    TypeOfNotes:String,
    Note:String,
    Date:{type:Date,default:Date.now}
})

const notes = mongoose.model("notes",notesSchema);
export default notes;