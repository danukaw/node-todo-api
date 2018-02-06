const mongoose = require('mongoose');

let User = mongoose.model('User', {
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        minlength : 1,
        trim : true
    }
});

module.exports = {User};