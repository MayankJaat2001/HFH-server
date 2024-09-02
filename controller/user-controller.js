import User from '../models/user-schema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const generateUID = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};


const JWT_SECRET = process.env.JWT_SECRET;
export const addUser = async(req,res)=>{
    console.log(req.headers['content-type']);
    const {email , password , role }=req.body;
    
    try{

    let user = await User.findOne({email});
    if(user){
        return res.status(400).json({message:'user already exist'});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const uid = generateUID();
    user = new User({
        email,
        password:hashedPassword,
        role,
        uid
    });

    await user.save();

    // const token = jwt.sign({id:user._id,role:user.role},JWT_SECRET);

    res.status(201).json({email,role,uid});

}catch(err){
    res.status(500).json({err:'server error'});
}
}

export const userLogin = async(req,res)=>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'Invalid credentials'})
        }
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid credentials'})
        }

        // const token=jwt.sign({id: user._id,role:user.role},JWT_SECRET);
        res.json({email,role:user.role,uid:user.uid});
    }catch(err){
        res.status(500).json({err:'server error'})
    }
}