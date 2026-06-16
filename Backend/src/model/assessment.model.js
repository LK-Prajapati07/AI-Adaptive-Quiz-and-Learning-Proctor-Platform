import mongoose from "mongoose";


const settingSchema = new mongoose.Schema(
{
    assessmentType:{
        type:String,

        enum:[
            "QUIZ",
            "CODING",
            "MIXED"
        ],

        required:true
    },


    duration:{
        type:Number
    },


    passingScore:{
        type:Number
    },


    maxAttempts:{
        type:Number,
        default:1
    },


    proctorEnabled:{
        type:Boolean,
        default:false
    }
},
{
    _id:false
}
);



const assessmentSchema = new mongoose.Schema(
{

    title:{
        type:String,
        required:true
    },


    description:{
        type:String
    },


    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth",
        required:true
    },


    candidates:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Auth"
        }
    ],


    quizzes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Quiz"
        }
    ],


    problems:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Problem"
        }
    ],


    setting:settingSchema,


    startDate:{
        type:Date
    },


    endDate:{
        type:Date
    },


    totalCandidates:{
        type:Number,
        default:0
    },


    completedCandidates:{
        type:Number,
        default:0
    },


    results:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Result"
        }
    ],


    status:{
        type:String,

        enum:[
            "DRAFT",
            "ACTIVE",
            "COMPLETED",
            "CANCELLED"
        ],

        default:"DRAFT"
    }

},

{
    timestamps:true
}

);



export const Assessment = mongoose.model(
    "Assessment",
    assessmentSchema
);