const mongoose = require('mongoose');
const schema = mongoose.Schema;

var orderInfoSchema = new mongoose.Schema({
    Order_Id:{type:String,required:true},
    Dish_Name:{type:String,required:true},
    Quantity:{type:String,required:true}
    
},{
    versionKey:false
}
);

const OrderInfoModel = mongoose.model('Order_Info',orderInfoSchema);
module.exports=OrderInfoModel;