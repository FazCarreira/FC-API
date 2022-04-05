const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    html: String,
    tags: [String],
    image: String,
    visits: Number,
    created: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('post', PostSchema);
module.exports = Post;