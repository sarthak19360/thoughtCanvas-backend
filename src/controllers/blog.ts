import { ObjectId } from "mongodb";

const Blog = require("../models/blog");

// get all blogs
const getAllBlogs = async (req: any, res: any) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json({
      blogs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// get a single blog
const getSingleBlog = async (req: any, res: any) => {
  try {
    const blogId: ObjectId = req.params.blogId;
    const blog = await Blog.findById(blogId);
    if (blog) {
      return res.status(200).json({
        blog: blog,
      });
    } else {
      return res.status(401).json({
        msg: "Not Found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// post a blog
const postBlog = async (req: any, res: any) => {
  try {
    const authorName: String = req.userName;
    const content: string = req.body.content;
    const singleBlog = new Blog({
      blog_content: content,
      blog_author: authorName,
    });

    await singleBlog.save();
    res.status(200).json(singleBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// update a blog
const updateBlog = async (req: any, res: any) => {
  try {
    const blogId: ObjectId = req.params.blogId;
    const authorName: String = req.userName;
    const { content } = req.body;
    const blog = await Blog.findById(blogId);
    if (blog) {
      if (blog.blog_author !== authorName) {
        return res
          .status(403)
          .json({ error: "You are not authorized to update this blog" });
      }
      blog.blog_content = content;
      await blog.save();
      return res.status(200).json({
        blog: blog,
      });
    } else {
      return res.status(401).json({
        msg: "Not Found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// delete a blog
const deleteBlog = async (req: any, res: any) => {
  try {
    const blogId: ObjectId = req.params.blogId;
    const authorName: String = req.userName; // Get the user's ID from the JWT token
    const blog = await Blog.findById(blogId);
    if (blog) {
      if (blog.blog_author !== authorName) {
        return res
          .status(403)
          .json({ error: "You are not authorized to delete this blog" });
      }
      await Blog.findByIdAndDelete(blogId);
      return res.status(201).json({
        msg: `Deleted blog with id ${blogId} successfully`,
      });
    } else {
      return res.status(401).send("Invalid Id");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { getAllBlogs, getSingleBlog, postBlog, updateBlog, deleteBlog };
