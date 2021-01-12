var jwtToken = require('jsonwebtoken');

exports.generateJWT = async (user) => {
    var payload = {
        userID: user.id,
        email: user.email
    };
    var token = await jwtToken.sign(payload, process.env.SECRET);
    return token;
}

exports.verifyToken = async (req, res, next) => {
    var token = req.headers.authorization;
    console.log(process.env.SECRET);
    if (token) {
        try {
            var payload = await jwtToken.verify(token, process.env.SECRET, function (err, result) {
                if (err)
                    return next(err);
                return result;
            })
            req.user = payload;
            next()

        } catch (error) {
            res.json({
                error: "hiiiii"
            })
        }
    } else {
        res.json({
            error: "token required !"
        })
    }
}