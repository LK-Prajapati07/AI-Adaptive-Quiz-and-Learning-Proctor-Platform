import express from 'express'

import { 
    getAttemptResult, 
    getUserAttempts, 
    startQuizAttempt, 
    submitAnswer 
} from '../controller/quizAttempt.controller.js'
import { upload } from '../middleware/upload.middleware.js'
import { verifyAuth } from "../middleware/auth.middleware.js"
import { authorizeRole } from '../middleware/role.user.middleware.js'


const attemptRouter = express.Router()


// start quiz
attemptRouter.post(
    "/start/:quizId",
    verifyAuth,
    upload.single("studentImage"),
    authorizeRole("Student"),
    startQuizAttempt
)


// submit answer
attemptRouter.post(
    "/submit/:attemptId",
    verifyAuth,
    authorizeRole("Student"),
    submitAnswer
)


// result
attemptRouter.get(
    "/result/:attemptId",
    verifyAuth,
    authorizeRole("Student"),
    getAttemptResult
)


// all attempts of logged in user
attemptRouter.get(
    "/",
    verifyAuth,
    getUserAttempts
)


export default attemptRouter