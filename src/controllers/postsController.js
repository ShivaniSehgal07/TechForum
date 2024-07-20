const getAllPosts = (req, res) => {
  res.render("posts", {
    title: "TechForum",
    example: "This is an example",
    posts: [
      {
        id: 1,
        title: "Understanding JavaScript Closures",
        author_name: "Jane Doe",
        author_profile_pic: "/assets/images/emerging-tech-vector.jpg",
        body:
          "A closure is the combination of a function and the lexical environment within which that function was declared.",
        date: "2024-07-15",
      },
      {
        id: 2,
        title: "Getting Started with React Hooks",
        author_name: "John Smith",
        author_profile_pic: "/assets/images/emerging-tech-vector.jpg",
        body:
          "React Hooks are functions that let you use state and other React features without writing a class.",
        date: "2024-07-10",
      },
      {
        id: 3,
        title: "A Guide to Node.js Performance Optimization",
        author_name: "Alice Johnson",
        author_profile_pic: "/assets/images/emerging-tech-vector.jpg",
        body:
          "Node.js performance optimization involves profiling your application, identifying bottlenecks, and implementing best practices to improve performance.",
        date: "2024-07-08",
      },
      {
        id: 4,
        title: "Mastering CSS Grid Layout",
        author_name: "Bob Lee",
        author_profile_pic: "/assets/images/emerging-tech-vector.jpg",
        body:
          "CSS Grid Layout is a two-dimensional layout system for the web. It lets you layout items in rows and columns.",
        date: "2024-07-05",
      },
      {
        id: 5,
        title: "Introduction to TypeScript",
        author_name: "Charlie Brown",
        author_profile_pic: "/assets/images/emerging-tech-vector.jpg",
        body:
          "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
        date: "2024-07-01",
      },
    ],
  });
};

module.exports = {
  getAllPosts,
};
