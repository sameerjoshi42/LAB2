
const favouriteRestro = require("../Models/FavRestaurantModel")

function handle_request(msg, callback){
   
    console.log("Inside addtoFav kafka backend");
    console.log(msg);
    var newFavRestro = new favouriteRestro({
        CustId: msg.id,
        RestaurantId:msg.rest_id ,
        Restro_Image: msg.rest_image,
        Restaurant_Name:msg.rest_name
    });
    newFavRestro.save((error, data) => {
        if (error) {
          console.log(error)
          callback(error,'cannot add to fav')
          
          }
        else {
          
          callback(null,"yay!successfully added restaurant to favourites!!")
          }
      });
    

   
    console.log("after callback");
};

exports.handle_request = handle_request;
