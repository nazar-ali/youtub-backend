import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from './app.js';

dotenv.config({
    path: './.env'
});

if (!process.env.PORT || !process.env.MONGODB_URL) {
    console.error("❌ Missing required environment variables (PORT, MONGODB_URI)");
    process.exit(1); 
}

connectDB()
    .then(() => {
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`⚙️ Server is running at port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB connection failed:", err);
        process.exit(1);
    });
