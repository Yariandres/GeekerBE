const express = require('express');
const config = require('config');
const router = express.Router();

const {check, validationResult } = require('express-validator');

const Developer = require('../../models/Dev');

// @router GET api/developer
// @desc Get current developer profile
// @access Private
router.get('/developer', async (req, res) => {

  try {

    const developer = await Developer.findOne({ user: req.user.id }).populate('user', 
    [
      'title', 
      'location', 
      'status', 
      'skills', 
      'bio', 
      'createdAt'
    ]);

    if (!developer) {
      return res.status(400).json({ msg : 'There is no profile for this developer'});
    }

    res.json(developer);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');    
  }
});

module.exports = router;


