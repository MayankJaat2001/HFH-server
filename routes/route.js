import express from 'express';
import {addUser ,userLogin} from '../controller/user-controller.js'
import { addISOs, getISOs } from '../controller/iso-controller.js';
import { deleteDocument, getDocuments, uploadFile } from '../controller/doc-controller.js';
import upload from '../middlewares/uploads.js';
import applicationuploads from '../middlewares/applicationuploads.js';
import { addApplications, getApplication, updateApplication } from '../controller/applicaions-controller.js';
import { deleteapplicationDocument, getApplicationDocuments, uploadApplicationFile } from '../controller/applicationdoc-controller.js';
import { addOwnership, deleteOwnership, updateOwnership } from '../controller/ownership-controller.js';
import { addNotes, deleteNotes, updateNotes } from '../controller/notes-controller.js';
import { addWebLink, deleteWebLink,  updateWebLinks } from '../controller/weblink-controller.js';


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
router.post('/add-ownership',addOwnership);
router.put('/update-ownership/:id',updateOwnership);
router.delete('/ownership/delete/:id',deleteOwnership);
router.post('/add-note',addNotes);
router.put('/update-note/:id',updateNotes);
router.delete('/note/delete/:id',deleteNotes);
router.post('/add-weblink',addWebLink);
router.put('/update-weblink/:id',updateWebLinks);
router.delete('/weblink/delete/:id',deleteWebLink);
router.get('/get-isos',getISOs);
router.get('/get-applications',getApplication);

export default router;