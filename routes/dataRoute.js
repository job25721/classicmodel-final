const dataCon = require('../controller/dataController')
module.exports = (app) => {
    app.get('/catalog/scaleFilter', dataCon.scaleFilter)
    app.get('/catalog/vendorFilter', dataCon.vendorFilter)
    app.get('/fetchDetails',dataCon.fetchDetails)
    app.post('/select',dataCon.select)

    app.get('/customerFetch',dataCon.Customer)
    app.get('/instockFetch',dataCon.instockData);
   

}