const getPost = (req, res) => {
  const editMode = req.query.edit === 'true'; // Check if edit mode is enabled

  res.render("post", {
    title: "TechForum",
    editMode,
    post: {
      id: req.params.id,
      title: "Understanding JavaScript Closures",
      author_name: "Jane Doe",
      author_profile_pic: "/assets/images/emerging-tech-vector.jpg",
      body:
        "A closure is the combination of a function and the lexical environment within which that function was declared.",
      date: "2024-07-15",
    },
  });
};

module.exports = {
  getPost,
};