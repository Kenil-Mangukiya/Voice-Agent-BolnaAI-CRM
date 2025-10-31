import app from "./app";
import dotenv from "dotenv";
import config from "./public/src/config/config";
import prisma from "./public/src/db/prisma";

dotenv.config({ path: "./.env" });

// Health check function
const checkServerHealth = async () => {
    try {
        // Check environment variables
        if (!config.port) {
            throw new Error("PORT environment variable is not set");
        }

        // Check database connection
        await prisma.$queryRaw`SELECT 1`;
        console.log("✅ Server health check passed");
        console.log("🗄️  Database: Connected");
        
        return true;
    } catch (error) {
        console.error("❌ Server health check failed:", error.message);
        throw error;
    }
};

// Start server after health check
const startServer = async () => {
    try {
        await checkServerHealth();
        
        app.listen(process.env.PORT, () => {
            console.log(`🚀 Server is running on port ${config.port}`);
            console.log(`🌐 http://localhost:${config.port}`);
        });
    } catch (error) {
        console.error("💥 Failed to start server:", error);
        process.exit(1);
    }
};

startServer();