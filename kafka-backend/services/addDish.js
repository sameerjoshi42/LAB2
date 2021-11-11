const restroDish = require("../Models/RestaurantDishesModel")

  

function handle_request(msg,callback){
   
    console.log("Inside addtoFav kafka backend");
    console.log(msg);
    var newDish = new restroDish({
        Restro_Id: msg.id,
        Rest_Name:msg.name ,
        Dish_Name: msg.dishname,
        Main_Ingredients:msg.ingredients,
        Dish_Price:msg.price,
        Description:msg.description,
        Dish_Category:msg.category,
        Dish_Image:msg.path
        
    });
  
    newDish.save((error, data) => {
        if (error) {
          console.log(error)
          callback(error,'cannot add new dish')
          
          }
        else {
          
          callback(null,"yay!successfully added new dish")
          }
      });
    

   
    console.log("after callback");
};

exports.handle_request = handle_request;
