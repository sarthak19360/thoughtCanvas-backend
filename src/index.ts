import express from "express";
import blogRouter from "./routes/blog";
import userRouter from "./routes/user";

const mongoose = require("mongoose");
const dotenv = require("dotenv");

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
