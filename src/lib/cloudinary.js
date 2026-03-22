import { v2 as cloudinary } from 'cloudinary';

// Cloudinary automatically picks up process.env.CLOUDINARY_URL
// If you want to be explicit:
if (process.env.CLOUDINARY_URL) {
  cloudinary.config(true); // Forces it to load from URL if not already done
}

export default cloudinary;
