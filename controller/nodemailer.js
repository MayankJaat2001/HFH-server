import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import crypto from 'crypto'

dotenv.config()

const otpStorage = {};

const transporter = nodemailer.createTransport({
    service:'gmail',
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // Use true for port 465, false for all other ports
    auth: {
      user: process.env.SMTP_MAIL,
      // pass: process.env.SMTP_PASSWORD,
      pass: 'pdxn bnxe opbn lljb',
    },
  });

  // var mailOptions = {
  //   from : process.env.SMTP_MAIL,
  //   to: email,
  //   subject: 'HFH - Application Contract',
  //   // message: 'test1',
  //   html: htmlContent.replace('[Password Creation Link]', 'https://biz-fund-8l6i-git-createpasswordflow-manish88879s-projects.vercel.app/createPassword?user_id=' + invitedUser._id)
  // };
  // transporter.sendMail(mailOptions , function(error  , info){
  //   if(error)
  //   console.log(error )
  //   else
  //   console.log('Email sent Sucessfully')
  // })
  export const sendEmail = async (req,res) => {
    const body =req.body
    console.log(body)
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: body.mail,
        subject: 'HFH - Application Contract',
        html: body.content
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + res);
        res.status(200).json({Message:"Email sent"})
    } catch (error) {
        console.error('Error sending email: ', error);
        throw error;
    }
  }

  const generateOTP = ()=>{
    return crypto.randomInt(100000,999999);
  }

  export const sendingOTP = async(req,resp)=>{
    const {email}=req.body;
    const otp = generateOTP();

    otpStorage[email]=otp;

    const mailOptions={
      from:process.env.SMTP_MAIL,
      to:email,
      subject:"Verify your Email!",
      text: `Your OTP is ${otp}`
    }

    try{
      await transporter.sendMail(mailOptions);
      resp.status(200).json({Message:"OTP sent to email"})
    }catch(err){
      resp.status(500).json({Message:"Error sending OTP",err})
    }
  }

  export const verifyOTP =async(req,resp)=>{
    const {email,otp} =req.body;

    if(otpStorage[email] && otpStorage[email]===parseInt(otp)){
      delete otpStorage[email]
      resp.status(200).json({Message:"OTP verified Sucessfully"})
    }else{
      resp.status(400).json({Message:"Invalid OTP"})
    }
  }