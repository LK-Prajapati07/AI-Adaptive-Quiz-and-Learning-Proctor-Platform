import mongoose from "mongoose";


const authSchema=mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['Admin','Student','Trainer','Recruiter'],
        required:true,
        default:'Student'
    },
    profilePhoto:{
        type:String,
        default:" "
    },
    uid:{
        type:String,
        required:true
    },
    provider:{
        type:String,
        enum:['password','google'],
        default:'password'
    }
},
{
   timestamps: true
}
)
export const Auth=mongoose.model('Auth',authSchema)