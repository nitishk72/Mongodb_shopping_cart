var express = require('express');
var router = express.Router();
var csrf = require("csurf");
var csrfProtection = csrf();
var passport = require("passport");
router.use(csrfProtection);
var Order = require("../models/order");
var Cart = require("../models/order");
router.get('/profile', isLoggedIn, function(req, res, next) {
    Order.find({user :req.user}, function(err, orders){
        if(err){
            return res.write('error');
        } else {
            var cart;
            orders.forEach(function(order){
                order.items = function(){
                                var arr=[];
                                for (var id in order.items){
                                    arr.push(order.items[id]);
                                }
                                return arr;
                            };
            });
            console.log(orders[0].items);
            res.render('users/profile', {title : req.user.email + ' Profile', orders : orders});
        }
    });
});
router.get('/logout', isLoggedIn,function(req, res, next) {
    req.logout();
    res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next){
    next();
});

router.get('/signup', function(req, res, next){
    var message = req.flash('error');
    res.render('users/signup', {title: 'User Signup',csrfToken: req.csrfToken(), message : message, hasError : message.length > 0}); 
});

router.post('/signup', passport.authenticate('local.signup', {
     failureRedirect : '/user/signup',
     failureFlash    : true
}), function(req, res, next){
    if(req.session.oldUrl){
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profie');
    }
});

router.get('/signin/', function(req, res, next){
    var message = req.flash('error');
    res.render('users/signin', {title: 'User Signin',csrfToken: req.csrfToken(), message : message, hasError : message.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', {
     failureRedirect : '/user/signin',
     failureFlash    : true
}), function(req, res, next){
    if(req.session.oldUrl){
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile');
    }
});

module.exports = router;

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else{
        res.redirect("/");
    }
}
function notLoggedIn(req, res, next){
    if(!req.isAuthenticated()){
        return next();
    } else{
        res.redirect("/");
    }
}