const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: Date, required: true },
    user_name: { type: String, required: true }
});

const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;
