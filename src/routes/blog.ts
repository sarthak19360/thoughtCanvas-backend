import { Router } from "express";
import userMiddleWare from "../middlewares/userMiddleWare";
const router = Router();

const {
  getAllBlogs,
  getSingleBlog,
  postBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog");

router
  .get("/blogs", getAllBlogs)
  .get("/blog/:id", getSingleBlog)
  .post("/blog-post", userMiddleWare, postBlog)
  .put("/blog/:id", userMiddleWare, updateBlog)
  .delete("/blog/:id", userMiddleWare, deleteBlog);

export default router;
