const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

mongoose.connect("mongodb://localhost:27017/blog", {useNewUrlParser: true});

mongoose.connection.on("connected", err => {
    if (err) throw err;
    console.log("Connected to Database");
    
});
// SCHEMA
const PostSchema = mongoose.Schema({
    title: String,
    content: String,
    author: String,
    timestamp: String
});

const PostModel = mongoose.model("post", PostSchema);




// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



// API Routes

// add a post
app.post("/api/post/new", (req, res) => {
    let payload = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        timestamp: new Date().getTime()
    }

    let newPost = new PostModel(payload);

    newPost.save((err, result) => {
        if (err) res.send({success: false, msg: err});

        res.send({success: true, result: result});
    });
    
});



// get posts
app.get("/api/posts/all", (req, res) => {
    PostModel.find((err, result) => {
        if (err) res.send({success: false, msg: err});

        res.send({success: true, result: result});
    });
});

app.post("/api/post/update", (req, res) => {
    let id = req.body._id;
    let payload = req.body;
    PostModel.findByIdAndUpdate(id, payload, (err, result) => {
        if (err) res.send({success: false, msg: err});

        res.send({success: true, result: result});
    });
});


app.post("/api/post/remove", (req, res) => {
    let id = req.body._id;
    PostModel.findById(id).remove((err, result) => {
        if (err) res.send({success: false, msg: err});

        res.send({success: true, result: result});
    });
});









// Start our server
app.listen(process.env.PORT || 3000, err => {
    if(err) console.error(err);
    console.log("Server has started on port %s", process.env.PORT || 3000);
    
});