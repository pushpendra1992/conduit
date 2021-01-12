var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    Slug: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    tagList: [{
        type: String,
        required: true
    }],
    favorited: Boolean,
    favoritesCount: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Article', articleSchema);