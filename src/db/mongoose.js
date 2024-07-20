const mongoose = require('mongoose');
const dotenv = require('dotenv');


// Load environment variables
dotenv.config();


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => { console.log('Connected to MongoDB') })
    .catch((err) => console.log('Failed to connect to MongoDB', err));

// Export mongoose
module.exports = mongoose;