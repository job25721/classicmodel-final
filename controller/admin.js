//all pages require req /admin
const Database = require('../config/database')
module.exports = {
    Home(req, res) { // req : /admin
        res.render('pages/home')
    },
    Instock(req, res) { // req : /admin/instokc
        Database.query('SELECT * FROM products join productlines using (productLine)', function (err, productData, fields) {
            
             res.render('pages/ordering/instock', {productData: productData});
         })
    },
    addItem(req, res) {
        if(req.body.quantity != undefined && req.body.quantity != undefined ){
            var quantity_params = parseInt(req.body.quantity)
            var code = req.body.code
           
            function ProductCode(pcode) { 
               return pcode.code === code;
             }
            
           
            if( req.session.cart_item == undefined &&  req.session.total_piece == undefined ){ 
               req.session.cart_item = []
               req.session.total_piece = 0;
               req.session.totalPrice =0;

           }
           req.session.total_piece+=quantity_params
           Database.query('SELECT * FROM products join productlines using (productLine) WHERE productCode = ? ',code , (err, data) => {
               req.session.totalPrice+=(quantity_params*data[0].buyPrice);
               var myJSON = {name : data[0].productName ,code : data[0].productCode , quntity : quantity_params ,
                               price : data[0].buyPrice , total : data[0].buyPrice*quantity_params , image :  data[0].imgSrc   }
              
               if(req.session.cart_item.find(ProductCode) != undefined){
                  
                   req.session.cart_item.find( ProductCode).quntity += quantity_params
                   req.session.cart_item.find( ProductCode).total = (req.session.cart_item.find( ProductCode).quntity)*req.session.cart_item.find( ProductCode).price
              }else{
                   req.session.cart_item.push(myJSON)
               

              }
              res.json([{ row : req.session.cart_item.length},{piece : req.session.total_piece}] )
           });

       }else{
           if(req.session.cart_item != undefined) res.json([{ row : req.session.cart_item.length},{piece : req.session.total_piece}]);
           else res.json([{ row : 0},{piece : 0}]);
       }
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
        res.render('pages/employee')
    },
    editEmployee(req ,res){
        res.render('pages/editEmployee')
    },
    
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
    fetchEmployee(req,res){
        Database.query('select * from employees',(err,data)=>{
            res.json(data)
        })
    },
    cartitem(req, res) {
        
        if(req.session.cart_item != undefined){
            var cartItem = req.session.cart_item;
            var tatalprice = Number.parseInt(req.session.totalPrice).toFixed(2);
            var totalpiece = req.session.total_piece
             res.render('pages/ordering/cartitem',{cartItem : [cartItem,tatalprice,totalpiece]})
    }
        else{ res.render('pages/ordering/cartitem',{cartItem : ["Your Cart is Empty",0,0]})}
    },
}