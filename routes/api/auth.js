const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Developer = require('../../models/Dev');

// @route GET api/auth
// @Desc 
// @Access Public
router.get('/', auth, async (req, res) => {
  
  try {

    const dev = await Developer.findById(req.dev.id).select('-password');
  
    res.json(dev);
    
  } catch (err) {
  
    console.error(err.message);
  
    res.status(500).send('Server Error');
  }

});

// @router POST api/auth
// @desc Authenticate dev & get token
// @access Public
router.post('/', [

  check('email', 'Email is required')
    .isEmail(),

  check('password', 'Password is required')
    .exists()

], async (req, res)=> {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    return res.status(400).json({ errors: errors.array() });

  }

  const { email, password } = req.body;
  
  try {

    let dev = await Developer.findOne({ email });

    if (!dev) {

      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, dev.password);

    if (!isMatch) {

      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
    
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