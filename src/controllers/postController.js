const { APP_NAME } = require("../constants");
const { postModel } = require("../models");
const { formatDate } = require("../utils");

const addPost = (req, res) => {
  res.render("post", {
    title: "TechForum - Add Post",
    post: undefined,
  });
};

const getPost = (req, res) => {
  const editMode = req.query.edit === "true"; // Check if edit mode is enabled

  res.render("post", {
    title: "TechForum - View Post",
    editMode,
    post: {
      id: req.params.id,
      title: "Understanding JavaScript Closures",
      author_name: "Jane Doe",
      author_profile_pic: "/assets/images/emerging-tech-vector.jpg",
      body: "A closure is the combination of a function and the lexical environment within which that function was declared.",
      date: "2024-07-15",
    },
  });
};

const getAllPosts = async (req, res) => {
  const title = `${APP_NAME}`;

  try {
    const posts = await postModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "user_name",
          as: "authorData",
        },
      },
      {
        $unwind: "$authorData",
      },
      {
        $project: {
          title: 1,
          body: 1,
          date: 1,
          category: 1,
          author: 1,
          author_name: {
            $concat: ["$authorData.first_name", " ", "$authorData.last_name"],
          },
          author_avatar: "$authorData.avatar",
        },
      },
    ]);
    const formattedPosts = posts.map((post) => ({
      ...post,
      date: formatDate(new Date(post.date)),
    }));
    res.render("posts", {
      title,
      posts: formattedPosts,
    });
  } catch (error) {
    res.render("posts", {
      title,
      posts: [],
    });
  }
};

module.exports = {
  addPost,
  getPost,
  getAllPosts,
};
