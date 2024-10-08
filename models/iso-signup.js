import mongoose from 'mongoose'

const isoSignup = new mongoose.Schema({
    role:String,
    isouid:{type:String ,required : true},
    email: { type: String, required: true },
    password:{type:String,required:true},
    cell: { type: String, required: true },
    pointOfContact: {type: String , required: true},
    religion: { type: String },
    ethnicity: { type: String },
  //   stackingHistory: { 
  //   type: String, 
  //   enum: ['Aggressive Stacker', 'Somewhat Stacker'], 
  // },
  // chargesPSF: { 
  //   type: String, 
  //   enum: ['Aggressive on the Fees', 'Mellow on the Fees'],
  // }
});

export const isosignup = mongoose.model('ISOSignup', isoSignup);