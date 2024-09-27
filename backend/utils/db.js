import mongoose from "mongoose";

const connectDB = async () => {
    console.log('MONGO_URI:', process.env.MONGO_URI); // Add this line
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;