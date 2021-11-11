const updateOrder = require("../Models/OrderDetailsModel")

function handle_request(msg, callback){
   
    console.log("Inside update order kafka backend");
    console.log(msg);
   
    updateOrder.updateOne({_id:msg.order_id},{$set: {Order_Status:msg.status}}, (error, data) => {
        if (error) {
          console.log(error)
          callback(error,'cannot display favRestro')
          
          }
        else {
          
          callback(null,"successfully updated the status")
          }
      });
    

   
    console.log("after callback");
};

exports.handle_request = handle_request;