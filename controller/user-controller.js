import User from '../models/user-schema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import { isosignup } from '../models/iso-signup.js'

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

    return res.status(201).json({email,role,uid});

}catch(err){
    return res.status(500).json({err:'server error'});
}
}

export const ISOSignup = async(req,resp)=>{
    try{
        const {
            email,
            password,
            cell,
            pointOfContact,
            religion,
            ethnicity,
            // stackingHistory,
            // chargesPSF
        }=req.body

        let iso = await isosignup.findOne({email});
    if(iso){
        return resp.status(400).json({Message:'ISO already exist'});
    }

        const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const isouid = generateUID();
        const newISO = new isosignup({
            role:"iso",
            isouid,
            email,
            password:hashedPassword,
            cell,
            pointOfContact,
            religion,
            ethnicity,
            // stackingHistory,
            // chargesPSF
        });
        await newISO.save()
        return resp.status(201).json({Message: "ISO added Sucessfully",newISO})
    }catch(err){
        return resp.status(500).json({Message:"ISO not created",Error:err.message})
    }
}

export const userLogin = async(req,res)=>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(user){
            const isMatch= await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(400).json({message:'Invalid credentials'})
            }
            return res.json({email,role:user.role,uid:user.uid});
        }
        let iso = await isosignup.findOne({ email });
        if (iso) {
            const isMatch = await bcrypt.compare(password, iso.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
            return res.json({ email, role: 'ISO', uid: iso.isouid });
        }

        return res.status(400).json({ message: 'Invalid credentials' });


        // const token=jwt.sign({id: user._id,role:user.role},JWT_SECRET);
    }catch(err){
        return res.status(500).json({err:'server error'})
    }
}