import { Attempt } from "../model/attempt.model.js";
import { Quiz } from "../model/quiz.model.js";
import { Result } from "../model/result.model.js";
import axios from "axios";



// START ATTEMPT

export const startAttempt = async(req,res)=>{

    try{

        const {quizId}=req.params;


        const quiz = await Quiz.findById(
            quizId
        );


        if(!quiz){

            return res.status(404).json({

                success:false,

                message:"Quiz not found"

            });

        }



        const attempt = await Attempt.create({

            userId:req.user._id,

            quizId,

            startedAt:new Date()

        });




        const questions = quiz.questions.map((q)=>({

            questionId:q._id,

            question:q.question,

            options:q.options,

            questionType:q.questionType,

            marks:q.marks

        }));




        return res.status(201).json({

            success:true,

            message:"Attempt started",

            attemptId:attempt._id,

            questions

        });



    }
    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};






// SUBMIT ATTEMPT + EVALUATION

export const submitAttempt = async(req,res)=>{

    try{


        const {attemptId}=req.params;


        const {answers}=req.body;



        const attempt = await Attempt.findById(
            attemptId
        );



        if(!attempt){

            return res.status(404).json({

                success:false,

                message:"Attempt not found"

            });

        }




        const quiz = await Quiz.findById(
            attempt.quizId
        );




        // save student answers

        attempt.answers = answers;





        // make FastAPI data

        const evaluationQuestions = answers.map((ans)=>{


            const question = quiz.questions.id(
                ans.questionId
            );



            return {

                question:
                question.question,


                student_answer:
                ans.student_answer,


                options:
                question.options,


                correct_answer:
                question.correctAnswer,


                expected_answer:
                question.expectedAnswer,


                marks:
                question.marks

            };


        });






        // send to FastAPI

        const evaluation = await axios.post(

            "http://localhost:8000/evaluate",

            {

                question_type:
                quiz.question_type,


                questions:
                evaluationQuestions

            }

        );






        // save result

        const result = await Result.create({

            userId:
            attempt.userId,


            quizId:
            attempt.quizId,


            attemptId:
            attempt._id,


            totalMarks:
            evaluation.data.total_marks,


            obtainedMarks:
            evaluation.data.obtained_marks,


            percentage:
            evaluation.data.percentage,


            details:
            evaluation.data.results

        });







        attempt.status="SUBMITTED";


        attempt.submittedAt=new Date();



        attempt.timeTaken=Math.floor(

            (
                attempt.submittedAt
                -
                attempt.startedAt

            ) / 1000

        );



        await attempt.save();






        return res.status(200).json({

            success:true,

            message:"Quiz submitted successfully",

            result

        });





    }
    catch(error){


        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};