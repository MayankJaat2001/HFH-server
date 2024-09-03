import weblinks from "../models/weblink-schema.js"

const generateUID = () => {
    return Math.floor(100 + Math.random() * 900).toString();
};
export const addWebLink=async(request,response)=>{
    const {Description , Links}=request.body;
    const weblink_id = generateUID()
    try{
        const newWebLinks = new weblinks({
            weblink_id,
            Description,
            Links
        })
        await newWebLinks.save();
        return response.status(201).json({Message:'Weblinks added successfully!',data:{newWebLinks}})
    }catch(err){
        return response.status(500).json({Message:'Error while adding weblinks',error:err.message})
    }
}
export const updateWebLinks=async(request,response)=>{
    const {id}=request.params;
    const updateWebLink = request.body;
    try{
        const updatedWebLink=await weblinks.findOneAndUpdate({weblink_id:id},updateWebLink,{
            new:true,
            runValidators:true
        })
        if(!updatedWebLink){
            return response.status(404).json({Message:'Weblink not found'})
        }
        return response.status(200).json({Message:'Weblink updated successfully!',data:{updateWebLink}})
    }catch(err){
        return response.status(500).json({Message:'Error while updating Weblinks',error:err.message})
    }
}
export const deleteWebLink=async(request,response)=>{
    const {id} = request.params;

    try{
        const deletedWebLink = await weblinks.findOneAndDelete({weblink_id:id})
        if(!deletedWebLink){
            return response.status(404).json({Message:'Weblink not found'});
        }
        return response.status(200).json({Message:'Weblink deleted Successfully!'})
    }catch(err){
        return response.status(500).json({Message:'Error while deleting Weblink',error:err.message})
        
    }
}