import applications from "../models/application-schema.js";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import ownerships from "../models/owner-schema.js";
import notes from "../models/notes-schema.js";
import weblinks from "../models/weblink-schema.js";

dotenv.config()

const serverurl = process.env.SERVER_URL;

const generateUID = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

export const addApplications = async (req, res) => {
    const {data,
        // AgentUID,
        // Overview: {
        //     BusinessInformation: {
        //         LegalName,
        //         DBAName,
        //         EmailAddress,
        //         BusinessNumber,
        //         PreferredContactPhoneNumber,
        //         EntityType,
        //         FederalTaxID,
        //         BusinessStartDateUnderCurrentOwnership,
        //         StateofIncorporation,
        //         IndustryType,
        //         BusinessStructure,
        //         City,
        //         State,
        //         ZIP,
        //         SourcesofRevenue,
        //         BusinessLocation
        //     },
        //     FundingDetails: {
        //         LenderName,
        //         Installment,
        //         TypeOfLoan,
        //         Frequency
        //     },
        //     ISODetails: {
        //         ISOName,
        //         ISOSalesRep: OverviewISOSalesRep,
        //         SalesRep,
        //         ISOManager
        //     },
        // },
        // ClientDetails: {

        //     OwnerInformation: {
        //         FirstName,
        //         LastName,
        //         CompanyEmail,
        //         BusinessPhoneNumber,
        //         CellNumber,
        //         PrimaryWebsite,
        //         Amount,
        //         SSN,
        //         DateOFBirth,
        //         Religion,
        //         Ethnicity,
        //         HomeStreetAddress,
        //         City: OwnerCity,
        //         State: OwnerState,
        //         ZIP: OwnerZIP,
        //     },
        //     IndustryDetails: {
        //         SICDescription,
        //         SICCode,
        //         NAICSDescription,
        //         NAICSCode
        //     },
        //     BusinessDetails: {
        //         DateBusinessStarted,
        //         LengthOfOwnership,
        //         IncorporationDate,
        //         GrossMonthlySales,
        //         IncorporationState,
        //         TypesOfBusinessEntity,
        //         EINNumber,
        //         Addresses
        //     },
        //     ISOInformation: {
        //         ReferringISO,
        //         ISOSalesRep: ClientDetailsISOSalesRep
        //     },
        //     // CardInfo:{
        //     //     DebitCredit,
        //     //     CardType,
        //     //     CardIssuer,
        //     //     NameOnCard,
        //     //     CardNumber,
        //     //     ExpiryDate,
        //     //     CVV
        //     // },
        //     // BillionInfo:{
        //     //     BillingAddress,
        //     //     BillingAddress2,
        //     //     BillingCity,
        //     //     BillingState,
        //     //     BillingZIPCode
        //     // },
        //     // BankDetails:{
        //     //     RoutingNumber,
        //     //     AccountNumber,
        //     //     BankName,
        //     //     AccountType,
        //     //     HolderName,
        //     //     AccountHolderAddress,
        //     //     AccountHolderCity,
        //     //     AccountHolderState,
        //     //     AccountHolderZIPCode
        //     // },
        // },
        // Notes: {
        //     NoteType,
        //     NoteTemplate,
        //     NoteContent
        // },
        files
    } = req.body;
    try {
        const SSN = data.ClientDetails.OwnerInformation.SSN;
        const existingApplication = await applications.findOne({"ClientDetails.OwnerInformation.SSN": SSN});
        if (existingApplication) {
            console.log("Checking exisitng Appliation")
            return res.status(401).json({
                Message: `Application with SSN ${SSN} already exists`,
                applicationId: existingApplication.ApplicationId
            })
        }
            // const fileDocuments= await mongoose.connection.db.collection('application.files').find().toArray();
            // const fileDocuments =[]
            const fileDocuments =[] || files.map(file => ({
                    filename: file.filename,
                    path: `${serverurl}/application/${file.docid}`,
                    docid: file.docid
                }));
                const ApplicationId = generateUID();
                const newApplication = new applications({...data,
                    ApplicationId,
                //     AgentUID,
                //     Overview: {
                //         BusinessInformation: {
                //             LegalName,
                //             DBAName,
                //             EmailAddress,
                //             BusinessNumber,
                //             PreferredContactPhoneNumber,
                //             EntityType,
                //             FederalTaxID,
                //             BusinessStartDateUnderCurrentOwnership,
                //             StateofIncorporation,
                //             IndustryType,
                //             BusinessStructure,
                //             City,
                //             State,
                //             ZIP,
                //             SourcesofRevenue,
                //             BusinessLocation
                //         },
                //         FundingDetails: {
                //             LenderName,
                //             Installment,
                //             TypeOfLoan,
                //             Frequency
                //         },
                //         ISODetails: {
                //             ISOName,
                //             ISOSalesRep: OverviewISOSalesRep,
                //             SalesRep,
                //             ISOManager
                //         },
                //     },
                //     ClientDetails: {
                        
                //         OwnerInformation: {
                //             FirstName,
                //             LastName,
                //             CompanyEmail,
                //             BusinessPhoneNumber,
                //             CellNumber,
                //             PrimaryWebsite,
                //             Amount,
                //             SSN,
                //             DateOFBirth,
                //             Religion,
                //             Ethnicity,
                //             HomeStreetAddress,
                //             City:OwnerCity,
                //             State:OwnerState,
                //             ZIP:OwnerZIP,
                //         },
                //         IndustryDetails: {
                //             SICDescription,
                //             SICCode,
                //             NAICSDescription,
                //             NAICSCode
                //         },
                //         BusinessDetails: {
                //             DateBusinessStarted,
                //             LengthOfOwnership,
                //             IncorporationDate,
                //             GrossMonthlySales,
                //             IncorporationState,
                //             TypesOfBusinessEntity,
                //             EINNumber,
                //             Addresses
                //         },
                //         ISOInformation: {
                //             ReferringISO,
                //             ISOSalesRep: ClientDetailsISOSalesRep
                //         },
                //         //     CardInfo:{
                // //         DebitCredit,
                // //         CardType,
                // //         CardIssuer,
                // //         NameOnCard,
                // //         CardNumber,
                // //         ExpiryDate,
                // //         CVV
                // //     },
                // //     BillionInfo:{
                //     //         BillingAddress,
                //     //         BillingAddress2,
                //     //         BillingCity,
                //     //         BillingState,
                //     //         BillingZIPCode
                //     //     },
                //     //     BankDetails:{
                //         //         RoutingNumber,
                //         //         AccountNumber,
                //         //         BankName,
                //         //         AccountType,
                //         //         HolderName,
                //         //         AccountHolderAddress,
                //         //         AccountHolderCity,
                //         //         AccountHolderState,
                //         //         AccountHolderZIPCode
                //         //     },
                //     },
                //     // Documents,
                //     Notes: {
                    //         NoteType,
                    //         NoteTemplate,
                    //         NoteContent
                    //     },
                        Documents: fileDocuments,
                    Status: "In Process"
                });
        await newApplication.save();
        res.status(201).json({ Message: 'Application Details and Documents added Successfully', application_Id: newApplication.ApplicationId })
    }
    catch (err) {
        res.status(500).json({ Message: 'Error saving application', error: err.message });
    }
}

