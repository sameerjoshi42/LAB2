const mongoose = require('mongoose');
const schema = mongoose.Schema;

var orderDetailsSchema = new mongoose.Schema({
    Cust_Id:{type:String,required:true},
    Cust_Name:{type:String,required:true},
    Restro_Id:{type:String,required:true},
    Restro_Name:{type:String,required:true},
    Order_Date:{type:String,required:true},
    Order_Time:{type:String,required:true},
    Cust_Address:{type:String,required:true},
    Order_Status:{type:String,required:true},
    Order_Amount:{type:Number,required:true},
    Order_Instructions:{type:String},
    
},{
    versionKey:false
}
);

const custOrderModel = mongoose.model('Customer_Order',orderDetailsSchema);
module.exports=custOrderModel;