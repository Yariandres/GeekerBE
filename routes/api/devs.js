const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
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

], async (req, res)=> {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    return res.status(400).json({ errors: errors.array() });

  }

  const { email, password, role, location, skills, bio  } = req.body;
  
  try {

    // See if user exists by email
    let dev = await Developer.findOne({ email });

    if (dev) {
      return res.status(400).json({ errors: [{ msg: 'Developer already exists' }] });
    }

    dev = new Developer({ 
      email,
      password,
      role,
      location,
      skills,
      bio
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    
    dev.password = await bcrypt.hash(password, salt);

    await dev.save();

    // Return json web token
    const payload = {
      dev: {
        id: dev.id
      }
    }

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

    console.log(req.body);

  } catch (err) {

    console.error(err.message);

    res.status(500).send('Server Error');

  }  

});

module.exports = router;


