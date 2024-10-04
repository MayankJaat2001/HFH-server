import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    uid:{
        type:String,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,

    },
    role:{
        type:String,
        enum:['admin','iso']
    }
})

const User = mongoose.model('User',userSchema);
export default User;