import mongoose from "mongoose";



const answerSchema = new mongoose.Schema(
{

    questionId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },


    student_answer:{
        type:String,
        default:null
    },


    isAnswered:{
        type:Boolean,
        default:false
    }

},
{
    _id:false
}
);




const attemptSchema = new mongoose.Schema(
{

    userId:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

        required:true

    },



    quizId:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"Quiz",

        required:true

    },



    answers:[

        answerSchema

    ],



    startedAt:{

        type:Date,

        default:Date.now

    },



    submittedAt:{

        type:Date

    },



    status:{

        type:String,

        enum:[

            "IN_PROGRESS",

            "SUBMITTED"

        ],

        default:"IN_PROGRESS"

    },



    timeTaken:{

        type:Number

    }

},

{

    timestamps:true

}

);



export const Attempt = mongoose.model(

    "Attempt",

    attemptSchema

);