import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/test", (req, res) => {
  res.json({ message: "Backend is live 🚀" });
});

const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log("Server running on port " + PORT);
    });
  } catch (error) {
    console.error("Failed to connect DB", error);
    process.exit(1);
  }
};

startServer();
