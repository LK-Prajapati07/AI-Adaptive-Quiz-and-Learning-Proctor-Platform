import express from 'express'
import { createUser, getCurrentUser, logout } from '../controller/auth.controller.js'
import { verifyAuth } from '../middleware/auth.middleware.js'
const authRouter=express.Router()
authRouter.post("/create-user",createUser)
authRouter.post("/logout",logout)
authRouter.get("/me",verifyAuth,getCurrentUser)
export default authRouter