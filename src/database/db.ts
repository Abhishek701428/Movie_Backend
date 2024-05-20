import mongoose from "mongoose";

const connectToMongo = () => {
    mongoose.connect('mongodb+srv://vermakhushbu723306:12345@cluster0.4nkq2um.mongodb.net/Assigment')
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.error("Error connecting to MongoDB:", err);
        });
}

export default connectToMongo;
