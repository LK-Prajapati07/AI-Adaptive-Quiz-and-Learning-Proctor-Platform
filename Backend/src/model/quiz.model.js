import mongoose from "mongoose";


const testCaseSchema = new mongoose.Schema(
    {
        input:{
            type:String
        },

        output:{
            type:String
        }
    },
    {
        _id:false
    }
)


const questionSchema = new mongoose.Schema(
    {

        question:{
            type:String,
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


        language:{
            type:String,
            default:null
        },


        starterCode:{
            type:String,
            default:null
        },


        testCases:[
            testCaseSchema
        ],


        marks:{
            type:Number,
            default:1
        },


        difficulty:{
            type:String,
            enum:[
                "Easy",
                "Medium",
                "Hard"
            ],
            required:true
        },


        explanation:{
            type:String
        }

    }
)



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

        enum:[
            "Programming",
            "Aptitude",
            "General_Knowledge",
            "Science",
            "Mathematics",
            "English",
            "Interview_Preparation"
        ],

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


    passing_marks:{
        type:Number,
        required:true
    },


    question_type:{
        type:String,

        enum:[
            "MCQ",
            "TRUE_FALSE",
            "FILL_BLANK",
            "SUBJECTIVE",
            "CODE"
        ],

        required:true
    },


    questions:[
        questionSchema
    ],


    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
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


export const Quiz = mongoose.model(
    "Quiz",
    quizSchema
)