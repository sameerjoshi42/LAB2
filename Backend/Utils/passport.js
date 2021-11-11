var ExtractJwt = require("passport-jwt").ExtractJwt;
var JwtStrategy = require('passport-jwt').Strategy
const passport = require("passport");
const customer = require("../Models/CustomerSignupModel");

function auth(){
    var opts={
        jwtFromRequest:ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey :"cmpe273"
    };
    passport.use(
        new JwtStrategy(opts,(jwt_payload,callback)=>{
            const cust_id=jwt_payload._id;
            customer.findById(cust_id,(err,results)=>{
                if(err){
                    console.log("Error, Invalid user");
                    return callback(err,false);
                }
                if(results){
                    console.log("No Error, Valid user");
                    return callback(null,results);
                }
                else{
                    console.log("No Error, Invalid user");
                    return callback(null,false);
                }
            })
        })
    )
}

exports.auth=auth;
exports.checkAuth = passport.authenticate("jwt",{session:false});