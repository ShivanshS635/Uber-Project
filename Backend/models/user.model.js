const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname : {
        firstname :{
            type : String,
            required : true,
            minlength : [2 , 'First Name Must Be At Least 2 Characters Long']
        },
        lastname :{
            type : String,
            minlength : [2 , 'Last Name Must Be At Least 2 Characters Long']
        }
    },
    email : {
        type : String,
        required : true,
        unique : true,
        minlength : [6 , 'Email Must Be At Least 6 Characters Long']
    },
    password : {
        type : String,
        required : true,
        select : false
    },
    socketid : {
        type : String
    },
});

userSchema.methods.generateAuthToken = function(){
    return token = jwt.sign({_id : this._id} , process.env.JWT_SECRET , {expiresIn : '24h'}
)};

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password);
};

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password , 10);
};

const User = mongoose.model('User' , userSchema);

module.exports = User;