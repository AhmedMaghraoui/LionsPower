import express from 'express'
import mongoose from 'mongoose'
import route from './routes/routes.js'
import passport from './auth/auth.js'
import cors from 'cors'
import path from 'path'
import  bodyParser from 'body-parser'

import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(passport.initialize())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api', route)



mongoose.connect(process.env.MONGODB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    

app.listen(PORT, ()=>{
    console.log(`connected on ${PORT}`)
})