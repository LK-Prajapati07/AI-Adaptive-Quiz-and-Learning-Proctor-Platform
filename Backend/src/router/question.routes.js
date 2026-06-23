import express from 'express'
import { geAllQuestions, generateQuestion, getQuestionsByQuizId } from "../controller/question.controller.js"
import { verifyAuth } from '../middleware/auth.middleware.js'
import { authorizeRole } from '../middleware/role.user.middleware.js'
import { upload } from '../middleware/upload.middleware.js'
const questionRouter=express.Router()
questionRouter.post("/:quizId",verifyAuth,authorizeRole("Trainer"),generateQuestion)
questionRouter.get("/:quizId",verifyAuth,authorizeRole("Trainer"),getQuestionsByQuizId)
questionRouter.get("/",geAllQuestions)
export default questionRouter