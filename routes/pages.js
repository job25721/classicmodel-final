// import pagesController from '../controller/pageController'
const pagesCon = require('../controller/pages')

module.exports = (app) => {

    app.get('/', pagesCon.Index)
    app.get('/login', pagesCon.Login)
    app.get('/home', pagesCon.Home)
    app.get('/catalog', pagesCon.Catalog)
    app.get('/instock', pagesCon.Instock)
    app.get('/preorder', pagesCon.Preorder)
    app.get('/status', pagesCon.Status)
    app.get('/discount', pagesCon.Discount)
    app.get('/preordermanage', pagesCon.Preordermanage)
    app.get('/customer', pagesCon.Customer)
    app.get('/employee', pagesCon.Employee)
    app.get('/addUser',pagesCon.addUser)
    app.post('/addItem',pagesCon.addItem)
    app.get('/cartitem',pagesCon.cartitem)



    //authenRENDER
    app.get('/authenFailed', pagesCon.authenFailed)
}