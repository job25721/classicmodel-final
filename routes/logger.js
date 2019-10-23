const logger = require('../controller/logger')

module.exports = (app) => {
    app.post('/login', logger.login)
    app.post('/add',logger.addUser)
    app.get('/logout', logger.logout)
}