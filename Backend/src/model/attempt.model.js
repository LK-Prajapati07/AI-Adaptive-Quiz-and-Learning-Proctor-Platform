import mongoose from "mongoose";
const answerSchema=new mongoose.Schema({
    question_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    student_answer:{
        type:String,
        default:null
    },
    student_code:{
        type:String,
        default:null
    },
    isAnswered:{
        type:Boolean,
        required:true
    },


},
{
    _id:false
}
)
const attemptQuestionSchema=new mongoose.Schema(
    {
        question_id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
        },
        question:{
            type:String,
            required:true
        },
        options:{
            type:[String],
            default:[]
        },
        marks:{
            type:Number
        }
    },
    {
        _id:false
    }
)

const attempSchema=new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Auth",
            required:true
        },
        quizId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Quiz',
            required:true
        },
        assignedQuestion:[
            attemptQuestionSchema
        ],
        answer:[
            answerSchema
        ],
        startedAt:{
            type:Date
        },
        status:{
            type:String,
            enum:["IN_Progress","Submited"],
            default:"IN_Progress"
        },
        timeTaken:{
            type:Number
        }
    },
    {
        timestamps:true
    }
)
export const Attempt=mongoose.model("Attempt",attempSchema)