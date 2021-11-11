
const customerAddress = require("../Models/CustomerAddressModel")

function handle_request(msg, callback){
   
    console.log("Inside addtoFav kafka backend");
    console.log(msg);
    var newAddress = new customerAddress({
        CustId: msg.id,
        Cust_Address:msg.address
        
    });
  
    newAddress.save((error, data) => {
        if (error) {
          console.log(error)
          callback(error,'cannot add new address')
          
          }
        else {
          
          callback(null,"yay!successfully added new customer address")
          }
      });
    

   
    console.log("after callback");
};

exports.handle_request = handle_request;
