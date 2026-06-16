
import mongoose from "mongoose";

const exampleSchema=new mongoose.Schema({
    input:{
        type:String
    },
    output:{
        type:String
    },
    explanation:{
        type:String
    }
},
{
    _id:false
}
)
const testCaseSchema=new mongoose.Schema({
    input:{
        type:String,
        required:true
    },
    expectedOutput:{
        type:String,
        required:true
    },
    isHidden:{
        type:Boolean,
        default:true
    }
},
{
    _id:false
}
)
const starterCoderSchema=new mongoose.Schema({
    language:{
        type:String,
        required:true
    },
    code:{
        type:String
    },

},
{
    _id:false
}
)

const problemSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        enum:['Easy','Medium','Hard'],
        default:'Easy',
        required:true
    },
    category:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        default:[]
    },
    constraints:{
        type:String,

    },
    inputFormat:{
        type:String,

    },
    outputFormat:{
        type:String
    },
    example:[exampleSchema],
    testcase:[testCaseSchema],
    startedCode:[starterCoderSchema],
    timeLimit:{
        type:Number,
        default:2
    },
    memortLimit:{
        type:Number,
        default:256
    },
    points:{
        type:Number,
        default:100
    },
    totalSubmission:{
        type:Number,
        default:0
    },
    acceptedSubmission:{
        type:String,
        default:0
    },
    acceptedRate:{
        type:Number,
        default:0
    },
       createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth",
        required:true
    },


    isPublished:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
}
)
export const Problem = mongoose.model(
    "Problem",
    problemSchema
);