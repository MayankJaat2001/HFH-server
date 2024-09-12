import mongoose from "mongoose";

const isoSchema = new mongoose.Schema({
    AgentUID:{
        type:String,
    },
    ISOUID:{
        type:String,
        unique:true,
    },
    Details:
        {

            ISOname:{
                type:String,
            },
            Region:{
                type:String,
            },
            WorkPhone:{
                type:String,
            },
            CellPhone:{
                type:String,
            },
            ISOManager:{
                type:String,
            },
        },
    OwnerContract:{

        OwnerFirstName:{
            type:String,
        },
        OwnerLastName:{
            type:String,
        },
        OwnerEmail:{
            type:String,
        },
        OwnerWorkPhone:{
            type:String,
        },
        OwnerCellPhone:{
            type:String,
        },
    },
    RepaymentPlan:{

        RepaymentFirstName:{
            type:String,
        },
        RepaymentLastName:{
            type:String,
        },
        RepaymentEmail:{
            type:String,
        },
        RepaymentWorkPhone:{
            type:String,
        },
        RepaymentCellPhone:{
            type:String,
        },
        RepaymentAddress:{
            type:String,
        },
    },
    document:[
        {
            filename:String,
            path:String,
            uploadedAt:{type:Date,default:Date.now},
        }
    ]
});
const ISOs = mongoose.model('ISOs',isoSchema)
export default ISOs