const Database = require('../config/database')
const bcrypt = require('bcrypt');

module.exports = {
    Index(req, res) {
        res.render('pages/index')
    },
    Contributor(req,res){
        res.render('pages/contributor')
    },
    Login(req, res) {
        if (req.session.loggedin) {
            res.redirect('/admin')
        } else {
            res.render('pages/login')
        }
    },
    Catalog(req, res) {
        var scale = req.query.scale;
        var vendor = req.query.vendor; 
        if ((scale === undefined && vendor === undefined) || (scale === "All" && vendor === "All")) {
            Database.query('SELECT * FROM `products` JOIN `productlines` USING (productLine)', function (err, result, fields) {

                res.render('pages/catalog/catalog')
            });
        } else if (scale === "All" && vendor !== "All") {
            Database.query('SELECT * FROM `products` JOIN `productlines` USING (productLine) where productVendor = ?', vendor, function (err, result, fields) {

                res.render('pages/catalog/catalog')
            })
        } else if (scale !== "All" && vendor === "All") {
            Database.query('SELECT * FROM `products` JOIN `productlines` USING (productLine) where productScale = ?', scale, function (err, result, fields) {

                res.render('pages/catalog/catalog')
            })
        } else {
            Database.query('SELECT * FROM `products` JOIN `productlines` USING (productLine) where productScale = ? and productVendor = ?', [scale, vendor], function (err, result, fields) {

                res.render('pages/catalog/catalog')
            })
        }
    },

    getData(req, res) {
       /* Database.query('SELECT * FROM `products` JOIN `productlines` USING (productLine)', function (err, result, fields) {

            res.json({result: result})
        });*/
        var scale = req.query.scale;
        var vendor = req.query.vendor; 
        if ((scale === undefined && vendor === undefined) || (scale === "All" && vendor === "All")) {
            Database.query('SELECT * FROM `products` JOIN `productlines` USING (productLine)', function (err, result, fields) {

                res.json({
                    result: result,
                    rowNum: result.length
                })
            });
        } else if (scale === "All" && vendor !== "All") {
            Database.query('SELECT * FROM `products` JOIN `productlines` USING (productLine) where productVendor = ?', vendor, function (err, result, fields) {

                res.json({
                    result: result,
                    rowNum: result.length
                })
            })
        } else if (scale !== "All" && vendor === "All") {
            Database.query('SELECT * FROM `products` JOIN `productlines` USING (productLine) where productScale = ?', scale, function (err, result, fields) {

                res.json({
                    result: result,
                    rowNum: result.length
                })
            })
        } else {
            Database.query('SELECT * FROM `products` JOIN `productlines` USING (productLine) where productScale = ? and productVendor = ?', [scale, vendor], function (err, result, fields) {

                res.json({
                    result: result,
                    rowNum: result.length
                })
            })
        }

    },
    fetchPopUp(req, res) {
        var code = req.query.productCode
        Database.query('SELECT * FROM `products` JOIN `productlines` USING (productLine) where productCode = ? ', [code], function (err, result, fields) {
            res.json( result)
        })

    },
    addUser(req, res) {
        res.render('pages/addUser', {
            x: 10
        })

    },
    scaleFilter(req, res) {
        Database.query('SELECT DISTINCT productScale FROM products', function (err, data, fields) {
            res.json(data);
        });
    },
    vendorFilter(req, res) {
        Database.query('SELECT DISTINCT productVendor FROM products', function (err, data, fields) {
            res.json(data);
        });
    },
    select(req, res) {
        user = parseInt(req.body.num)
        pass = req.body.pass
        Database.query('SELECT pswd FROM users WHERE employeeNumber = ' + user, (err, data) => {
            if (data.length > 0) {
                bcrypt.compare(pass.toString(), data[0].pswd, function (err, bool) {
                    res.send("Password Match : " + bool)
                });
            } else {
                res.send("no such employee")
            }

        })

    },
    authenFailed(req, res) {
        res.render('pages/redirectPage')
    }
}