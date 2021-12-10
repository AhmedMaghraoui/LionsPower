import express, { response } from 'express'
import passport from 'passport'
import { BesoinCalc } from '../controllers/BesoinCalc.js'
import { GetAllExercices, GetAllUsers,GetUser, Premium } from '../controllers/GetAllUsers.js'

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { AddExercice, GetExercices, isDone } from '../controllers/Exercices.js'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import upload from '../controllers/UploadImage.js'
import Smtp from '../controllers/Smtp.js'

dotenv.config()

const route = express.Router()

route.get('/', (req,res)=>{
    res.send('hello')
})



route.post('/signup',
 passport.authenticate('signup', {session: false}),
  async (req,res, next) => {
    res.json({
      message: 'Signup OK',
      user: req.user
  })
}
)

route.get('/users', GetAllUsers)
route.get('/users/:id', GetUser)
route.get('/exercices/:id', GetExercices)
route.patch('/addexercices/:id', AddExercice)
route.patch('/addexercices/:id/:exid', isDone)
route.get('/getallexercices', GetAllExercices)
route.patch('/premium/:id', Premium)
route.post('/smtp', Smtp)

var uploadSingle = upload.single('pic');

route.post('/upload', function(req, res) {
  uploadSingle(req, res, function(err) {

      // FILE SIZE ERROR
      /*if (err instanceof multer.MulterError) {
          return res.end("Max file size 2MB allowed!");
      }*/

      // INVALID FILE TYPE, message will return from fileFilter callback
      if (err) {
          return res.end(err.message);
      }

      // FILE NOT SELECTED
      else if (!req.file) {
          return res.end("File is required!");
      }

      // SUCCESS
      else {
          res.send(req.file.path)
          console.log(req.file.path);
          console.log("File response", req.file);
      }

    })
})

/////////////////

//route.post('/upload', upload.single('test'))
///////////

route.post('/login', (req,res,next)=>{
    passport.authenticate('login', async (err, user)=>{
      try{
        if (err || !user) {
          const error = new Error('erreur')
          return next(err)
        }
  
        req.login(user, {session: false}, async error=>{
          if (error) return next(error)
          const body = {_id: user._id, email : user.email}
          const token = jwt.sign({user: body}, process.env.SECRET)
          res.json({userId:user._id,userName:user.name,token,isPremium:user.isPremium,isCoach:user.isCoach})
          return next()
        })
      } catch(error) {
        return next(error)
      }
    })(req,res,next)
  }
)

route.get('/BesoinCalc', BesoinCalc)

export default route