const placeOrder = require("../Models/OrderDetailsModel")

  

function handle_request(msg,callback){
   
    console.log("Inside place Order kafka backend");
    console.log(msg);
    var newOrder = new placeOrder({
        Cust_Id: msg.cust_id,
        Cust_Name:msg.cust_name ,
        Restro_Id: msg.restro_id,
        Restro_Name:msg.restro_name,
        Order_Date:msg.date,
        Order_Time:msg.time,
        Cust_Address:msg.address,
        Order_Status:msg.status,
        Order_Amount:msg.amount,
        Order_Instructions:msg.delivery_instructions
  
        
    });
  
    newOrder.save((error, data) => {
        if (error) {
          console.log(error)
          callback(error,'cannot place the order')
          
          }
        else {
          
          callback(null,data._id)
          }
      });
    

   
    console.log("after callback");
};

exports.handle_request = handle_request;
