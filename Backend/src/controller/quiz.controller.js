import { Quiz } from "../model/quiz.model";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";
export const createQuiz = async (req, res) => {
    try {
        const {
            quizTitle,
            description,
            category,
            duration,
            difficulty_level,
            question_type,
            total_question,
            passing_marks,
        } = req.body;
        const uploadPdf = await uploadToCloudinary.uploader.upload(req.file.path, {
            resource_type: "raw",
            folder: "quiz_pdf",
        });
        const pdf_url = uploadPdf.secure_url;
        const aiResponse = await axios.post(
            "http://localhost:8000/quiz/generate",

            {
                url: pdf_url,

                category,

                difficulty_level,

                totalQuestion: total_question,

                question_type,
            },
        );
        const quiz = await Quiz.create({
            quizTitle,

            description,

            category,

            duration,

            difficulty_level,

            question_type,

            total_question,

            total_marks,

            passing_marks,

            pdf_url,
            questions: aiResponse.data.questions,
            createdBy: req.user._id,
        });
        return res.status(200).json({
            success: true,
            message: "Quiz created successfully",
            quiz,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};
export const getAllQuiz = async (req, res) => {


    try {

        const quizzes = await Quiz.find()
            .select("-questions");



        return res.status(200).json({

            success: true,

            quizzes

        });



    } catch (error) {


        return res.status(500).json({

            success: false,

            message: error.message

        });
    }

};




// GET QUIZ BY ID

export const getQuizById = async (req, res) => {


    try {


        const quiz = await Quiz.findById(
            req.params.id
        );


        if (!quiz) {

            return res.status(404).json({

                success: false,

                message: "Quiz not found"

            });

        }



        return res.status(200).json({

            success: true,

            quiz

        });



    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};





// GET QUESTIONS ONLY

export const getQuizQuestions = async (req, res) => {


    try {


        const quiz = await Quiz.findById(
            req.params.id
        );



        const questions = quiz.questions.map(q => ({

            _id: q._id,

            question: q.question,

            options: q.options,

            questionType: q.questionType,

            marks: q.marks

        }));




        return res.status(200).json({

            success: true,

            questions

        });



    } catch (error) {


        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};





// UPDATE QUIZ

export const updateQuiz = async (req, res) => {

    try {


        const quiz = await Quiz.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true
            }

        );



        return res.status(200).json({

            success: true,

            message: "Quiz updated",

            quiz

        });


    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });
    }

};




// DELETE QUIZ

export const deleteQuiz = async (req, res) => {


    try {


        await Quiz.findByIdAndDelete(
            req.params.id
        );



        return res.status(200).json({

            success: true,

            message: "Quiz deleted"

        });



    } catch (error) {


        return res.status(500).json({
            success: false,
            message: error.message

        });

    }

};