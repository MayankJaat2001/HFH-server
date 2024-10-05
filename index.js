import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/route.js';
import Connection from './database/db.js';
import cors from 'cors'



const app = express();
dotenv.config()
// const corsOptions = {
//     origin: 'https://demohfhsite.netlify.app/', // allow only your Netlify domain
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // specify the HTTP methods allowed
//     credentials: true, // enable Access-Control-Allow-Credentials
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//   };
  
//   app.use(cors(corsOptions));
  app.use(cors())
app.use(express.json());
app.use('/',routes)


Connection(process.env.MONGO_URI)


const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>console.log(`Server is running Successfully on Port ${PORT}`))