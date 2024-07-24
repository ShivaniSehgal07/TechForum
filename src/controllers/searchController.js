const userModel = require('../models/userModel');
const postModel = require('../models/postModel');

async function searchByPost(req, res) {
    try{
        const { title } = req.query;
        const errorMsg = "Post with the given title was not found.";
    
        const result = await postModel.find({ 'title' : title });

        if (!result) res.send('There was an error in searching');

        if (result.find((value) => value === value.title)){
            res.render('posts.ejs', {posts: result, message: null});
        } else {
            res.render('posts.ejs', {posts: [], message: errorMsg});
        }
    
    } catch (err) {
        res.send(`Error while searching: ${err}`);
    }
}

async function sortByAuthor(){
    
}


async function filterByDate(){
    
}

exports.module= {
    searchByPost,
    sortByAuthor,
    filterByDate
}