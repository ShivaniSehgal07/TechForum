const mongoose = require("mongoose");
const { APP_NAME, POST_CATEGORIES } = require("../constants");
const { postModel } = require("../models");
const { formatDate, getSortCriteria } = require("../utils");
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
  const { sort } = req.query || {};
  const title = `${APP_NAME}`;
  const sortCriteria = getSortCriteria(sort);
  const message = req.flash('alert');

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
      ...(sort ? [{ $sort: sortCriteria }] : []),
    ]);
    const formattedPosts = posts.map((post) => ({
      ...post,
      date: formatDate(new Date(post.createdAt)),
      author_avatar: post.author_avatar
        ? `data:image/jpeg;base64,${post.author_avatar.toString("base64")}`
        : null,
      userCanEdit: isUserLoggedIn(req) && post.author == userLoggedInId(req),
    }));
    res.render("posts", {
      title,
      posts: formattedPosts,
      message: message.length > 0 ? message[0] : null
    });
  } catch (error) {
    res.render("posts", {
      title,
      posts: [],
      message: 'An error occurred while fetching posts.'
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
      author_avatar: post.author_avatar
        ? `data:image/jpeg;base64,${post.author_avatar.toString("base64")}`
        : null,
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
  const { createdAt, author_avatar, ...postRest } = posts[0];

  res.render("post", {
    title,
    editMode,
    post: {
      ...postRest,
      author_avatar: author_avatar
        ? `data:image/jpeg;base64,${author_avatar.toString("base64")}`
        : null,
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
      { title, body, category, author },
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

    if (!post) {
      res.status(404).send({
        alertType: "danger",
        message: "Post can't be deleted or doesn't exists.",
      });
      return res.redirect("/posts");
    }
    res.send({
      alertType: "success",
      message: "Post was successfully deleted.",
    });
  } catch (error) {
    res.status(500).send({
      alertType: "danger",
      message: "Post can't be deleted, please try later.",
    });
  }
};

// Search Posts
const searchByPost = async (req, res) => {
  try{
      const { query } = req.query;
      const errorMsg = "Post with the title or author was not found.";
  
      const regex = new RegExp(query, 'i');
      const result = await postModel.aggregate([
        {
          $match: {
            $or: [
              { title: { $regex: regex }},
              { author: { $regex: regex }}
            ]
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'author',
            foreignField: 'user_name',
            as: 'authorData'
          }
        },
        {
          $unwind: {
            path: '$authorData',
            preserveNullAndEmptyArrays: true // In case some posts don't have corresponding author data
          }
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
              $concat: ['$authorData.first_name', ' ', '$authorData.last_name']
            },
            author_avatar: '$authorData.avatar'
          }
        }
      ]);

      const formattedPosts = result.map((post) => ({
        ...post,
        author_avatar: post.author_avatar
          ? `data:image/jpeg;base64,${post.author_avatar.toString("base64")}`
          : null,
        date: formatDate(new Date(post.createdAt)),
      }));

      if (result.length > 0){
          res.render('posts', {title: 'Search result', posts: formattedPosts, message: null, query});
      } else {
          res.render('posts', {title: 'Search result', posts: [], message: errorMsg, query});
      }
  
  } catch (err) {
      res.send(`Error while searching: ${err}`);
  }
}

module.exports = {
  addPostIndex,
  addPost,
  getAllPosts,
  getAllUserPosts,
  getPostById,
  editPostIndex,
  editPostById,
  deletePostById,
  searchByPost
};
