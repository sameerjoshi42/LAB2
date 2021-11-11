const saveOrder = require("../Models/OrderInfoModel")

function handle_request(msg,callback){
    var orderInformation=msg.order_details;
    orderInformation.map((val)=>{
    var neworderInfo = new saveOrder({
      Order_Id: msg.order_id,
      Dish_Name:val.Dish_Name ,
      Quantity: val.quantity
      
  });
  
  neworderInfo.save((error, data) => {
    if (error) {
      console.log(error)
      
      callback(error,'cannot save order details')
      }
    
  });

  })
  callback(null,'details saved successfully')

};

exports.handle_request = handle_request;
