const getAllPosts = (req, res) => {
  res.render("index", {
    title: "TechForum",
    example: "This is an example",
    posts: [
      {
        id: 1,
        title: "Understanding JavaScript Closures",
        author: "Jane Doe",
        content:
          "A closure is the combination of a function and the lexical environment within which that function was declared.",
        date: "2024-07-15",
        tags: ["JavaScript", "Closures", "Programming"],
      },
      {
        id: 2,
        title: "Getting Started with React Hooks",
        author: "John Smith",
        content:
          "React Hooks are functions that let you use state and other React features without writing a class.",
        date: "2024-07-10",
        tags: ["React", "Hooks", "JavaScript"],
      },
      {
        id: 3,
        title: "A Guide to Node.js Performance Optimization",
        author: "Alice Johnson",
        content:
          "Node.js performance optimization involves profiling your application, identifying bottlenecks, and implementing best practices to improve performance.",
        date: "2024-07-08",
        tags: ["Node.js", "Performance", "Optimization"],
      },
      {
        id: 4,
        title: "Mastering CSS Grid Layout",
        author: "Bob Lee",
        content:
          "CSS Grid Layout is a two-dimensional layout system for the web. It lets you layout items in rows and columns.",
        date: "2024-07-05",
        tags: ["CSS", "Grid", "Web Development"],
      },
      {
        id: 5,
        title: "Introduction to TypeScript",
        author: "Charlie Brown",
        content:
          "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
        date: "2024-07-01",
        tags: ["TypeScript", "JavaScript", "Programming"],
      },
    ],
  });
};

module.exports = {
  getAllPosts,
};
