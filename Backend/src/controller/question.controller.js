import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";
import { Question } from "../model/question.model.js";
import { Quiz } from "../model/quiz.model.js";
import axios from "axios";
export const generateQuestion = async (req, res) => {

    try {
        const { quizId } = req.params;
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
           return res.status(404).json({
               message: "Quiz not found",
                success: false
            });
        }
                quiz.generationStatus ="PROCESSING";
        await quiz.save();
        const aiResponse =await axios.post("http://127.0.0.1:8000/quiz/generate",
            {
                url: quiz.pdfUrl,
                category:quiz.category,
                difficulty_level:quiz.difficulty,
                totalQuestion:quiz.totalQuestions,
                question_type:quiz.questionType
            }
        ); 
        const generatedQuestions =aiResponse.data.questions;
        const questionDocs =generatedQuestions.map((q)=>({
                quizId:quiz._id,
                question:q.question,
                questionType:q.questionType,
                options:q.options || [],
                correctAnswer:q.correctAnswer || null,
                expectedAnswer:q.expectedAnswer || null,
                difficulty:q.difficulty,
                marks:q.marks || 1,
                explanation: q.explanation || ""

            })
        );
        await Question.insertMany(questionDocs);
        quiz.generationStatus =
        "COMPLETED";
        await quiz.save();
        return res.status(201).json({
            message:
            "Questions generated successfully",
            success:true,
            totalQuestions:
            questionDocs.length

        });
    } catch (error) {
        console.log(
            error.response?.data ||
            error.message
        );
        return res.status(500).json({
            message:
            "Internal Server Error",
            success:false

        });

    }

};
export const getQuestionsByQuizId = async (req, res) => {
    try{
        const { quizId } = req.params;
        const questions = await Question.find({ quizId });
        if(!questions || questions.length === 0){
            return res.status(404).json({
                message: "No questions found for this quiz",
                success: false
            });
        }
        return res.status(200).json({
            message: "Questions fetched successfully",
            success: true,
            data: questions
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}
export const geAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        return res.status(200).json({
            message: "Questions fetched successfully",
            success: true,
            data: questions
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }   
}
