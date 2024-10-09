import dotenv from 'dotenv'
import ISOs from "../models/iso-schema.js";
import mongoose from "mongoose";

dotenv.config()

const serverurl = process.env.SERVER_URL;

const generateUID = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};



export const addISOs =async(req,res)=>{
        const {AgentUID,
            Details,
            OwnerContract,
            RepaymentPlan,
            files
            } =req.body;
            console.log(req.body)
            try {
                // const mydata= await mongoose.connection.db.collection('fs.files').find().toArray();
                const fileDocuments = files.map(file => ({
                    filename:file.filename,
                    path:`${serverurl}/file/${file.docid}`,
                    docid:file.docid
                }));
            
            const ISOUID = generateUID();
            const isos=new ISOs({
                AgentUID,
                ISOUID,
                Details,
                OwnerContract,
                RepaymentPlan,
                document:fileDocuments,
            });
            await isos.save();
            return res.status(201).json({message:'General Details and documents added successfully',isouid:isos.ISOUID})
        }catch(err){
            return res.status(500).json({message:'Error saving ISO Data',error:err.message})
        }
}

export const getISOs = async(req,res)=>{
    try{
        const agentUID=req.query.agentUID;
        if(!agentUID){
            return res.status(400).json({message:"AgentUID is required"})
        }
        const isos= await ISOs.find({"AgentUID":agentUID});
        return res.status(200).json(isos);
    }catch(err){
        return res.status(500).json({message:"Error while fetching ISOs",error:err.message})

    }
}
export const getAllISOs = async(req,res)=>{
    try{
        const isos= await ISOs.find({});
        return res.status(200).json(isos);
    }catch(err){
        return res.status(500).json({message:"Error while fetching ISOs",error:err.message})

    }
}

export const getSingleISOs = async(req,resp)=>{
    const {id} = req.params;
    try{
        const singleISO = await ISOs.findOne({ISOUID:id})
        if(!singleISO){
            return resp.status(404).json({message:'ISO not Found'})
        }
        return resp.status(201).json(singleISO)
    }catch(err){
        return resp.status(500).json({message:'Error while fetching your application',error:err.message})
    }
}