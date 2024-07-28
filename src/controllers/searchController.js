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

        console.log(result);

        if (result.length > 0){
            res.render('posts', {title: 'result', posts: result, message: null});
        } else {
            res.render('posts', {title: 'result', posts: [], message: errorMsg});
        }
    
    } catch (err) {
        res.send(`Error while searching: ${err}`);
    }
}


module.exports= {
    searchByPost
}