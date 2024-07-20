const mongoose = require('mongoose');


// Define a schema
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: Date, required: true },
    user_name: { type: String, required: true }

});

// Create a model from the schema
const postModel = mongoose.model('Post', postSchema);

// Export the model
module.exports = postModel;