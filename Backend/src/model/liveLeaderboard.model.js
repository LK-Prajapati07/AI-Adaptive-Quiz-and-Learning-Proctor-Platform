import mongoose from "mongoose";

const rankingSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth",
        required:true
    },
    participantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"LiveParticipant",
        required:true
    },
    score:{
        type:Number
    },
    previousRank:{
        type:Number
    },
    currentRank:{
        type:Number
    },
    correctAnswers:{
        type:Number
    },
    wrongAnswers:{
        type:Number
    },
    problemsSolved:{
        type:Number
    },
    executionTime:{
        type:Number
    },
    memoryUsed:{
        type:Number
    },
    timeTaken:{
        type:Number
    },
    finishedAt :{
        type:Date
    }

},
{
    _id:false
}
)

const liveLeaderBoardSchema=new mongoose.Schema({
    competitionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"LiveCompetition",
        required:true
    },
    ranking:[rankingSchema],
    totalParticipants:{
        type:Number
    },
    highestScore:{
        type:Number
    },
    averageScore:{
        type:Number
    },
    lastUpdate:{
        type:Date
    }

},

{
    timestamps:true
}
)
export const LiveLeaderBoard=mongoose.model("LiveLeaderBoard",liveLeaderBoardSchema)