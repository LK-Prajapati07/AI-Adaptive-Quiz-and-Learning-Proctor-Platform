import mongoose from "mongoose";


const questionSchema = new mongoose.Schema(
{
    question:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true
    },

    questionType:{
        type:String,
        enum:[
            "MCQ",
            "TRUE_FALSE",
            "FILL_BLANK",
            "SUBJECTIVE"
        ],
        required:true
    },

    options:{
        type:[String],
        default:[]
    },

    correctAnswer:{
        type:String,
        default:null
    },

    expectedAnswer:{
        type:String,
        default:null
    },

    difficulty:{
        type:String,
        enum:[
            "Easy",
            "Medium",
            "Hard"
        ]
    },

    explanation:{
        type:String
    },

    marks:{
        type:Number,
        default:1
    }

},
{
    _id:true
}
);



const quizSchema = new mongoose.Schema(
{

    quizTitle:{
        type:String,
        required:true
    },


    description:{
        type:String,
        required:true
    }, 


    category:{
        type:String,
        required:true
    },


    duration:{
        type:Number,
        required:true
    },


    difficulty_level:{
        type:String,
        enum:[
            "Easy",
            "Medium",
            "Hard",
            "Mixed"
        ],
        required:true
    },


    question_type:{
        type:String,
        enum:[
            "MCQ",
            "TRUE_FALSE",
            "FILL_BLANK",
            "SUBJECTIVE"
        ],
        required:true
    },


    total_question:{
        type:Number,
        required:true
    },


    total_marks:{
        type:Number,
        required:true
    },


    passing_marks:{
        type:Number,
        required:true
    },


    pdf_url:{
        type:String
    },


    questions:[
        questionSchema
    ],


    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},
{
    timestamps:true
}
);


export const Quiz = mongoose.model(
    "Quiz",
    quizSchema
);