const custDetails = require("../Models/CustomerSignupModel")

function handle_request(msg, callback){
   
    console.log("Inside cust Details kafka backend");
    console.log(msg);
   
    custDetails.find({_id:msg.id}, (error, data) => {
        if (error) {
          console.log(error)
          callback(error,'cannot display favRestro')
          
          }
        else {
          
          callback(null,data)
          }
      });
    

   
    console.log("after callback");
};

exports.handle_request = handle_request;