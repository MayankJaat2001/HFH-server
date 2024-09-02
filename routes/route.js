import express from 'express';
import {addUser ,userLogin} from '../controller/user-controller.js'
import { addISOs } from '../controller/iso-controller.js';
import { deleteDocument, getDocuments, uploadFile } from '../controller/doc-controller.js';
import upload from '../middlewares/uploads.js';
import applicationuploads from '../middlewares/applicationuploads.js';
import { addApplications, updateApplication } from '../controller/applicaions-controller.js';
import { deleteapplicationDocument, getApplicationDocuments, uploadApplicationFile } from '../controller/applicationdoc-controller.js';


const router=express.Router();

router.post('/adduser',addUser);
router.post('/login',userLogin);
router.post('/add-iso', upload.array('documents'),addISOs);
router.post('/file/upload',upload.single("file"),uploadFile);
router.get('/file/:id',getDocuments);
router.post('/add-application',addApplications);
router.post('/application/uploads',applicationuploads.single("file"),uploadApplicationFile);
router.get('/application/:id',getApplicationDocuments);
router.put('/update-application/:id',updateApplication);
router.delete('/file/delete/:id',deleteDocument);
router.delete('/application/delete/:id',deleteapplicationDocument);

export default router;