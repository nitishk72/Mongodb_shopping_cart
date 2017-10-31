var express = require('express');
var router = express.Router();
var Product = require("../models/product");
var Cart = require("../models/cart");
var Order = require("../models/order");
/* GET home page. */
router.get('/',  function(req, res, next) {
    Product.find(function(err, docs){
        var productChunk = [];
        var chunkSize = 3;
        for(var i=0; i<docs.length; i += chunkSize){
            productChunk.push(docs.slice(i,i + chunkSize));
        }
        res.render('shop/', { title: 'Etaxones', product:productChunk});    
    }); 
});

router.get('/add-to-cart/:id', function(req, res, next){
   var productId = req.params.id;
   var cart = new Cart(req.session.cart ? req.session.cart : {});
   Product.findById(productId, function(err, product){
       if(err){
           console.log("err in app.js line no 21");
            return res.redirect('/');
       }
       cart.add(product, product.id);
       req.session.cart = cart; //no need to save??
    //   console.log(req.session.cart);
       res.redirect('/');
   });
});
router.get('/cart', function(req, res, next) {
   if(!req.session.cart) {
       return res.render('shop/cart', {product : null, title : 'your cart'});
   }
   var cart = new Cart(req.session.cart);
//   eval(require("locus"));
   res.render('shop/cart', {product: cart.generateArray(), totalPrice : cart.totalPrice, title : 'your cart'});
});

router.get('/reduce/:id', function(req, res, next) {
    var id = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(id);
    res.redirect('/cart');
});

router.get('/checkout', isLoggedIn, function(req, res, next) {
    if(!req.session.cart) {
       return res.redirect('shop/cart');
   }
   var cart = new Cart(req.session.cart);
   res.render('shop/checkout', {total : cart.totalPrice, title : 'Checkout Page'});
});

router.post('/checkout', isLoggedIn, function(req, res, next){
    if(!req.session.cart) {
       return res.render('shop/cart', {product : null, title : 'your cart'});
   }
   var cart = new Cart(req.session.cart);
   var order = new Order({
      user: req.user,
      cart : cart,
      address : req.body.address,
      name : req.body.name,
      phoneNo : req.body.mobileNo
   });
   order.save(function(err, result){
    req.flash('success', 'order placed successfully');
    req.session.cart = null;
    res.redirect('/');
   });

});

module.exports = router;

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else{
        req.session.ordUrl = req.url;
        res.redirect("/user/signin");
    }
}