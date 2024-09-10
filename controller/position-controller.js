import positions from "../models/position-schema";

const generateUID = () => {
    return Math.floor(100 + Math.random() * 900).toString();
};
export const addPositions = async (req, resp) => {
    const {
        Active,
        Position,
        Funder,
        AmountFunded,
        FactorRate,
        PaybackAmount,
        Frequency,
        ACH,
        Date,
        PercentageOfGross,
        ApproxDatePositionCloses,
        ApproxBalance
    } = req.body;
    const Position_id = generateUID()
    try {
        const newPosition = new positions({
            Position_id,
            Active,
            Position,
            Funder,
            AmountFunded,
            FactorRate,
            PaybackAmount,
            Frequency,
            ACH,
            Date,
            PercentageOfGross,
            ApproxDatePositionCloses,
            ApproxBalance
        })
        await newPosition.save()
        return response.status(201).json({Message:'position added successfully!',data:newPosition.Position_id})
    }catch(err){
        return response.status(500).json({Message:'Error while adding position',error:err.message})
    }
}
export const updatePosition= async(request,response)=>{
    const {id}=request.params;
    const updatenewPosition=request.body;
    try{
        const updatedposition = await positions.findOneAndUpdate({Position_id:id},updatenewPosition,{
            new:true,
            runValidators:true
        })

        if(!updatedposition){
            return response.status(404).json({Message:"Position not found"});
        }
        response.status(200).json({Message:'Position updated Successfully',data:{updatedposition}})
    }catch(err){
        return response.status(500).json({Message:'Error while updating position',error:err.message})
    }
}

export const deleteposition= async(request,response)=>{
    const {id}=request.params;

    try{
        const deletedposition = await positions.findOneAndDelete({Position_id:id});
        if(!deletedposition){
            return response.status(404).json({Message:'Position not found'})
        }
        return response.status(200).json({Message:'Position deleted successfully'})
    }catch(err){
        return response.status(500).json({Message:'Error while deleting position',error:err.message})

    }
}