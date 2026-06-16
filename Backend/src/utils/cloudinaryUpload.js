import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";


export const uploadToCloudinary = (buffer, folder = "uploads") => {

    return new Promise((resolve, reject) => {


        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder
            },

            (error, result) => {

                if (error) {
                    return reject(error);
                }


                resolve(result);

            }
        );


        const stream = Readable.from(buffer);


        stream.pipe(uploadStream);

    });

};