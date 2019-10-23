
const Database = require('../config/database')


module.exports = {
    Index(req, res) {
        res.render('pages/index')
    },
    Login(req, res) {
        res.render('pages/login')
    },
    Home(req, res) {
        if (req.session.loggedin === true) {
            res.render('pages/home')
        } else {
            res.redirect('/authenFailed')
        }
    },
    Catalog(req, res) {
        
            var scale = req.query.scale;
            var vendor = req.query.vendor;
            
            if ((scale === undefined && vendor === undefined) || (scale === "All" && vendor === "All")) {
                Database.query('SELECT * FROM `products` JOIN `productlines` USING (productLine)', function (err, result, fields) {
                   
                    res.render('pages/catalog/catalog', {result: result , Sc : scale , Ven : vendor , rowNum : result.length })
                });
            } else if (scale === "All" && vendor !== "All") {
                Database.query('SELECT * FROM `products` JOIN `productlines` USING (productLine) where productVendor = ?', vendor, function (err, result, fields) {
                   
                    res.render('pages/catalog/catalog', { result: result , Sc : scale , Ven : vendor , rowNum : result.length})
                })
            } else if (scale !== "All" && vendor === "All") {
                Database.query('SELECT * FROM `products` JOIN `productlines` USING (productLine) where productScale = ?', scale, function (err, result, fields) {
                    
                    res.render('pages/catalog/catalog', {result: result , Sc : scale , Ven : vendor , rowNum : result.length})
                })
            } else {
                Database.query('SELECT * FROM `products` JOIN `productlines` USING (productLine) where productScale = ? and productVendor = ?', [scale, vendor], function (err, result, fields) {
                    
                    res.render('pages/catalog/catalog', {result: result , Sc : scale , Ven : vendor , rowNum : result.length})
                })
            }
       

    },


    Instock(req, res) {
       // if (req.session.loggedin === true) {
            Database.query('SELECT * FROM products join productlines using (productLine)', function (err, productData, fields) {
               // console.log( req.session.cart_item);
                res.render('pages/ordering/instock', {productData: productData});
            })
            
            
       // } else {
       //     res.redirect('/authenFailed')
       // }

         



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
        if (req.session.loggedin === true) {
            res.render('pages/ordering/pre-order')
        } else {
            res.redirect('/authenFailed')
        }
    },
    Status(req, res) {
        if (req.session.loggedin === true) {
            res.render('pages/status')
        } else {
            res.redirect('/authenFailed')
        }
    },
    Discount(req, res) {
        if (req.session.loggedin === true) {
            res.render('pages/discount')
        } else {
            res.redirect('/authenFailed')
        }
    },
    Preordermanage(req, res) {
        if (req.session.loggedin === true) {
            res.render('pages/preorder')
        } else {
            res.redirect('/authenFailed')
        }
    },
    Customer(req, res) {
        if (req.session.loggedin === true) {
            res.render('pages/customer')
        } else {
            res.redirect('/authenFailed')
        }
    },
    Employee(req, res) {
        if (req.session.loggedin === true) {
            res.render('pages/employee')
        } else {
            res.redirect('/authenFailed')
        }
    },
    addUser(req, res) {
        res.render('pages/addUser', {
            x: 10
        })

    },
    authenFailed(req, res) {
        res.render('pages/redirectPage')
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