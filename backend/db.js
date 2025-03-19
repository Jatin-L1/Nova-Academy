const mongoose = require("mongoose");
const Class = require("./models/classSchema.js");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected!");

    await Class.collection.dropIndexes();
    console.log("Old indexes dropped 🔄");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
