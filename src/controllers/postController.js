const mongoose = require("mongoose");
const { APP_NAME, POST_CATEGORIES } = require("../constants");
const { postModel } = require("../models");
const { formatDate } = require("../utils");

const isUserLoggedIn = (req) => !!req?.session?.userId;
const userLoggedInId = (req) => req?.session?.userId;

// Create
const addPostIndex = (req, res) => {
  res.render("add-post", {
    title: `${APP_NAME} - Add Post`,
    categories: POST_CATEGORIES,
  });
};

const addPost = async (req, res) => {
  const { title, body, category } = req.body || {};

  try {
    const post = new postModel({
      title,
      body,
      category,
      author: userLoggedInId(req),
    });

    await post.save();
    req.flash("alert", "Post successfully added.");
    res.redirect("/my-posts");
  } catch (error) {
    req.flash("alert", "Post can't be added. Please try later.");
    res.redirect("/add-post");
  }
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
          category: 1,
          author: 1,
          createdAt: 1,
          updatedAt: 1,
          author_name: {
            $concat: ["$authorData.first_name", " ", "$authorData.last_name"],
          },
          author_avatar: "$authorData.avatar",
        },
      },
    ]);
    const formattedPosts = posts.map((post) => ({
      ...post,
      date: formatDate(new Date(post.createdAt)),
      userCanEdit: isUserLoggedIn(req) && post.author == userLoggedInId(req),
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

const getAllUserPosts = async (req, res) => {
  const title = `${APP_NAME} - My posts`;

  try {
    const posts = await postModel.aggregate([
      { $match: { author: userLoggedInId(req) } },
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
          category: 1,
          author: 1,
          createdAt: 1,
          updatedAt: 1,
          author_name: {
            $concat: ["$authorData.first_name", " ", "$authorData.last_name"],
          },
          author_avatar: "$authorData.avatar",
        },
      },
    ]);
    const formattedPosts = posts.map((post) => ({
      ...post,
      date: formatDate(new Date(post.createdAt)),
    }));
    res.render("my-posts", {
      title,
      posts: formattedPosts,
      userCanEdit: true,
    });
  } catch (error) {
    res.render("my-posts", {
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
        category: 1,
        author: 1,
        createdAt: 1,
        updatedAt: 1,
        author_name: {
          $concat: ["$authorData.first_name", " ", "$authorData.last_name"],
        },
        author_avatar: "$authorData.avatar",
      },
    },
  ]);
  const { createdAt, ...postRest } = posts[0];

  res.render("post", {
    title,
    editMode,
    post: {
      ...postRest,
      date: formatDate(new Date(createdAt)),
    },
  });
};

// Update
const editPostIndex = async (req, res) => {
  const { id } = req.params || {};

  try {
    const post = await postModel.findById(id);

    if (!post) {
      req.flash("alert", "Post can't be edited or doesn't exists.");
      res.redirect("/posts");
    }
    res.render("edit-post", {
      title: `${APP_NAME} - Add Post`,
      post,
      categories: POST_CATEGORIES,
    });
  } catch (error) {
    req.flash("alert", "Post can't be edited. Please try later.");
    res.redirect("/edit-post");
  }
};

const editPostById = async (req, res) => {
  const { title, body, category, author, id } = req.body || {};

  try {
    const post = await postModel.findByIdAndUpdate(
      id,
      { title, body,category, author },
      { new: true, runValidators: true }
    );

    if (!post) {
      req.flash("alert", "Post can't be edited or doesn't exists.");
      return res.redirect("/posts");
    }
    req.flash("alert", "Post successfully edited.");
    return res.redirect("/my-posts");
  } catch (error) {
    req.flash("alert", "Post can't be edited. Please try later.");
    return res.redirect("/edit-post");
  }
};

// Delete
const deletePostById = async (req, res) => {
  const { id } = req.params || {};

  try {
    const post = await postModel.findByIdAndDelete(id);

    if (!post) {}
  } catch (error) {}
};

module.exports = {
  addPostIndex,
  addPost,
  getAllPosts,
  getAllUserPosts,
  getPostById,
  editPostIndex,
  editPostById,
};
