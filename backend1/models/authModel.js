const {model,Schema} = require('mongoose')

const registerSchema = new Schema({
    userName : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    passowrd: {
        type: String,
        required: true,
        select: false // when lead then not save..
    },
    image: {
        type: String,
        required: true
    }
},{timestamps : true});

module.exports = model('user',registerSchema);