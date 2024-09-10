import grid from 'gridfs-stream';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()
const url=process.env.SERVER_URL ;
let gfs;
const conn = mongoose.connection;
conn.once('open',()=>{
    
    gfs=grid(conn.db,mongoose.mongo);
    gfs.collection('application');
})
let gridFSBucket;
conn.once('open', () => {
  gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'application', 
  });
});
export const uploadApplicationFile=async(request,response)=>{
    if(!request.file){
        return response.status(404).json('file not found');
    }
    const fileDetails = {
        filename: request.file.filename,
        Applicationdoc_id: request.file.metadata.doc_id,
        updatedTime: request.file.uploadDate
    };
    return response.status(200).json(fileDetails);
        // const fileUrl=`${url}/application/${request.file.filename}`;
        // return response.status(200).json(fileUrl);
}

export const getApplicationDocuments=async(request, response)=>{
    try{ 
        const file=await mongoose.connection.db.collection('application.files').findOne({metadata:{doc_id: request.params.id}});
        const fileId = new mongoose.Types.ObjectId(file._id);
        const readStream =  gridFSBucket.openDownloadStream(fileId);
        readStream.on('error', (err) => {
            return response.status(500).json({ message: 'Error while streaming the file', error: err.message });
          });
        readStream.pipe(response);
    }catch(error){
        return response.status(500).json(error.message);
    }
}

export const deleteapplicationDocument = async(request,response)=>{
    const {id} = request.params;
    try{
        const file= await mongoose.connection.db.collection('application.files').findOne({metadata:{doc_id:id}});
        if(!file){
            return response.status(404).json({message:'file not found'});
        }
        const fileId = new mongoose.Types.ObjectId(file._id);
        await gridFSBucket.delete(fileId);
        return response.status(200).json({message:'file deleted successfully!'});
    }catch(err){
        return response.status(500).json({message:err.message});
    }
}