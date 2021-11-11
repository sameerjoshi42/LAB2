const mongoose = require('mongoose');
const schema = mongoose.Schema;

var signupSchema = new mongoose.Schema({
    Name:{type:String,required:true},
    Email:{type:String,required:true},
    Password:{type:String,required:true},
    Fav_Restro:{type:String},
    Birth_Date:{type:String},
    Phone:{type:String},
    City:{type:String},
    State:{type:String},
    Country:{type:String},
    NickName:{type:String},
    Cust_Image:{type:String}

},{
    versionKey:false
}
);

const signupModel = mongoose.model('custSignup',signupSchema);
module.exports=signupModel;