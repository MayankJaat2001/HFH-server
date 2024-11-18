import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    userUID:String,
    ApplicationId:String,
    Status:String,
    AddedAt:{type:Date,default:Date.now},
    // Overview: {
        BusinessInformation: {
            LegalName:String,
            DBAName:String,
            EmailAddress:String,
            BusinessPhoneNumber:String,
            PreferredContactPhoneNumber:String,
            EntityType:String,
            FederalTaxID:String,
            BusinessStartDateUnderCurrentOwnership:String,
            StateofIncorporation:String,
            IndustryType:String,
            BusinessStructure:String,
            City:String,
            State:String,
            ZIP:String,
            SourcesofRevenue:String,
            BusinessLocation:String,
            GrossAnnualSales:String,
            AverageMonthlyCCVolume:String,
            AnyOpenMCA:String
        },
        BusinessPhysicalAddress:{
            Address:String,
            City:String,
            State:String,
            ZIP:String
        },
        BusinessMailingAddress:{
            Address:String,
            City:String,
            State:String,
            ZIP:String
        },
        FundingDetails: {
            LenderName: String,
            Installment: String,
            TypeOfLoan: String,
            Frequency:{
                type:String,
                enum:['Daily','Weekly','By-Weekly','Monthly']
            }
        },
        ISODetails: {
            ISOName: String,
            ISOSalesRep:String,
            SalesRep:String,
            ISOManager: String,
        },
    // },
    // ClientDetails: {
        OwnerInformation: [{
            FirstName:String,
            LastName:String,
            CompanyEmail:String,
            BusinessPhoneNumber:String,
            CellNumber:String,
            PrimaryWebsite:String,
            SSN:String,
            DateOFBirth:String,
            Religion:String,
            Ethnicity:String,
            HomeStreetAddress:String,
            City:String,
            State:String,
            ZIP:String,
            Facebook:String,
            Instagram:String,
            X:String
        }],
        IndustryDetails:{
            SICDescription:String,
            SICCode:String,
            NAICSDescription:String,
            NAICSCode:String,
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
        // CardInfo:{
        //     DebitCredit:String,
        //     CardType:String,
        //     CardIssuer:String,
        //     NameOnCard:String,
        //     CardNumber:String,
        //     ExpiryDate:String,
        //     CVV:String
        // },
        // BillingInfo:{
        //     BillingAddress:String,
        //     BillingAddress2:String,
        //     BillingCity:String,
        //     BillingState:String,
        //     BillingZIPCode:String
        // },
        // BankDetails:{
        //     RoutingNumber:String,
        //     AccountNumber:String,
        //     BankName:String,
        //     AccountType:String,
        //     HolderName:String,
        //     AccountHolderAddress:String,
        //     AccountHolderCity:String,
        //     AccountHolderState:String,
        //     AccountHolderZIPCode:String
        // },
    // },
    Documents:[{
        filename:String,
            path:String,
            docid:String,
            uploadedAt:{type:Date,default:Date.now},
}],
    Notes:{
        NoteType:String,
        NoteTemplate:String,
        NoteContent:String,
    },
    UnderWritingBusinessInformation:{
            GrossMonthlySales:String,
            LengthOfOwnership:String,
            TimeinBusiness:String,
        },
        UnderWritingIndustryDetails:{
            NAICSDescription:String,
            NAICSCode:String,
        },
        UnderWritingBusinessDetails:{
            DateBusinessStarted:String,
            LengthOfOwnership:String,
            IncorporationDate:String,
            GrossMonthlySales:String,
            IncorporationState:String,
            TypeOfBusinessEntity:String,
            EINNumber:String,
            Addresses:String
        },
        ownership:[{
            Name:String,
            Percentage:String,
            FICO:String,
            DOB:String
        }],
        WebLink:[{
            Description:String,
            Links:String
        }],        
        BusinessNotes:[{
            TypeOfNotes:String,
            Note:String,
            uploadedAt:{type:Date,default:Date.now},
        }],
        OperationsNotes:{
            UnderWritingBankName:String,
            UnderWritingRoutingNumber:String,
            UnderWritingAccountNumber:String,
            UnderWritingAccountType:String,
            SourcesofRevenue:String,
            AverageBalance:String
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
        UnderWritingNotes:String,
    Decision:{
        Status:String,
        Frequency: String,
        FundingAmount: String,
        PaybackAmount: String,
        HashOfPayment: String,
        Payment: String,
        Tenure: String,
        FactorRate: String,
        PendingMessage:String,
        DeclineMessage:String,
        DeclineMessageOther:String
    },
    // BankInformation:{
        BankDetails:[{
            AccountNumber:String,
            BankName:String,
            CurrentAccountBalance:String,
            BusinessModel:String,
            PurposeofFunds:String,
            PurposeofPreviousFunds:String
       }]
    // }
})

const applications=mongoose.model('applications',applicationSchema);
export default applications;