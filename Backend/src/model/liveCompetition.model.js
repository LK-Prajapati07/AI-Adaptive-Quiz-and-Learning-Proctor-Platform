import mongoose from "mongoose";
const SettingSchema=new mongoose.Schema({
    competitionType:{
        type:String,
        enum:["Quiz","Coding"],
        default:"Quiz",
        required:true
    },
    maxParticipants:{
        type:Number
    },
    allowLateJoin:{
        type:Boolean
    },
    showLeaderboard:{
        type:Boolean
    },
},

{
    _id:false
}
)
const TimeSchema=new mongoose.Schema({
    startTime:{
        type:Date
    },
    endTime:{
        type:Date
    },
    duration:{
        type:Number
    }
},
{
    _id:false
}
)

const LiveCompetitionSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth",
        required:true
    },
    quizId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Quiz",
    },
   problems:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Problem"
    }
],
    roomCode:{
        type:String,
        required:true
    },
   participants:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth"
    }
],
    setting: SettingSchema,
    timing: TimeSchema,
    status:{
        type:String,
        enum:["Waiting","Live","Completed","Cancelled"]
    },
    totalParticipants:{
        type:Number
    },
    highestScore:{
        type:Number
    },
    averageScore:{
        type:Number
    },
    winnerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth"
    }
},
{timestamps:true}
);

export const LiveCompetition = mongoose.model("LiveCompetition", LiveCompetitionSchema);
