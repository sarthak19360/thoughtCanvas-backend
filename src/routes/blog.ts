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
  .get("/blog/:blogId", getSingleBlog)
  .post("/blog-post", userMiddleWare, postBlog)
  .put("/blog/:blogId", userMiddleWare, updateBlog)
  .delete("/blog/:blogId", userMiddleWare, deleteBlog);

export default router;
