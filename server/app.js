import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import roomRoutes from "./routes/room.routes.js";
import bookingRoutes from "./routes/booking.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

testConnection();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
