import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";

export const uploadToCloudinary = (file, folder = "uploads") => {
  return new Promise((resolve, reject) => {
    const isPdf = file.mimetype === "application/pdf";

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,

        resource_type: isPdf ? "raw" : "image",
      },

      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      },
    );

    const stream = Readable.from(file.buffer);

    stream.pipe(uploadStream);
  });
};
