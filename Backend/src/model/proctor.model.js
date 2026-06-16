import mongoose  from "mongoose";
const eventSchema=new mongoose.Schema({
    type:{
        type:String,
        enum:[ "NO_FACE",
                "MULTIPLE_FACE",
                "PHONE_DETECTED",
                "DIFFERENT_PERSON",
                "DEEPFAKE",
                "NOT_LIVE"]
    },
    risk:{
        type:Number,
        default:0
    },
    message:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},

{
    _id:false
}
)
const proctorSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth",
        required:true
    },
    quizId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Quiz",
        required:true
    },
    attemptId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Attempt",
        required:true
    },
    events:{
        eventSchema
    },
    totalRisk:{
        type:Number,
        default:0
    },
    status:{
        type:String,
        enum:["NORMAL",
                "WARNING",
                "CHEATING"],
                default:"NORMAL"
    }
},
{
    timestamps:true
}
)
export const Proctor=mongoose.model('Proctor',proctorSchema)