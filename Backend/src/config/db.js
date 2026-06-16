import mongoose from 'mongoose'
export const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.db)
        console.log("Connection of the Database")
    } catch (error) {
        console.error(error)
        console.log("Failed to connect the Database")
    }
}