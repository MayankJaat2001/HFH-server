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
            RepaymentAddress
            } =req.body;
            try {
                const mydata= await mongoose.connection.db.collection('fs.files').find({'metadata.ISOUID':ISOUID}).toArray();
                const fileDocuments = mydata.map(file => ({
                    filename:file.filename,
                    path:`${serverurl}/file/${file.metadata.doc_id}`
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
            res.status(500).json({err:'Error saving ISO Data'})
        }
}
