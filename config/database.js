//local database connection
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connection Successful!");
    } catch (error) {
        console.log(error);
        throw new Error("An error occurred while connecting the MongoDB!");
    }
};

module.exports = {
    connectDB,
};
