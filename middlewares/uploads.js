import multer from 'multer';
import {GridFsStorage }from "multer-gridfs-storage";
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const storage=new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (request,file)=>{
        const match=["image/png",
                    "image/jpg",
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
                    const myfileId = uuidv4(); 
            if(match.indexOf(file.mimetype)===-1){
            return {filename:`${Date.now()}-file-${file.originalname}`,metadata:{doc_id:myfileId}};
        }
        return{
            bucketName:"fs",
            filename:`${Date.now()}-file-${file.originalname}`,
            metadata:{doc_id:myfileId}
        }
    }
});

export default multer({storage});