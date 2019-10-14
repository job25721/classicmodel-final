const loggerCon = require('../controller/controller')

module.exports = (app) =>{
    app.post('/auth',loggerCon.login)
    app.get('/logout',loggerCon.logout)
}