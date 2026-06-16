import mongoose from "mongoose";


const rankingSchema = new mongoose.Schema(
    {
        currentRank:{
            type:Number
        },

        previousRank:{
            type:Number
        }
    },
    {
        _id:false
    }
);



const liveParticipantSchema = new mongoose.Schema(
{

    competitionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"LiveCompetition",
        required:true
    },


    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth",
        required:true
    },


    status:{
        type:String,

        enum:[
            "JOINED",
            "PLAYING",
            "SUBMITTED",
            "LEFT"
        ],

        default:"JOINED"
    },


    currentScore:{
        type:Number,
        default:0
    },


    correctAnswers:{
        type:Number,
        default:0
    },


    wrongAnswers:{
        type:Number,
        default:0
    },


    totalSolved:{
        type:Number,
        default:0
    },


    rank:rankingSchema,


    timeTaken:{
        type:Number,
        default:0
    },


    averageResponseTime:{
        type:Number,
        default:0
    },


    submissions:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Submission"
        }
    ],


    joinedAt:{
        type:Date,
        default:Date.now
    },


    finishedAt:{
        type:Date
    }

},

{
    timestamps:true
}

);


export const LiveParticipant = mongoose.model(
    "LiveParticipant",
    liveParticipantSchema
);