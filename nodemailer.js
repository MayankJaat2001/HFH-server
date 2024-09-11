import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
    service:'gmail',
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // Use true for port 465, false for all other ports
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
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
  export const sendEmail = async (email, htmlContent) => {
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: 'HFH - Application Contract',
        html: htmlContent
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email: ', error);
        throw error;
    }
  }