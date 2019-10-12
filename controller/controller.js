const Database = require('../database')

const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const passport = require('passport')

// getting the local authentication type
const LocalStrategy = require('passport-local').Strategy
const app = require('express')()
module.exports = {
    login (req,res,next){
        app.use(bodyParser.json())
        app.use(cookieSession({
            name: 'mysession',
            keys: ['vueauthrandomkey'],
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        }))
        app.use(passport.initialize())
        app.use(passport.session());
    }
}