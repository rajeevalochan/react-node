const User = require('../model/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user){
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

exports.signin = function(req, res, next){
  //user had email and password Auth'd
  //We just need to give them a Token
  res.send({ token: tokenForUser(req.user)});
}

exports.signup = function(req, res, next){
  const {email, password} = req.body;
  User.findOne({email}, function(err, existingUser){
    if(!email || !password){
      return res.status(422).send({error: 'You must provide email and password'});
    }

    if(err){ return next(err);}

    if(existingUser){
      return res.status(422).send({ error: 'Email already in use'});
    }

    const user = new User({ email, password});
    user.save(function(err){
      if(err) {return next(err);}
      res.json({token: tokenForUser(user)});
    });

  })

  // res.send({ success: true});
}