const dataCon = require('../controller/dataController')
module.exports = (app) => {
    app.get('/scaleFilter', dataCon.scaleFilter)
    app.get('/vendorFilter', dataCon.vendorFilter)
}