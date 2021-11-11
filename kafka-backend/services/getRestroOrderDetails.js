const orderDetails = require("../Models/OrderDetailsModel")

function handle_request(msg, callback){
   
    console.log("Inside get Restro Order Details kafka backend");
    console.log(msg);
   
    orderDetails.find({Restro_Id:msg.restro_id}, (error, data) => {
        if (error) {
          console.log(error)
          callback(error,'cannot find order')
          
          }
        else {
          
          callback(null,data)
          }
      });
    

   
    console.log("after callback");
};

exports.handle_request = handle_request;