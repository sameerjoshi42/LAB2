const customerAddress = require("../Models/CustomerAddressModel")

function handle_request(msg, callback){
   
    console.log("Inside getAddress kafka backend");
    console.log(msg);
   
    customerAddress.find({CustId:msg.id}, (error, data) => {
        if (error) {
          console.log(error)
          callback(error,'cannot display address')
          
          }
        else {
          
          callback(null,data)
          }
      });
    

   
    console.log("after callback");
};

exports.handle_request = handle_request;