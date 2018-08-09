const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

//Define Model
const userSchema = new Schema({
  email: {type: String, unique: true, lowercase: true},
  password: String
});

//on Save hook, encrypt Password
userSchema.pre('save', function(next){
  const user = this;
  //Generate password
  bcrypt.genSalt(10,function(err, salt){
    if(err){ return next(err);}
    //Generate Hash
    bcrypt.hash(user.password, salt,null, function(err, hash){
      if(err){ return next(err);}
      //password hashed
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword,this.password, function(err, isMatch){
    if(err) return callback(err);
    callback(null, isMatch);
  });
}

//Create ModalClass
const ModalClass = mongoose.model("user", userSchema);

//Export Class
module.exports = ModalClass;