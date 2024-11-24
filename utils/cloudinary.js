const cloudinary = require("cloudinary").v2; // Use Cloudinary v2 API

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

// Function to Upload an Image to Cloudinary
const cloudinaryUploadImg = async (fileToUpload) => {
  try {
    const result = await cloudinary.uploader.upload(fileToUpload, {
      resource_type: "auto", // Automatically detect the resource type (e.g., image, video)
    });
    return {
      url: result.secure_url, // Return the secure URL of the uploaded file
    };
  } catch (error) {
    throw new Error(`Cloudinary Upload Failed: ${error.message}`);
  }
};

module.exports = cloudinaryUploadImg;
