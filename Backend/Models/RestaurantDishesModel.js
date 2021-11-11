const mongoose = require('mongoose');
const schema = mongoose.Schema;

var restaurantDishSchema = new mongoose.Schema({
    Restro_Id:{type:String,required:true},
    Rest_Name:{type:String,required:true},
    Dish_Name:{type:String,required:true},
    Main_Ingredients:{type:String},
    Dish_Price:{type:Number},
    Description:{type:String},
    Dish_Category:{type:String},
    Dish_Image:{type:String}
    
},{
    versionKey:false
}
);

const restaurantDishModel = mongoose.model('restaurantDishe',restaurantDishSchema);
module.exports=restaurantDishModel;