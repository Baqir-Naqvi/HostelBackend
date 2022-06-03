import express from 'express'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import multer from 'multer'
import 'dotenv/config'
import path, { dirname } from 'path'
const router = express.Router()
import {
    homepage,
    getroomslists,
    getrooombyid,
    addroom,
    updateroom,
    deleteroom,
} from '../Controller/roomController.js'
import {
    getallusers,
    getuserbyid,
    updateuser,
    deleteuser,
    userLogin,
    adduser,
} from './../Controller/userController.js'
router.use(express.static('public'))


const Storage = multer.diskStorage({
  destination: './public/roomimages/',
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname + '-' + Date.now() + path.extname(file.originalname),
    )
  },
})


var upload = multer({ storage: Storage }).single('file')

router.get('/', homepage)
router.get('/roomslist', getroomslists)
router.get('/roomslist/:id', getrooombyid)
router.post('/roomslist', auth, admin, upload, addroom) //protected route
router.post('/addnewuser', auth, admin, adduser)
router.put('/roomslist', upload, updateroom) //protect route after user booking
router.delete('/roomslist', auth, admin, deleteroom) //protected route
router.get('/users', auth, admin, getallusers) //protected route
router.get('/users/:id', auth, admin, getuserbyid) //protected route
router.put('/users/:id', auth, admin, updateuser) //protected route
router.delete('/users/:id', auth, admin, deleteuser) //protected route
router.post('/login', userLogin) //protected route

export default router
