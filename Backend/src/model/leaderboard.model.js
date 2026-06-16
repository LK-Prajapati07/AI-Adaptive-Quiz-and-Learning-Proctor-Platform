import mongoose from "mongoose";

const rankingSchema =new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth",
        required:true
    },
    resultId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Result",
        required:true
    },
    attemptId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Attempt",
        required:true
    },
    obtainedMarks :{
        type:Number,
        required:true
    },
    totalMarks:{
        type:Number,
        required:true
    },
    percentage:{
        type:Number,
        required:true

    },
    rank:{
        type:Number
    },
    timeTaken:{
        type:Number 
    },
    submittedAt:{
        type:Date
    }
})

const leaderboardSchema=new mongoose.Schema({
    quizId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Quiz",
        required:true
    },
    createdBy :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth",
        required:true
    },
    ranking:[rankingSchema],
    totalParticipants:{
        type:Number,
        default:0
    },
    highestScore:{
        type:Number,
        default:0
    },
    averageScore:{
        type:Number,
        default:0
    },

},
{
    timestamps:true
}
)
export const LeaderBoard=mongoose.model('LeaderBoard',leaderboardSchema)