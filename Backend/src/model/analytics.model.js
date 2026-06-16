import mongoose from "mongoose";


const quizPerformanceSchema = new mongoose.Schema(
{
    totalAttempts:{
        type:Number,
        default:0
    },

    completedAttempts:{
        type:Number,
        default:0
    },

    averageScore:{
        type:Number,
        default:0
    },

    highestScore:{
        type:Number,
        default:0
    },

    lowestScore:{
        type:Number,
        default:0
    },

    passRate:{
        type:Number,
        default:0
    }
},
{
    _id:false
}
);



const studentPerformanceSchema = new mongoose.Schema(
{
    totalQuizzesTaken:{
        type:Number,
        default:0
    },

    totalScore:{
        type:Number,
        default:0
    },

    averagePercentage:{
        type:Number,
        default:0
    },

    strongTopics:{
        type:[String],
        default:[]
    },

    weakTopics:{
        type:[String],
        default:[]
    }
},
{
    _id:false
}
);



const questionPerformanceSchema = new mongoose.Schema(
{
    totalQuestions:{
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

    accuracy:{
        type:Number,
        default:0
    }
},
{
    _id:false
}
);



const codingPerformanceSchema = new mongoose.Schema(
{
    problemsSolved:{
        type:Number,
        default:0
    },

    totalSubmissions:{
        type:Number,
        default:0
    },

    acceptedSubmissions:{
        type:Number,
        default:0
    },

    averageExecutionTime:{
        type:Number,
        default:0
    },

    averageMemoryUsed:{
        type:Number,
        default:0
    }
},
{
    _id:false
}
);



const proctorPerformanceSchema = new mongoose.Schema(
{
    totalWarnings:{
        type:Number,
        default:0
    },

    cheatingAttempts:{
        type:Number,
        default:0
    },

    averageRiskScore:{
        type:Number,
        default:0
    }
},
{
    _id:false
}
);




const analyticsSchema = new mongoose.Schema(
{

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth"
    },


    trainerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth"
    },


    quizId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Quiz"
    },


    competitionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"LiveCompetition"
    },


    quizPerformance:quizPerformanceSchema,


    studentPerformance:studentPerformanceSchema,


    questionPerformance:questionPerformanceSchema,


    codingPerformance:codingPerformanceSchema,


    proctorPerformance:proctorPerformanceSchema,


    totalTimeSpent:{
        type:Number,
        default:0
    },


    lastActivity:{
        type:Date,
        default:Date.now
    }

},
{
    timestamps:true
}
);



export const Analytics = mongoose.model(
    "Analytics",
    analyticsSchema
);