import express from  'express'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './src/config/db.js'
import authRouter from './src/router/auth.routes.js'
const app=express()
dotenv.config()
app.use(
    cors({
    origin:process.env.Frontend_URL,
    credentials:true
    })


)
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRouter)
app.get('/',(req,res)=>{
    return res.json({message:"Server is Started"})
})
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
    connectDB()
})