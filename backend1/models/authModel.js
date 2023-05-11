const {model,Schema} = require('mongoose');

const registerSchema = new Schema({
     userName : {
          type : String,
          required : true
     },
     email : {
          type: String,
          required : true
     },
     password : {
          type: String,
          required : true,
          select : false  // for security, when get this tupple then password is not display.
     },
     image : {
          type: String,
          required : true
     },
     friends: [{
          type: String,
     }]
},{timestamps : true});

module.exports = model('user',registerSchema);