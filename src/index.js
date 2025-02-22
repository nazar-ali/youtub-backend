// Import necessary modules
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

// Load environment variables
dotenv.config({
    path: "./env"
});

// Connect to MongoDB
connectDB()
    .then(() => {
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
        
    })
    .catch((error) => {
        console.log(`MONGO DB connection failed !!!`, error);
    });
