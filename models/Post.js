const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        max: 500,
        required: false,
    },
    image: {
        type: String,
        required: true,
    },
    likes: {
        type: Array,
        default: []
    }
}, 
    {timestamps: true}
);

module.exports = mongoose.model("Post", PostSchema);