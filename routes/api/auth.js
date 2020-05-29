const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

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



module.exports = router;