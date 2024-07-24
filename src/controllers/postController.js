const mongoose = require("mongoose");
const { APP_NAME } = require("../constants");
const { postModel } = require("../models");
const { formatDate } = require("../utils");

const isUserLoggedIn = (req) => !!req?.session?.userId;

// Create
const addPost = (req, res) => {
  res.render("post", {
    title: "TechForum - Add Post",
    post: undefined,
  });
};

// Read
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
      userCanEdit: isUserLoggedIn(req),
    });
  } catch (error) {
    res.render("posts", {
      title,
      posts: [],
    });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params || {};
  const editMode = req.query.edit === "true"; // Check if edit mode is enabled
  const title = `${APP_NAME} - View Post`;
  const posts = await postModel.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
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
  const { date, ...postRest } = posts[0];

  res.render("post", {
    title,
    editMode,
    post: {
      ...postRest,
      date: formatDate(new Date(date)),
    },
  });
};

// Update

// Delete

module.exports = {
  addPost,
  getPostById,
  getAllPosts,
};
