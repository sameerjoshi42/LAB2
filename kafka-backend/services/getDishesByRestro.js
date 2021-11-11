const restroDish = require("../Models/RestaurantDishesModel")

function handle_request(msg, callback){
   
    console.log("Inside getDishesByRestro kafka backend");
    console.log(msg);
   
    restroDish.find({Restro_Id:msg.id}, (error, data) => {
        if (error) {
          console.log(error)
          callback(error,'cannot display dishes')
          
          }
        else {
          
          callback(null,data)
          }
      });
    

   
    console.log("after callback");
};

exports.handle_request = handle_request;