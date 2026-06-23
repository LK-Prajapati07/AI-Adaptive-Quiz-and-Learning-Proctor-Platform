import express from 'express'
import { createQuiz, getQuiz, getQuizById } from "../controller/quiz.controller.js"
import { verifyAuth } from "../middleware/auth.middleware.js"
import { authorizeRole } from '../middleware/role.user.middleware.js'
import { upload } from '../middleware/upload.middleware.js'
const quizRouter=express.Router()
quizRouter.post("/",verifyAuth,authorizeRole("Trainer"),upload.single("file"),createQuiz)
quizRouter.get("/",verifyAuth,getQuiz)
quizRouter.get("/:id",getQuizById)
export default quizRouter