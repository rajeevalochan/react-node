const passport = require('passport');
const config = require('../config');
const User = require('../model/user');
const JwtStratergy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStratergy = require('passport-local');

//LocalOPtions
const LocalOptions = {usernameField: 'email'};
const localLogin = new LocalStratergy(LocalOptions, function(email, password, done){
  User.findOne({email}, function(err, user){
    //If error
    if(err) return done(err);
    //If user not found
    if(!user) return done(false, null);

    //Using comparepassword from user Schema
    user.comparePassword(password, function(err, isMatch){
      if(err) return done(err);
      if(!isMatch) return done(null, false);

      return done(null, user);
    });
  });
});

//setup jwtOptions
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

//create JWT Stratergy
const jwtLogin = new JwtStratergy(jwtOptions, function(payload, done){
  //see if the USERID in the database exists
  //If it exist call done
  //Otherwise call done with false
  User.findById(payload.sub, function(err, user){
    if(err) { return done(err, false);}

    if(user){
      return done(null, user);
    }else{
      done(null, false)
    }
  })
});

//Tell passport to use JWT
passport.use(jwtLogin);
passport.use(localLogin);