export const updateApplication = async (req, res) => {
    const { id } = req.params;
    const { updateData, files } = req.body;
    console.log("Data:", req.body)
    const fileDocuments = files.map(file => ({
        filename: file.filename,
        path: `${serverurl}/application/${file.docid}`,
        docid: file.docid
    }));
    try {
        // const ownershipData = await ownerships.find({})
        // const notesData = await notes.find({})
        // const weblinkData = await weblinks.find({})


        const updatedFields = {
            ...updateData,
            Documents: fileDocuments,
            Status: updateData?.Decision.Status || "UnderWriting"
        };

        const updatedApplication = await applications.findOneAndUpdate({ ApplicationId: id }, updatedFields, {
            new: true,
            runValidators: true
        });

        if (!updatedApplication) {
            return res.status(404).json({ message: "Application is not found" });
        }
        return res.status(200).json({ message: "Application updated successfully", data: updatedApplication })
    } catch (err) {
        return res.status(500).json({ message: "Error while updating Application", error: err.message, err })
    }
}

export const getApplication = async (req, res) => {
    try {
        const agentUID = req.query.agentUID;
        if (!agentUID) {
            return res.status(400).json({ message: "AgentUID is required" })
        }
        const newApplications = await applications.find({ "AgentUID": agentUID });

        const applicationWithStatus = newApplications.map(app => ({
            ...app.toObject(),
            Status: app.Status || "In Process"
        }))
        res.status(200).json(applicationWithStatus);
    } catch (err) {
        return res.status(500).json({ message: "Error while fetching Applications", error: err.message })

    }
}
export const getAllApplication = async (req, res) => {
    try {

        const newApplications = await applications.find({});

        const applicationWithStatus = newApplications.map(app => ({
            ...app.toObject(),
            Status: app.Status || "In Process"
        }))
        res.status(200).json(applicationWithStatus);
    } catch (err) {
        return res.status(500).json({ message: "Error while fetching Applications", error: err.message })

    }
}



export const getSingleApplication = async (req, resp) => {
    const { id } = req.params;
    try {
        const singleApplication = await applications.findOne({ ApplicationId: id })
        if (!singleApplication) {
            return resp.status(404).json({ message: 'Application not Found' })
        }
        resp.status(201).json(singleApplication)
    } catch (err) {
        resp.status(500).json({ message: 'Error while fetching your application', error: err.message })
    }
}