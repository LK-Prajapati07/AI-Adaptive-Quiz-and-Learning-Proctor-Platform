import mongoose from "mongoose";


const submissionSchema = new mongoose.Schema(
{

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth",
        required:true
    },


    problemId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Problem",
        required:true
    },


    competitionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"LiveCompetition",
        default:null
    },


    quizId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Quiz",
        default:null
    },


    language:{
        type:String,
        required:true
    },


    code:{
        type:String,
        required:true
    },


    status:{
        type:String,

        enum:[
            "ACCEPTED",
            "WRONG_ANSWER",
            "RUNTIME_ERROR",
            "TIME_LIMIT_EXCEEDED",
            "COMPILATION_ERROR"
        ],

        required:true
    },


    totalTestCases:{
        type:Number,
        default:0
    },


    passedTestCases:{
        type:Number,
        default:0
    },


    executionTime:{
        type:Number,
        default:0
    },


    memoryUsed:{
        type:Number,
        default:0
    },


    score:{
        type:Number,
        default:0
    },


    errorMessage:{
        type:String,
        default:null
    },


    submittedAt:{
        type:Date,
        default:Date.now
    }

},

{
    timestamps:true
}

);


export const Submission = mongoose.model(
    "Submission",
    submissionSchema
);