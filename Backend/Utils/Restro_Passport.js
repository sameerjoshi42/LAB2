var ExtractJwt = require("passport-jwt").ExtractJwt;
var JwtStrategy = require('passport-jwt').Strategy
const passport = require("passport");
const restroSignIn = require("../Models/RestaurantSignupModel")

function restroauth(){
    var opts={
        jwtFromRequest:ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey :"cmpe273"
    };
    passport.use(
        new JwtStrategy(opts,(jwt_payload,callback)=>{
            const restro_id=jwt_payload._id;
            restroSignIn.findById(restro_id,(err,results)=>{
                if(err){
                    console.log("Error, Invalid restaurant");
                    return callback(err,false);
                }
                if(results){
                    console.log("No Error, Valid restaurant");
                    return callback(null,results);
                }
                else{
                    console.log("No Error, Invalid restaurant");
                    return callback(null,false);
                }
            })
        })
    )
}

exports.restroauth=restroauth;
exports.checkRestroAuth = passport.authenticate("jwt",{session:false});