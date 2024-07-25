const userModel = require('../models/userModel');
const postModel = require('../models/postModel');

async function searchByPost(req, res) {
    try{
        const { query } = req.query;
        const errorMsg = "Post with the title or author was not found.";
    
        const regex = new RegExp(query, 'i');
        const result = await postModel.find({ 
            $or: [
                { title: { $regex: regex }},
                { author: { $regex: regex }}
            ]
        });

        if (result.length > 0){
            res.render('posts.ejs', {posts: result, message: null});
        } else {
            res.render('posts.ejs', {posts: [], message: errorMsg});
        }
    
    } catch (err) {
        res.send(`Error while searching: ${err}`);
    }
}

async function sortByOldFirst(){
    try{
        const result = await postModel.find({}).sort({ date: 1});

        res.render('posts.ejs', { posts: result});

    } catch (err) {
        res.send(`Error while sorting: ${err}`);
    }
}

async function sortByNewFirst(){
    try {
        const result = await postModel.find({}).sort({ date: -1});

        res.render('posts.ejs', { posts: result});
    } catch (err) {
        res.send(`Error while sorting: ${err}`);
    }
}

exports.module= {
    searchByPost,
    sortByNewFirst,
    sortByOldFirst
}