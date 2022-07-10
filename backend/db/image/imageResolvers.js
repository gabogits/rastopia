require("dotenv").config({ path: "variables.env" });

var cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports.imageResMutation = {
  uploadImage: async (_, { file, uploadOptions }) => {
    let result;
    try {
      result = await cloudinary.uploader.upload(file, uploadOptions);
    } catch (error) {
      return `La imagen no puede ser guardada: ${error.message}`;
    }

    return result;
  },
};
