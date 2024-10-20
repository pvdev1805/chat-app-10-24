// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoutes from "./routes/user.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config({});

const app = express();

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at port ${PORT}`);
});
