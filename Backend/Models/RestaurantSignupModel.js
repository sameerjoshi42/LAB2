const mongoose = require('mongoose');
const schema = mongoose.Schema;

var restaurantSchema = new mongoose.Schema({
    Rest_Name:{type:String,required:true},
    Rest_Location:{type:String,required:true},
    Rest_Desc:{type:String,required:true},
    Rest_Email:{type:String,required:true},
    Rest_Password:{type:String,required:true},
    Rest_contact:{type:String,required:true},
    Rest_Timings:{type:String},
    Rest_Image:{type:String},
    Rest_Deliver:{type:String},
    Rest_pickup:{type:String},
    Veg:{type:String},
    Non_Veg:{type:String},
    Vegan:{type:String}
    

},{
    versionKey:false
}
);

const restrosignupModel = mongoose.model('restaurantSignup',restaurantSchema);
module.exports=restrosignupModel;