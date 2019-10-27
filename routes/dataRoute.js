const dataCon = require('../controller/dataController')
module.exports = (app) => {
    app.get('/scaleFilter', dataCon.scaleFilter)
    app.get('/vendorFilter', dataCon.vendorFilter)
    app.get('/fetchDetails',dataCon.fetchDetails)
    app.post('/select',dataCon.select)
    app.get('/discountShow',dataCon.discountShow)
}
