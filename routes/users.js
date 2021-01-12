var express = require('express');
var User = require('../modles/user');
var jwtToken = require('../modules/token');
var bcrypt = require('bcrypt');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* POST users listing. */

// Ctreate User
router.post('/', async (req, res, next) => {
  try {
    var user = await User.create(req.body.user);
    console.log(user);
    var token = await jwtToken.generateJWT(user);
    res.status(201).json({
      user: {
        ...userInfo(user),
        token: token
      }
    })
  } catch (error) {
    console.log(error);
    next(error);
  }
});


// Login
router.post('/login', async (req, res, next) => {
  try {
    var {
      email,
      password
    } = req.body.user;
    var user = await User.findOne({
      email
    });
    let result = await bcrypt.compare(password, user.password);
    if (user && result) {
      var token = await jwtToken.generateJWT(user);
      res.status(201).json({
        user: {
          ...userInfo(user),
          token: token
        }
      });
    } else {
      res.json("token is required")
    }

  } catch (error) {
    next(error);
  }
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