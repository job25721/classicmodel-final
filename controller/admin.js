//all pages require req /admin
const Database = require('../config/database')
module.exports = {
    Home(req, res) { // req : /admin
        res.render('pages/home')
    },
    Instock(req, res) { // req : /admin/instokc
        res.render('pages/ordering/instock')
    },
    Preorder(req, res) {
        res.render('pages/ordering/pre-order')
    },
    Status(req, res) {
        res.render('pages/status')
    },
    Discount(req, res) {
        res.render('pages/discount')
    },
    Preordermanage(req, res) {
        res.render('pages/preorder')
    },
    Customer(req, res) {
        res.render('pages/customer')
    },
    Employee(req, res) {
        res.render ('pages/employee')
    },
    e(req,res){res.render('pages/editEmployee')},
  
    //dataFetch
    fetchDetails(req, res) {
        var empNum = parseInt(req.session.user)
        Database.query('SELECT firstName,lastName,jobTitle FROM employees WHERE employeeNumber =' + empNum, (err, data) => {
            res.json(data)
        })
    },
    fetchCustomer(req, res) {
        Database.query('SELECT  customerNumber,customerName , addressLine1 FROM customers , employees WHERE customers.salesRepEmployeeNumber = ' + req.session.user, function (err, data, fields) {
            res.json(data);
        });
    },
    instockData(req, res) {
        Database.query('select `productCode`, `productName`, `productLine`, `productScale`, `productVendor`, `productDescription`, `quantityInStock`, `buyPrice` from `products`', (err, data) => {
            res.json(data)
        })
    },
    fetchEmployee(req,res){
        var employeeNumber
        if(req.session.user !== undefined){
            employeeNumber = parseInt(req.session.user)
        }else{
            employeeNumber = 0
        }
        Database.query('select * from employees where reportsTo = ' + employeeNumber ,(err,data)=>{
            res.json(data)
        })
    },
    editEmployee(req,res){
        req.session.editSESSION = parseInt(req.body.employeeNumber)
        Database.query('select * from employees where employeeNumber = '+ req.session.editSESSION,(err,data)=>{
            if(data.length > 0)
                res.json(data)
        })
    }
}