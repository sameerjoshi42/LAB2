const viewOrderDetails= require("../Models/OrderInfoModel")

function handle_request(msg, callback){
   
    console.log("Inside favRestro kafka backend");
    console.log(msg);
   
    viewOrderDetails.find({Order_Id:msg.order_Id}, (error, data) => {
        if (error) {
          console.log(error)
          callback(error,'cannot display order details')
          
          }
        else {
          
          callback(null,data)
          }
      });
    

   
    console.log("after callback");
};

exports.handle_request = handle_request;