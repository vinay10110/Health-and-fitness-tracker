const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User.js'); 
dotenv.config();

const router = express.Router();


router.post('/register', async (req, res) => {
  console.log('Register route reached');

  const { username, password, firstName, lastName, weight } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      msg: 'Please pass username and password.'
    });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        msg: 'Username already exists.'
      });
    }


    const newUser = new User({
      username,
      password,
      firstName,
      lastName,
      weight,
    });

    await newUser.save();
    res.status(201).json({
      success: true,
      msg: 'Successfully created new user.'
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      msg: 'Failed to create user. Please try again later.'
    });
  }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send({
        success: false,
        msg: 'Authentication failed. User not found.'
      });
    }


    user.comparePassword(password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).send({
          success: false,
          msg: 'Authentication failed. Wrong password.'
        });
      }

     
      const token = jwt.sign(user.toJSON(), process.env.SECRET_KEY, {
        expiresIn: '1h'
      });

      res.json({
        success: true,
        token: token,
        userId: user._id
      });
    });

  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      msg: 'An error occurred. Please try again.'
    });
  }
});

module.exports = router;
