const LocalStrategy = require("passport-local")
const passport = require('passport')
//maybe its better to create a User model and funnel all types of Users through it?
const Developer = require('../../models/Dev')
const Company = require('../../models/Company')
const Admin = require('../../models/Admin')

const jwt = require('jsonwebtoken')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const dotenv = require("dotenv") //see line 28
dotenv.config()

passport.serializeUser(Developer.serializeUser())
passport.serializeUser(Company.serializeUser())
passport.serializeUser(Admin.serializeUser())
passport.deserializeUser(Developer.deserializeUser())
passport.deserializeUser(Company.deserializeUser())
passport.deserializeUser(Admin.deserializeUser())

passport.use(new LocalStrategy(Developer.authenticate()))
passport.use(new LocalStrategy(Company.authenticate()))
passport.use(new LocalStrategy(Admin.authenticate()))

// jwt ////////////////////////////////////////////////////////////
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_PASSWORD
}

passport.use(new JwtStrategy
    (jwtOptions,
        (jwtPayload, callback) => {// used when asking passport to authenticate(jwt)
            Developer.findByID(jwtPayload._id, (err, user) => { //looking into db for devs
                if (err) return callback(err, false) //500 server error
                else if (user) return callback(null, user) //returns existing user
                else return callback(null, false) //user does not exist
            })

        }))

//either need to write a User model and replace dev with user in line 35 OR write one for each kind of user

//end jwt //////////////////////////////////////////////////////////

module.exports = {
    createTooken: (user) => jwt.sign(user, jwtOptions.secretOrKey, { expiresIn: 1000 })
}