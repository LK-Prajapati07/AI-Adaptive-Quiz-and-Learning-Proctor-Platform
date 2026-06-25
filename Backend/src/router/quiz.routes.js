import express from 'express'
import { createQuiz, getQuiz, getQuizById } from "../controller/quiz.controller.js"
import { verifyAuth } from "../middleware/auth.middleware.js"
import { authorizeRole } from '../middleware/role.user.middleware.js'
import { upload } from '../middleware/upload.middleware.js'
const quizRouter=express.Router()
quizRouter.post("/",verifyAuth,authorizeRole("Trainer","Admin","Recruiter"),upload.single("file"),createQuiz)
quizRouter.get("/",verifyAuth,authorizeRole("Trainer","Student","Admin"),getQuiz)
quizRouter.get("/:id",verifyAuth,getQuizById)
export default quizRouter