import mysql from "mysql2/promise"
import dotenv from "dotenv"
dotenv.config()

const pool = mysql.createPool({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 10
})

export default pool

// Test Connection
export const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Database Connected Successfully");
        connection.release();
    } catch (error) {
        console.error("❌ Database Connection Failed:", error.message);
    }
};