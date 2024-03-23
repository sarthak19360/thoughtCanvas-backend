import express from "express";
import blogRouter from "./routes/blog";
import userRouter from "./routes/user";

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Initialize the express engine
const app: express.Application = express();

dotenv.config();

mongoose
  .connect(process.env.mongoURI)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err: Error) => {
    console.log(err);
  });

// middleware
app.use(express.json());

// Use CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// routes
app.use("/", blogRouter);
app.use("/", userRouter);

// Take a port 3000 for running server.
const port = process.env.port || 3000;

// Server setup
app.listen(port, () => {
  console.log(`TypeScript with Express 
		http://localhost:${port}/`);
});
