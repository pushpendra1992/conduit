var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        match: /@/,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    },
    image: {
        type: String
    },
    articles: [{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }],
    comment: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

userSchema.pre('save', function (next) {
    if (this.password) {
        bcrypt.hash(this.password, 12, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        });
    } else next();
})



// userSchema.methods.verifyPassword = function (password) {
//     return compareSync(password, this.password)
// }
module.exports = mongoose.model('User', userSchema)