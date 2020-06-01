const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const Company = require('../../models/Company');

// @router POST api/company
// @desc REGISTER COMPANY
// @access Private

companyRouter.post('/', [

    check('email', 'Email is required')
        .isEmail(),

    check('password', 'Please enter a password with 6 or more charecters')
        .isLength({ min: 6 }),

    check('companyDescription', 'Tell job seekers about your company')
        .not()
        .isEmpty(),

    check('location', 'Your location is required')
        .not()
        .isEmpty(),

    check('jobDescription', 'Tell job seekers about the position you are offering')
        .not()
        .isEmpty(),

    check('requestedSkills', 'List the skills you are seeking')
        .not()
        .isEmpty()

], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() });

    }

    const { email, password, companyDescription, location, requestedSkills } = req.body;

    try {

        // See if user exists by email
        let co = await Company.findOne({ email });

        if (co) {
            return res.status(400).json({ errors: [{ msg: 'Company already exists' }] });
        }

        co = new Company({
            email,
            password,
            companyDescription,
            location,
            requestedSkills
        });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);

        co.password = await bcrypt.hash(password, salt);

        await co.save();

        // Return json web token
        const payload = {
            co: {
                id: co.id
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

module.exports = companyRouter;