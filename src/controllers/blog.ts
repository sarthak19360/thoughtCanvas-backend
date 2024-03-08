import impBlogs, { Blog } from "../utils/blogs";

// making a copy of blogs array
let blogs: Blog[] = impBlogs;

// get all users
const getAllBlogs = (req: any, res: any) => {
  res.status(200).json({
    blogs,
  });
};

// get a single user
const getSingleBlog = (req: any, res: any) => {
  const id: number = Number(req.params.id);
  const blog: Blog | undefined = blogs.find((b) => b.blog_id === id);
  if (blog) {
    return res.status(200).json({
      blog: blog,
    });
  } else {
    return res.status(401).json({
      msg: "Not Found",
    });
  }
};

// post a blog
const postBlog = (req: any, res: any) => {
  const id: number = req.body.id;
  const content: string = req.body.content;
  const singleBlog: Blog = {
    blog_id: id,
    blog_content: content,
  };
  blogs.push(singleBlog);
  res.status(200).json(singleBlog);
};

// update a blog
const updateBlog = (req: any, res: any) => {
  const id: number = Number(req.params.id);
  const content: string = req.body.content;
  const blog: Blog | undefined = blogs.find((b) => b.blog_id === id);
  if (blog) {
    blog.blog_content = content;
    return res.status(200).json({
      blog: blog,
    });
  } else {
    return res.status(401).json({
      msg: "Not Found",
    });
  }
};

// delete a blog
const deleteBlog = (req: any, res: any) => {
  const id: number = Number(req.params.id);
  const blog: Blog | undefined = blogs.find((b) => b.blog_id === id);
  if (blog) {
    const newArr: Blog[] = blogs.filter((b) => b.blog_id !== id);
    blogs = newArr;
    return res.status(201).json({
      msg: `Deleted blog with id ${id} successfully`,
    });
  } else {
    return res.status(401).send("Invalid Id");
  }
};

export { getAllBlogs, getSingleBlog, postBlog, updateBlog, deleteBlog };
