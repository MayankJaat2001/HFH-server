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
            ISOname,
            Region,
            WorkPhone,
            CellPhone,
            ISOManager,
            OwnerFirstName,
            OwnerLastName,
            OwnerEmail,
            OwnerWorkPhone,
            OwnerCellPhone,
            RepaymentFirstName,
            RepaymentLastName,
            RepaymentEmail,
            RepaymentWorkPhone,
            RepaymentCellPhone,
            RepaymentAddress,
            files
            } =req.body;
            try {
                // const mydata= await mongoose.connection.db.collection('fs.files').find().toArray();
                const fileDocuments = files.map(file => ({
                    filename:file.filename,
                    path:`${serverurl}/file/${file.docid}`
                }));
            
            const ISOUID = generateUID();
            const isos=new ISOs({
                AgentUID,
                ISOUID,
                Details:{                    
                    ISOname,
                    Region,
                    WorkPhone,
                    CellPhone,
                    ISOManager,
                },
                OwnerContract:{

                    OwnerFirstName,
                    OwnerLastName,
                    OwnerEmail,
                    OwnerWorkPhone,
                    OwnerCellPhone,
                },
                RepaymentPlan:{
                    RepaymentFirstName,
                    RepaymentLastName,
                    RepaymentEmail,
                    RepaymentWorkPhone,
                    RepaymentCellPhone,
                    RepaymentAddress,
                },
                document:fileDocuments,
            });
            await isos.save();
            res.status(201).json({message:'General Details and documents added successfully',isouid:isos.ISOUID})
        }catch(err){
            res.status(500).json({message:'Error saving ISO Data',error:err.message})
        }
}

export const getISOs = async(req,res)=>{
    try{
        const agentUID=req.query.agentUID;
        if(!agentUID){
            return res.status(400).json({message:"AgentUID is required"})
        }
        const isos= await ISOs.find({"AgentUID":agentUID});
        res.status(200).json(isos);
    }catch(err){
        return res.status(500).json({message:"Error while fetching ISOs",error:err.message})

    }
}