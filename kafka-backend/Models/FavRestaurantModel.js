const mongoose = require('mongoose');
const schema = mongoose.Schema;

var favRestroSchema = new mongoose.Schema({
    CustId:{type:String,required:true},
    RestaurantId:{type:String,required:true},
    Restaurant_Name:{type:String,required:true},
    Restro_Image:{type:String,required:true}
},{
    versionKey:false
}
);

const favRestaurantModel = mongoose.model('Favourite_Restaurant',favRestroSchema);
module.exports=favRestaurantModel;