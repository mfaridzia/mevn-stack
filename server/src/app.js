const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/posts');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
    console.log("Connection Succeeded");
});

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// include model post
var Post = require('../models/post')

// fetch all posts
app.get('/posts', (req, res) => {
    Post.find({}, 'title description', function(error, posts){
        if(error) { console.log(error); }
        res.send({
            posts: posts
        })
    }).sort({_id:-1})
})

// route add
app.post('/posts', (req, res) => {
    var db = req.db;
    var title = req.body.title;
    var description = req.body.description;
    var new_post = new Post({
        title: title,
        description: description
    })

    new_post.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true,
            message: 'Post saved successfully!'
        })
    })
})

// fetch single post
app.get('/post/:id', (req, res) => {
    var db = req.db;
    Post.findById(req.params.id, 'title description', function(error, post) {
        if(error) { console.log(error); }
        res.send(post)
    })
})

// route update
app.put('/posts/:id', (req, res) => {
    var db = req.db;
    Post.findById(req.params.id, 'title description', function(error, post) {
        if(error) { console.log(error); }
        
        post.title = req.body.title
        post.description = req.body.description
        post.save(function(error) {
            if(error) {
                console.log(error)
            }
            res.send({
                success: true
            })
        })
    })
})

// Route delete post
app.delete('/posts/:id', (req, res) => {
    var db = req.db;
    Post.remove({
        _id: req.params.id
    }, function(err, post) {
        if(err)
          res.send(err)
        res.send({
            success: true
        })
    })
})

app.listen(process.env.PORT || 5000)
