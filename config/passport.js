var passport = require("passport");
var User = require("../models/user");
var LocalStrategy = require("passport-local").Strategy;

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
   User.findById(id, function(err, user){
      done(err, user); 
   });
});

passport.use('local.signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
}, function(req, email, password, done){
    req.checkBody('email', 'invalid email').notEmpty().isEmail();
    req.checkBody('password', 'MInimum length shuld be 8 characters').notEmpty().isLength({min:8});
    var errors = req.validationErrors();
    if(errors){
        var message = [];
        errors.forEach(function(error){
           message.push(error.msg);
        });
        return done(null, false, req.flash('error', message));
    }
    User.findOne({'email':email}, function(err, user){
        if(err){
            return done(err);
        } 
        if (user) {
            return done(null, false, {message: 'email already exist login or reset password'});
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPasswod(password);
        newUser.save(function(err, result){
            if(err){
                return done(err);
            }
            return done(null, newUser);
        });
    });
}));

/*passport local signin strategy*/
passport.use('local.signin', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
}, function(req, email,password, done){
    req.checkBody('email', 'invalid email').notEmpty().isEmail();
    req.checkBody('password', 'MInimum length shuld be 8 characters').notEmpty();
    var errors = req.validationErrors();
    if(errors){
        var message = [];
        errors.forEach(function(error){
           message.push(error.msg);
        });
        return done(null, false, req.flash('error', message));
    }
    User.findOne({'email':email}, function(err, user){
        if(err){
            return done(err);
        } 
        if (!user) {
            return done(null, false, {message: 'Seems you are not register'});
        }
        if (!user.comparePassword(password)){
            return done(null, false, {message: 'opps you enterd wrong password'});
        }
        return done(null, user);
    });
}));