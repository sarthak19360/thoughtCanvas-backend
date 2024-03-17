import { ObjectId } from "mongodb";

const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  blog_content: { type: String, req: true },
  blog_author_id: { type: ObjectId, ref: "User", req: true },
  createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
