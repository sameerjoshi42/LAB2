const cancelOrder = require("../Models/OrderDetailsModel")

function handle_request(msg, callback){
   
    console.log("Inside cancel order kafka backend");
    console.log(msg);
   
    cancelOrder.updateOne({_id:msg.order_Id},{$set: {Order_Status:msg.status}}, (error, data) => {
        if (error) {
          console.log(error)
          callback(error,'cannot cancel Order')
          
          }
        else {
          
          callback(null,"successfully cancelled the order.")
          }
      });
    

   
    console.log("after callback");
};

exports.handle_request = handle_request;