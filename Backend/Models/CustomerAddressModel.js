const mongoose = require('mongoose');
const schema = mongoose.Schema;

var custAddressSchema = new mongoose.Schema({
    CustId:{type:String,required:true},
    Cust_Address:{type:String,required:true}
    
},{
    versionKey:false
}
);

const custAddressModel = mongoose.model('Customer_Addresse',custAddressSchema);
module.exports=custAddressModel;