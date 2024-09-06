import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    AgentUID:Number,
    ApplicationId:Number,
    Overview: {
        BusinessInformation: {
            BusinessName:String,
            EmailAddress:String,
            ClientFirstName:String,
            ClientLastName: String,
        },
        FundingDetails: {
            WhiteLabel: String,
            Installment: Number,
            Type: String,
        },
        ISODetails: {
            ISOName: String,
            ISOSalesRep:String,
            SalesRep:String,
            ISOManager: String,
        },
    },
    ClientDetails: {
        BusinessInformation: {
            LegalName:String,
            DoingBusinessAs:String,
            CompanyEmail:String,
            BusinessPhoneNumber:Number,
            CellPhoneNumber:Number,
            PrimaryWebsite:String,
        },
        IndustryDetails:{
            SICDescription:String,
            SICCode:Number,
            NAICSDescription:String,
            NAICSCode:Number,
        },
        BusinessDetails:{
            DateBusinessStarted:String,
            LengthOfOwnership:String,
            IncorporationDate:String,
            GrossMonthlySales:String,
            IncorporationState:String,
            TypesOfBusinessEntity:String,
            EINNumber:String,
            Addresses:String,
        },
        ISOInformation:{
            ReferringISO:String,
            ISOSalesRep:String,
        },
        CardInfo:{
            DebitCredit:String,
            CardType:String,
            CardIssuer:String,
            NameOnCard:String,
            CardNumber:String,
            ExpiryDate:String,
            CVV:String
        },
        BillionInfo:{
            BillingAddress:String,
            BillingAddress2:String,
            BillingCity:String,
            BillingState:String,
            BillingZIPCode:Number
        },
        BankDetails:{
            RoutingNumber:String,
            AccountNumber:String,
            BankName:String,
            AccountType:String,
            HolderName:String,
            AccountHolderAddress:String,
            AccountHolderCity:String,
            AccountHolderState:String,
            AccountHolderZIPCode:Number
        },
    },
    Documents:[{
        filename:String,
            path:String,
            uploadedAt:{type:Date,default:Date.now},
}],
    Notes:{
        NoteType:String,
        NoteTemplate:String,
        NoteContent:String,
    },
    UnderWriting:{
        BusinessInformation:{
            GrossMonthlySales:String,
            LengthOfOwnership:String,
            TimeinBusiness:String,
        },
        IndustryDetails:{
            NAICSDescription:String,
            NAICSCode:String,
        },
        BusinessDetails:{
            DateBusinessStarted:String,
            LengthOfOwnership:String,
            IncorporationDate:String,
            GrossMonthlySales:String,
            IncorporationState:String,
            TypeOfBusinessEntity:String,
            EINNumber:String,
            Addresses:String
        },
        Ownership:[{
            Name:String,
            Percentage:String,
            FICO:String,
            DOB:String
        }],
        Weblinks:[{
            Description:String,
            Links:String
        }],
        BusinessNotes:[{
            TypeOfNotes:String,
            Note:String,
            Date:String,
        }],
        OperationsNotes:{
            UnderWritingBankName:String,
            UnderWritingRoutingNumber:String,
            UnderWritingAccountNumber:String,
            UnderWritingAccountType:String
        },
        // SavedPositions:{
        //     Active:String,
        //     Position:String,
        //     Funder:String,
        //     AmountFunded:String,
        //     FactorRate:String,
        //     PaybackAmount:String,
        //     Frequency:String,
        //     ACH:String,
        //     Date:String,
        //     PercentageOfGross:String,
        //     ApproxDatepositionCloses:String,
        //     ApproxBalance:String
        // },
        // SavedTerms:{
        //     Active:String,
        //     Approved:String,
        //     Payback:String,
        //     TransmissionMethod:String,
        //     TermLength:String,
        //     BuyRate:String,
        //     Position:String,
        //     Commission:String,
        //     CommissionPercent:String,
        //     FactorRate:String,
        //     BankFee:String,
        //     NumberOfPayments:String,
        //     PaymentsAmount:String,
        //     Frecuency:String,
        //     PercentageGross:String
        // },
        // Stipulations:{
        //     FileName:String,
        //     AssociateStipulation:String,
        //     CreatedBy:String,
        //     CreatedDate:String,
        //     Actions:String
        // },
        UnderWritingNotes:{
            type:String
        }
    }
})

const applications=mongoose.model('applications',applicationSchema);
export default applications;