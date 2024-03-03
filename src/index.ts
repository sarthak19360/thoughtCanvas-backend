// Import the express in typescript file
import express from "express";

// Initialize the express engine
const app: express.Application = express();

app.use(express.json());

// Take a port 3000 for running server.
const port: number = 3000;

type Blog = {
  blog_id: number;
  blog_content: string;
};

let blogs: Blog[] = [
  {
    blog_id: 1,
    blog_content: "This is first blog",
  },
  {
    blog_id: 2,
    blog_content: "This is second blog",
  },
  {
    blog_id: 3,
    blog_content: "This is third blog",
  },
];

// Handling '/' Request
app.get("/", (req, res) => {
  res.send("TypeScript With Express");
});

// get all blogs
app.get("/blogs", (req, res) => {
  res.status(200).json({
    blogs,
  });
});

// get a single blog
app.get("/blog/:id", (req, res) => {
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
});

// post a blog
app.post("/blog-post", (req, res) => {
  const id: number = req.body.id;
  const content: string = req.body.content;
  const singleBlog: Blog = {
    blog_id: id,
    blog_content: content,
  };
  blogs.push(singleBlog);
  res.status(200).json(singleBlog);
});

// update a blog
app.put("/blog/:id", (req, res) => {
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
});

// delete a blog
app.delete("/blog/:id", (req, res) => {
  const id: number = Number(req.params.id);
  const blog: Blog | undefined = blogs.find((b) => b.blog_id === id);
  if (blog) {
    const newArr: Blog[] = blogs.filter((b) => b.blog_id !== id);
    blogs = newArr;
    return res.status(201).json({
      msg: `Delete blog with id ${id} successfully`,
    });
  } else {
    return res.status(401).send("Invalid Id");
  }
});

// Server setup
app.listen(port, () => {
  console.log(`TypeScript with Express 
		http://localhost:${port}/`);
});
