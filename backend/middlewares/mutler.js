import multer from "multer";

// Configure multer to use memory storage
const storage = multer.memoryStorage();

// Set up multer to handle single file uploads with the field name "file"
export const singleUpload = multer({ storage }).single("file");
