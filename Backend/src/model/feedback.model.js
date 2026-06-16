import mongoose from "mongoose";


const feedbackSchema = new mongoose.Schema(
{

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth",
        required:true
    },


    quizId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Quiz"
    },


    competitionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"LiveCompetition"
    },


    trainerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth"
    },


    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },


    comment:{
        type:String
    },


    feedbackType:{
        type:String,

        enum:[
            "QUIZ",
            "COMPETITION",
            "PLATFORM",
            "TRAINER"
        ],

        required:true
    },


    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Auth"
        }
    ],


    isReported:{
        type:Boolean,
        default:false
    },


    status:{
        type:String,

        enum:[
            "VISIBLE",
            "HIDDEN"
        ],

        default:"VISIBLE"
    }

},

{
    timestamps:true
}

);


export const Feedback = mongoose.model(
    "Feedback",
    feedbackSchema
);