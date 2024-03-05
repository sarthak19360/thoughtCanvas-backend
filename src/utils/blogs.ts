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

export { Blog };
export default blogs;
