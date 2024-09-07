import ownerships from "../models/owner-schema.js"

const generateUID = () => {
    return Math.floor(100 + Math.random() * 900).toString();
};
export const addOwnership= async(request,response)=>{
    const {Name ,Percentage , FICO, DOB} = request.body;
    const owner_id=generateUID()
    try{

       const newOwnership = new ownerships({
            owner_id,
            Name,
            Percentage,
            FICO,
            DOB
        })
        await newOwnership.save();
        return response.status(201).json({Message:'ownership added successfully!',data:newOwnership.owner_id})
    }catch(err){
        return response.status(500).json({Message:'Error while saving ownership data',error:err.message})
    }
}

export const updateOwnership= async(request,response)=>{
    const {id}=request.params;
    const updateOwnership=request.body;
    try{
        const updatedOwnership = await ownerships.findOneAndUpdate({owner_id:id},updateOwnership,{
            new:true,
            runValidators:true
        })

        if(!updatedOwnership){
            return response.status(404).json({Message:"Owner not found"});
        }
        response.status(200).json({Message:'Owner updated Successfully',data:{updatedOwnership}})
    }catch(err){
        return response.status(500).json({Message:'Error while updating Ownership',error:err.message})
    }
}

export const deleteOwnership= async(request,response)=>{
    const {id}=request.params;

    try{
        const deletedOwnership = await ownerships.findOneAndDelete({owner_id:id});
        if(!deletedOwnership){
            return response.status(404).json({Message:'Owner not found'})
        }
        return response.status(200).json({Message:'Owner deleted successfullt'})
    }catch(err){
        return response.status(500).json({Message:'Error while deleting Owner',error:err.message})

    }
}