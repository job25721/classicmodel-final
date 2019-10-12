// import pagesController from '../controller/pageController'
const pagesCon = require('../controller/pages')

module.exports = (app) => {
    app.get('/',pagesCon.index)
    app.get('/success',pagesCon.success)
}