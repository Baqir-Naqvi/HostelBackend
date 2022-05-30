import express from 'express';
const router=express.Router();
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';
import {
    homepage,
    getroomslists,
    getrooombyid,   
    addroom,
    updateroom,
    deleteroom
} from '../Controller/roomController.js';
import { 
    getallusers,
    getuserbyid,
    updateuser,
    deleteuser,
    userLogin,
    adduser
} from './../Controller/userController.js';

router.get('/',homepage);
router.get('/roomslist',getroomslists);
router.get('/roomslist/:id',getrooombyid);
router.post('/roomslist',auth,admin,addroom);      //protected route
router.post('/addnewuser',auth,admin,adduser);
router.put('/roomslist/:id',updateroom);          //protect route after user booking 
router.delete('/roomslist/:id',auth,admin,deleteroom); //protected route
router.get('/users',auth,admin,getallusers);  //protected route
router.get('/users/:id',auth,admin,getuserbyid); //protected route
router.put('/users/:id',auth,admin,updateuser); //protected route
router.delete('/users/:id',auth,admin,deleteuser); //protected route
router.post('/login',userLogin); //protected route


export default router;