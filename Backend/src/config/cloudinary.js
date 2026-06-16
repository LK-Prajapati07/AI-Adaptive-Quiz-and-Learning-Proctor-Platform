import {v2 as cloudinary } from 'cloudinary'
cloudinary.config({
    cloud_name:process.env.clound_name,
    api_key:process.env.cloundinary_api_key,
    api_secret:process.env.cloundinary_api_secret
})
export default cloudinary