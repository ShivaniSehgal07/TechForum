const { Buffer } = require('buffer');
const mongoose = require('mongoose');


// Define a schema
const userSchema = new mongoose.Schema({
    f_name: { type: String, required: true },
    l_name: { type: String, required: true },
    user_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    usr_img: { type: Buffer, required: false },
    country: { type: String, required: true },

});

// Create a model from the schema
const userModel = mongoose.model('User', userSchema);

// Export the model
module.exports = userModel;

