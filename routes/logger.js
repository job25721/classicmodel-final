const loggerCon = require('../controller/controller')

module.exports = (app) => {
    app.post('/login', loggerCon.login)
    app.get('/logout', loggerCon.logout)

    app.post('/add',loggerCon.addUser)
}