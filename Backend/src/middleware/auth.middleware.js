import admin from '../config/firebase.admin.js'
import { Auth } from '../model/auth.model.js';
export const verifyAuth=async(req,res,next)=>{
    try {
        const sessionCookie=req.cookies?.session;
        if(!sessionCookie){
            return res.status(401).json({
                success:false,
                message:"Unauthorized access"
            })
        }
        const  decodedToken=await admin.auth().verifySessionCookie(sessionCookie,true)
        const user=await Auth.findOne({
            uid:decodedToken.uid
        })
         if (!user) {

            return res.status(404).json({
                success:false,
                message:"User not found"
            });

        }
        req.user=user
        next()
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:error.message
        })
    }
}