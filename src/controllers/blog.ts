import { ObjectId } from "mongodb";

const Blog = require("../models/blog");

// get all users
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

// get a single user
const getSingleBlog = async (req: any, res: any) => {
  try {
    const id: ObjectId = req.params.id;
    const blog = await Blog.findById(id);
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
    const content: string = req.body.content;
    const singleBlog = new Blog({
      blog_content: content,
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
    const id: ObjectId = req.params.id;
    const content: string = req.body.content;
    const blog = await Blog.findById(id);
    if (blog) {
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
    const id: ObjectId = req.params.id;
    const blog = await Blog.findById(id);
    if (blog) {
      await Blog.findByIdAndDelete(id);
      return res.status(201).json({
        msg: `Deleted blog with id ${id} successfully`,
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
