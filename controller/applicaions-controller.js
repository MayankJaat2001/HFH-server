import applications from "../models/application-schema.js";
import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config()

const serverurl=process.env.SERVER_URL;

const generateUID = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

export const addApplications=async(req,res)=>{
    const {
        AgentUID,
        Overview:{
            BussinessInformation: {
                BussnessName,
                EmailAddress,
                ClientFirstName,
                ClientLastName,
                Web,
                PhoneNumber
            },
            FundingDetails: {
                WhiteLabel,
                Installment,
                Type
            },
            ISODetails: {
                ISOName,
                ISOSalesRep: OverviewISOSalesRep,
                SalesRep,
                ISOManager
            },
        },
            ClientDetails:{
                
                BussinessInformation: {
                    LegalName,
                DoingBussinessAs,
                CompanyEmail,
                BussnessPhoneNumber,
                CellPhoneNumber,
                PrimaryWebsite
            },
            IndustryDetails: {
                SICDescription,
                SICCode,
                NAICSDescription,
                NAICSCode
            },
            BussinessDetails: {
                DateBussinessStarted,
                LengthOfOwnership,
                GrossMonthlySales,
                IncorporationState,
                EINNumber,
                Addresses
            },
            ISOInformation: {
                ReferringISO,
                ISOSalesRep: ClientDetailsISOSalesRep
            },
        },
        Notes:{
            NoteType,
            NoteTemplate,
            NoteContent
        }        
    }=req.body;
    const ApplicationId=generateUID();
    const mydata= await mongoose.connection.db.collection('application.files').find().toArray();
                const fileDocuments = mydata.map(file => ({
                    filename:file.filename,
                    path:`${serverurl}/application/${file.metadata}`
                }));
    try{
        const newApplication = new applications({
            AgentUID,
            ApplicationId,
            Overview:{
                BussinessInformation: {
                    BussnessName,
                    EmailAddress,
                    ClientFirstName,
                    ClientLastName,
                    Web,
                    PhoneNumber
                },
                FundingDetails: {
                    WhiteLabel,
                    Installment,
                    Type
                },
                ISODetails: {
                    ISOName,
                    ISOSalesRep: OverviewISOSalesRep,
                    SalesRep,
                    ISOManager
                },
            },
                ClientDetails:{
                    
                    BussinessInformation: {
                        LegalName,
                    DoingBussinessAs,
                    CompanyEmail,
                    BussnessPhoneNumber,
                    CellPhoneNumber,
                    PrimaryWebsite
                },
                IndustryDetails: {
                    SICDescription,
                    SICCode,
                    NAICSDescription,
                    NAICSCode
                },
                BussinessDetails: {
                    DateBussinessStarted,
                    LengthOfOwnership,
                    GrossMonthlySales,
                    IncorporationState,
                    EINNumber,
                    Addresses
                },
                ISOInformation: {
                    ReferringISO,
                    ISOSalesRep: ClientDetailsISOSalesRep
                },
            },
            Documents:fileDocuments,
            Notes:{
                NoteType,
                NoteTemplate,
                NoteContent
            }
        });
        await newApplication.save();
        res.status(201).json({Message:'Application Details and Documents added Successfully',application_Id:newApplication.ApplicationId})
    }catch(err){
        res.status(500).json({ Message: 'Error saving application', error: err.message });
    }
}

export const updateApplication=async(req,res)=>{
    const {id} = req.params;
    const updateData=req.body;

    try{
        const updatedApplication = await applications.findOneAndUpdate({ApplicationId:id},updateData,{
            new:true,
            runValidators:true
        });

        if(!updatedApplication){
            return res.status(404).json({message:"Application is not found"});
        }
        res.status(200).json({message:"Application updated successfully",data:updatedApplication})
    }catch(err){
        res.status(500).json({message:"Error while updating Application",error:err.message,err})
    }
}