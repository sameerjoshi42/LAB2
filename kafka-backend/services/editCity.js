const editCity = require("../Models/CustomerSignupModel")

function handle_request(msg, callback){
   
    console.log("Inside edit City kafka backend");
    console.log(msg);
   
    editCity.updateOne({_id:msg.id},{$set: {City:msg.updatedCity}}, (error, data) => {
        if (error) {
          console.log(error)
          callback(error,'cannot edit the city')
          
          }
        else {
          
          callback(null,"successfully edited the city.")
          }
      });
    

   
    console.log("after callback");
};

exports.handle_request = handle_request;