const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// developer MODEL
const Developer = require('../../models/Dev');

// @router POST api/developer
// @desc REGISTER DEVELOPER
// @access Private

router.post('/', [

  check('email', 'Email is required')
    .isEmail(),

  check('password', 'Please enter a password with 6 or more charecters')
    .isLength({ min: 6 }),
  
  check('role', 'Your role is required')
    .not()
    .isEmpty(),

  check('location', 'Your location is required')
    .not()
    .isEmpty(),

  check('skills', 'A list of your skills are required')
    .not()
    .isEmpty(),

  check('bio', 'A short pitch of your self required')
    .not()
    .isEmpty()

], (req, res)=> {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    return res.status(400).json({ errors: errors.array() });

  }

  const { email, password } = req.body;

  // See if user exists



  // Get users image
  // Empcrypt password is
  // Return JSON web token

  console.log(req.body);

  res.send('Dev route');

});


module.exports = router;


