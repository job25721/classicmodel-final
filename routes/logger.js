const logger = require('../controller/logger')
const Router = require('express').Router()

Router.post('/login', logger.login)
Router.post('/add',logger.addUser)
Router.get('/logout', logger.logout)

module.exports = Router