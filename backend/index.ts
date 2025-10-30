import app from "./app";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

// Health check function
const checkServerHealth = async () => {
    try {
        // Check environment variables
        if (!process.env.PORT) {
            throw new Error("PORT environment variable is not set");
        }

        // Check if database connection is ready (when Prisma is set up)
        // const { PrismaClient } = await import("@prisma/client");
        // const prisma = new PrismaClient();
        // await prisma.$connect();
        
        console.log("✅ Server health check passed");
        console.log(`📡 Port: ${process.env.PORT}`);
        // console.log("🗄️  Database: Connected");
        
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
            console.log(`🚀 Server is running on port ${process.env.PORT}`);
            console.log(`🌐 http://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        console.error("💥 Failed to start server:", error);
        process.exit(1);
    }
};

startServer();