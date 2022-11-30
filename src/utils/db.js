import mongoose from "mongoose";

const db = () => {
  mongoose.connect("mongodb://localhost:27017/authapp", (error, result) => {
    if (error) {
      console.log("Error while connecting db is ", error.message);
    } else {
      console.log("Database connected successfully!");
    }
  });
};

export default db;
