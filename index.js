import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/route.js';
import Connection from './database/db.js';
import cors from 'cors'

const app = express();
dotenv.config()
app.use(express.json());
app.use(cors())
app.use('/',routes)


Connection(process.env.MONGO_URI)


const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>console.log(`Server is running Successfully on Port ${PORT}`))