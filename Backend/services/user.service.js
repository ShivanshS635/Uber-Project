const User = require('../models/user.model');

module.exports.createUser = async ({firstname, lastname, email, password}) => {
    if(!firstname || !email || !password){
        throw new Error('All Fields Are Required');
    }
    const user = User.create({
        fullname : {
            firstname ,
            lastname
        } ,
        email , 
        password
    });
    return user;
};