const restroDetails = require("../Models/RestaurantSignupModel")

function handle_request(msg, callback){
   
    console.log("Inside getAddress kafka backend");
    console.log(msg);
   
    restroDetails.find({_id:msg.id}, (error, data) => {
        if (error) {
          console.log(error)
          callback(error,'cannot display restaurant details')
          
          }
        else {
          
          callback(null,data)
          }
      });
    

   
    console.log("after callback");
};

exports.handle_request = handle_request;