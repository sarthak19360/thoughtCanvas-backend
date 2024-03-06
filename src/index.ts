import express from "express";
import blogRouter from "./routes/blog";
import userRouter from "./routes/user";

// Initialize the express engine
const app: express.Application = express();

// middleware
app.use(express.json());

// routes
app.use("/", blogRouter);
app.use("/", userRouter);

// Take a port 3000 for running server.
const port: number = 3000;

// Server setup
app.listen(port, () => {
  console.log(`TypeScript with Express 
		http://localhost:${port}/`);
});
