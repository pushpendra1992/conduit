var express = require('express');
var router = express.Router();
var jwtToken = require('../modules/token');
const User = require('../modles/user');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/user', jwtToken.verifyToken, (req, res, next) => {
  res.json({
    user: req.user
  })
})

function userInfo(user) {
  return {
    email: user.email,
    username: user.username,
    bio: user.bio,
    image: user.image
  }
}


module.exports = router;