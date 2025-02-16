const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
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
        lowercase : true,
        match : [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password : {
        type : String,
        required : true,
        select : false
    },
    socketid : {
        type : String
    },
    status : {
        type : String,
        enum : ['active', 'inactive'],
        default : 'inactive'
    },
    vehicle :{
        color : {
            type : String,
            required : true,
            minlength : [3 , 'Color Must Be At Least 3 Characters Long']
        },

        plate : {
            type : String,
            required : true,
            minlength : [3 , 'Plate Must Be At Least 3 Characters Long']
        },

        capacity : {
            type : Number,
            required : true,
            min : [1 , 'Capacity Must Be At Least 1']
        },

        vehicleType : {
            type : String,
            required : true,
            enum : ['car' , 'motorcycle' , 'auto' ]
        }
    },
    location : {
        lat : {
            type : Number,
        },
        lng : {
            type : Number,
        }
    }
});

captainSchema.methods.generateAuthToken = function(){
    return token = jwt.sign({_id : this._id} , process.env.JWT_SECRET , {expiresIn : '24h'}
)}

captainSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password);
};

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password , 10);
};

module.exports = mongoose.model('Captain' , captainSchema);