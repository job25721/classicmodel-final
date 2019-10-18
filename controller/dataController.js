const Database = require('../config/database')

module.exports = {
    scaleFilter(req, res) {
        Database.query('SELECT DISTINCT productScale FROM products', function (err, data, fields) {
            res.json(data);

        });
    },
    vendorFilter(req, res) {
        Database.query('SELECT DISTINCT productVendor FROM products', function (err, data, fields) {
            res.json(data);

        });
    }
}