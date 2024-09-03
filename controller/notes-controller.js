import notes from "../models/notes-schema.js"

const generateUID = () => {
    return Math.floor(100 + Math.random() * 900).toString();
};
export const addNotes=async(request,response)=>{
    const {TypeOfNotes , Note} = request.body;
    const note_id=generateUID();
    try{
        const newNotes=new notes({
            note_id,
            TypeOfNotes,
            Note
        })
        await newNotes.save();
        return response.status(201).json({Message:'Notes added successfully',data:{newNotes}})
    }catch(err){
        return response.status(500).json({Message:'Error while adding Notes',error:err.message})
    }
}

export const updateNotes=async(request,response)=>{
    const {id} = request.params;
    const updateNote = request.body;
    try{
        const updatedNotes = await notes.findOneAndUpdate({note_id:id},updateNote,{
            new:true,
            runValidators:true
        })
        if(!updatedNotes){

            return response.status(404).json({Message:'Note not found'})
        }
        return response.status(200).json({Message:'Notes updated successfully!',data:{updatedNotes}})
    }catch(err){
        return response.status(500).json({Message:'Error while updating Notes',error:err.message})
    }
}

export const deleteNotes=async(request,response)=>{
    const {id}=request.params;

    try{
        const deletedNote=await notes.findOneAndDelete({note_id:id});
        if(!deletedNote){
            return response.status(404).json({Message:'Note not found'})
        }
        return response.status(200).json({Message:'Note deleted successfully!'})
    }catch(err){
        return response.status(500).json({Message:'Error while deleting Note',error:err.message})
    }
}