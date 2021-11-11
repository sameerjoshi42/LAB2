const favRestro = require("../Models/FavRestaurantModel")

function handle_request(msg, callback){
   
    console.log("Inside favRestro kafka backend");
    console.log(msg);
   
    favRestro.find({CustId:msg.id}, (error, data) => {
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