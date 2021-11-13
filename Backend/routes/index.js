const express = require('express');
const path=require('path');
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const jwt = require('jsonwebtoken');
var kafka = require('../kafka/client');

const {checkAuth} = require("../Utils/passport");
const Login = require("./Login");
const { auth } = require("../utils/passport");
const {checkRestroAuth} = require("../Utils/Restro_passport");
const { restroauth } = require("../utils/Restro_passport");
auth();
// restroauth();


cloudinary.config({
  cloud_name: 'dpzwqiok8',
  api_key: '886824351278767',
  api_secret: 'rBhqo_FI9cUtXV64evRK3ZgHV78'
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

// const storage=multer.diskStorage({
//   destination:(req,file,cb)=>{
//     cb(null,'../Backend/public/images')
//   },
//   filename:(req,file,cb)=>{
//     console.log(file);
//     cb(null,Date.now()+path.extname(file.originalname))
//   }
// })

const upload = multer({storage:storage});
const mysql = require('mysql2');
const bodyParser=require('body-parser');
var router = express.Router();

const app = express();
app.use(express.static("./public"))
var constants = require("./config.json");
const custSignIn = require("../Models/CustomerSignupModel")
const restroSignIn = require("../Models/RestaurantSignupModel")
const restroDish = require("../Models/RestaurantDishesModel")
const favouriteRestro = require("../Models/FavRestaurantModel")
const customerAddress = require("../Models/CustomerAddressModel")
const customerOrder = require("../Models/OrderDetailsModel.js")
const orderInfo = require("../Models/OrderInfoModel.js")
//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended:true}));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});


var mongoOptions={
useNewUrlParser:true,
useUnifiedTopology:true,
maxPoolSize:500


};
mongoose.connect(constants.DB.mongoDB,mongoOptions,(err,res)=>{
  if(err){
    console.log(err);
    console.log('connection failed');
  }
  else{
    console.log('connection successful!!!');
  }
})


var connection = mysql.createPool({
  host:constants.DB.host,
  user:constants.DB.user,
  password:constants.DB.password,
  database:constants.DB.database,
  port:constants.DB.port
  
  
  

});

// var connection1 = mysql.createConnection({
//   host:constants.DB.host,
//   user:constants.DB.user,
//   password:constants.DB.password,
//   database:constants.DB.database,
//   port:constants.DB.port
  
  
  

// });
// connection1.connect(function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log('connection created successfully');
//   }
// })

connection.getConnection(function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log('connection created successfully');
  }
})


let users = [];
// app.post('/getRestroDetails', function(req, res) {
//   var name=req.body.restro_name;
//   //console.log('name is',name);
//   var query='SELECT * FROM Restro_Details where Rest_Name='+mysql.escape(name);
//   connection.query(query,function(err,result,fields){
//     if(err){
//       console.log(err);
//     }
//     else{
//       console.log(result);
//       res.send(result);
//       //console.log('name is',name);
//       res.end();
//     }
//   })
// })


// app.post('/create',upload.single("image"),function(req, res) {
//   const newUser = {
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//   };
//   users.push(newUser);
//   console.log(users);
 
//   //var finalImage="data:image/png;base64,"+req.file.buffer.toString('base64');

//  // var imgsrc = 'http://localhost:3002/images/' + req.file.filename
//     var imgsrc=req.file.path;
  
  

//   var records=[[req.body.name,req.body.email,req.body.password,req.body.fav_restro
//     ,req.body.birth_date,req.body.phone_no,req.body.city,req.body.state,req.body.country,
//     req.body.nickname,imgsrc]];
//   connection.query('INSERT into Customer_Login(name,email,password,Fav_Restro,Birth_Date,Phone_No,City,State,Country,Nick_Name,cust_image) VALUES ?',[records],function(err,res,fields){
//     if(err){
//       console.log(err);
//     }
//     else{
//       console.log(res);
//     }
//   } );
//   });



// app.post('/restro_create',upload.single("image"),function(req, res) {
//   var imgsrc = 'http://localhost:3002/images/' + req.file.filename
  
//   var records=[[req.body.rest_name,req.body.rest_location,req.body.rest_desc,req.body.rest_email,
//   req.body.rest_password,req.body.rest_contact,req.body.rest_time,imgsrc,req.body.delivery,
// req.body.pickup,req.body.veg,req.body.nonveg,req.body.vegan]];
//   connection.query('INSERT into Restro_Details(Rest_Name,Rest_Location,Rest_Desc,Rest_Email,Rest_Password,Rest_Contact,Rest_Timings,Rest_Image,Rest_Deliver,Rest_pickup,Veg,Non_Veg,Vegan) VALUES ?',[records],function(err,result,fields){
//     if(err){
//       console.log(err);
//     }
//     else{
//       console.log(result);
//       res.send(result);
//       res.end();
//     }
//   } );
//   });

// app.post('/adddish',upload.single("image"),function(req, res) {
//   if(req.file.filename){
//     var imgsrc = 'http://localhost:3002/images/' + req.file.filename
//   }
  
//   var records=[[req.body.name,req.body.dishname,req.body.ingredients,req.body.price,req.body.description,req.body.category,imgsrc]];
//   connection.query('INSERT into Restro_Dishes(Rest_Name,Dish_Name,Main_Ingredients,Dish_Price,Description,Dish_Category,dish_image) VALUES ?',[records],function(err,res,fields){
//     if(err){
//       console.log(err);
//     }
//     else{
//       console.log(res);
//     }
//   } );
// });

// app.post('/getDishDetails', function(req, res) {
//   var name=req.body.name;
//   //console.log('name is',name);
//   var query='SELECT * FROM Restro_Dishes where Rest_Name='+mysql.escape(name);
//   connection.query(query,function(err,result,fields){
//     if(err){
//       console.log(err);
//     }
//     else{
//       console.log(result);
//       res.send(result);
//       //console.log('name is',name);
//       res.end();
//     }
//   })
// });

// app.post('/getCustDetails', function(req, res) {
//   var name=req.body.name;
//   //console.log('name is',name);
//   var query='SELECT * FROM Customer_Login where name='+mysql.escape(name);
//   connection.query(query,function(err,result,fields){
//     if(err){
//       console.log(err);
//     }
//     else{
//       console.log(result);
//       res.send(result);
//       //console.log('name is',name);
//       res.end();
//     }
//   })
// });

// app.get('/getAllRestaurants', function(req, res) {
//   //var name=req.body.name;
//   //console.log('name is',name);
//   var query='SELECT * FROM Restro_Details';
//   connection.query(query,function(err,result,fields){
//     if(err){
//       console.log(err);
//     }
//     else{
//       console.log(result);
//       res.send(result);
//       //console.log('name is',name);
//       res.end();
//     }
//   })
// });


// app.post('/getCustLocation', function(req, res) {
//   var name=req.body.name;
//   //console.log('name is',name);
//   var query='SELECT * FROM Customer_Login where name='+mysql.escape(name);
//   connection.query(query,function(err,result,fields){
//     if(err){
//       console.log(err);
//     }
//     else{
//       console.log(result);
//       res.send(result);
//       //console.log('name is',name);
//       res.end();
//     }
//   })
// });

// app.post('/getDishesByRestro', function(req, res) {
//   var name=req.body.name;
//   //console.log('name is',name);
//   var query='SELECT * FROM Restro_Dishes where Rest_Name='+mysql.escape(name);
//   connection.query(query,function(err,result,fields){
//     if(err){
//       console.log(err);
//     }
//     else{
//       console.log(result);
//       res.send(result);
//       //console.log('name is',name);
//       res.end();
//     }
//   })
// });

// app.post('/addtofav',function(req, res) {
  
//   var records=[[req.body.cust_name,req.body.rest_name,req.body.rest_image]];
//   connection.query('INSERT into Favourite_Restro(Cust_Name,Restro_Name,Restro_Image) VALUES ?',[records],function(err,result,fields){
//     if(err){
//       console.log(err);
//     }
//     else{
//       console.log(result);
//       res.send(result);
//       res.end();
//     }
//   } );
//   });

  // app.post('/getfav',function(req, res) {
  //   var cust_name=req.body.cust_name;
  //   var query='SELECT * FROM Favourite_Restro where Cust_Name='+mysql.escape(cust_name);
  //   connection.query(query,function(err,result,fields){
  //     if(err){
  //       console.log(err);
  //     }
  //     else{
  //       console.log(result);
  //       res.send(result);
  //       res.end();
  //     }
  //   } );
  //   });

    // app.post('/addaddress',function(req, res) {
     
      
    //   var records=[[req.body.name,req.body.address]];
    //   connection.query('INSERT into Customer_Addresses(Cust_Name,Cust_Address) VALUES ?',[records],function(err,res,fields){
    //     if(err){
    //       console.log(err);
    //     }
    //     else{
    //       console.log(res);
    //     }
    //   } );
    // });

    // app.post('/getcustaddresses',function(req, res) {
    //   var cust_name=req.body.name;
    //   var query='SELECT * FROM Customer_Addresses where Cust_Name='+mysql.escape(cust_name);
    //   connection.query(query,function(err,result,fields){
    //     if(err){
    //       console.log(err);
    //     }
    //     else{
    //       console.log(result);
    //       res.send(result);
    //       res.end();
    //     }
    //   } );
    //   });

      // app.post('/placeOrder',function(req, res) {
      //   var records=[[req.body.cust_name,req.body.restro_name,req.body.date,req.body.time,req.body.address,req.body.status,req.body.amount,req.body.delivery_instructions]];
        
      //   connection.query('INSERT into Orders(Cust_Name,Restro_Name,Order_Dt,Order_Time,Cust_Address,Order_Status,Order_Amount,Instructions) VALUES ?',[records],function(err,result,fields){
      //     if(err){
      //       console.log(err);
      //     }
      //     else{
      //       var resString=JSON.stringify(result);
            
      //       var resJson =  JSON.parse(resString);
            
      //       res.send(resJson.insertId.toString());
      //       console.log("order id is ", resJson);
      //       res.end();
      //     }
      //   } );
      //   });
  
    // app.post('/saveOrderDetails',function(req, res) {
    //   var orderInfo=req.body.order_details;
    //   orderInfo.map((val)=>{
    //     var records=[[req.body.order_id,val.Dish_Name,val.quantity]]
    //     connection.query('INSERT into Order_Details(Order_Id,Order_Dish,Quantity) VALUES ?',[records],function(err,result,fields){
    //       if(err){
    //         console.log(err);
    //       }
    //       else{
    //         console.log(result);
    //         res.end();
    //       }
    //     } );
        

    //   })

    //       });
    
    // app.post('/getOrderDetails',function(req, res) {
    //   var cust_name=req.body.cust_name;
    //   var query='SELECT * FROM Orders where Cust_Name='+mysql.escape(cust_name);
    //   connection.query(query,function(err,result,fields){
    //     if(err){
    //       console.log(err);
    //     }
    //     else{
    //       console.log(result);
    //       res.send(result);
    //       res.end();
    //     }
    //   } );
    //   });

    // app.post('/viewOrderDetailsById',function(req, res) {
    //   const order_id=req.body.order_Id;
      
    //   var query='SELECT * FROM Order_Details where Order_Id=' +mysql.escape(order_id);
    //   connection.query(query,function(err,result,fields){
    //     if(err){
    //       console.log(err);
    //       }
    //     else{
    //       console.log(result);
    //       res.send(result);
    //       res.end();
    //       }
    //     } );
    //     });

      // app.post('/getRestroOrderDetails',function(req, res) {
      //   var restro_name=req.body.restro_name;
      //   var query='SELECT * FROM Orders where Restro_Name='+mysql.escape(restro_name);
      //   connection.query(query,function(err,result,fields){
      //     if(err){
      //       console.log(err);
      //       }
      //     else{
      //       console.log(result);
      //       res.send(result);
      //       res.end();
      //       }
      //     } );
      //     });

      // app.post('/updateOrderStatus',function(req, res) {
      //   var status=req.body.value;
      //   var id = req.body.order_id
      //   var records=[status,id];
      //   var query='UPDATE Orders SET Order_Status=? where Order_Id=?';
      //   connection.query(query,records,function(err,result,fields){
      //     if(err){
      //       console.log(err);
      //       }
      //     else{
      //       console.log(result);
      //       res.send(result);
      //       res.end();
      //           }
      //         } );
      //         });

      // app.post('/login', function(req, res) {
      //   var name=req.body.name;
      //           //console.log('name is',name);
      //   var query='SELECT password FROM Customer_Login where name='+mysql.escape(name);
      //   connection.query(query,function(err,result,fields){
      //     if(err){
      //       console.log(err);
      //       }
      //     else{
      //       console.log(result);
      //       res.send(result);
      //       //console.log('name is',name);
      //       res.end();
      //       }
      //     })
      //   });


  //   app.post('/restroLogin', function(req, res) {
  //     var name=req.body.name;
  //                 //console.log('name is',name);
  //     var query='SELECT Rest_Password FROM Restro_Details where Rest_Name='+mysql.escape(name);
  //     connection.query(query,function(err,result,fields){
  //     if(err){
  //       console.log(err);
  //       }
  //     else{
  //       console.log(result);
  //       res.send(result);
  //             //console.log('name is',name);
  //       res.end();
  //       }
  //     })
  // });

  app.post('/custsignupmongo', upload.single("image"),(req, res) => {
    var newUser = new custSignIn({
        Name: req.body.name,
        Email:req.body.email ,
        Password: req.body.password,
        Fav_Restro:req.body.fav_restro,
        Birth_Date:req.body.birth_date,
        Phone:req.body.phone_no,
        City:req.body.city,
        State:req.body.state,
        Country:req.body.country,
        NickName:req.body.nickname,
        Cust_Image:req.file.path
    });
    
    newUser.save((error, data) => {
      if (error) {
        res.writeHead(500, {
        'Content-Type': 'text/plain'
          })
        res.end();
        }
      else {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        })
        res.end('Data inserted successfully!!');
        }
    });
        
    
});


app.post('/getcustDetailsMongo',(req, res) => {
  kafka.make_request('getCustDetails',req.body, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside err");
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    }else{
        console.log("Inside else");
            // res.json({
            //     results
            // });

            res.end(JSON.stringify(results));
        }
    
});


      
  
});


app.post('/restrosignupmongo', upload.single("image"),(req, res) => {
  var newRestaurant = new restroSignIn({
    Rest_Name: req.body.rest_name,
    Rest_Location:req.body.rest_location ,
    Rest_Desc: req.body.rest_desc,
    Rest_Email:req.body.rest_email,
    Rest_Password:req.body.rest_password,
    Rest_contact:req.body.rest_contact,
    Rest_Timings:req.body.rest_time,
    Rest_Image:req.file.path,
    Rest_Deliver:req.body.delivery,
    Rest_pickup:req.body.pickup,
    Veg:req.body.veg,
    Non_Veg:req.body.nonveg,
    Vegan:req.body.vegan
  });
  
  newRestaurant.save((error, data) => {
    if (error) {
      res.writeHead(500, {
      'Content-Type': 'text/plain'
        })
      res.end();
      }
    else {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end('Data inserted successfully!!');
      }
  });
      
  
});


// app.post('/custLoginMongo',(req, res) => {

//   custSignIn.findOne({Email:req.body.email,Password:req.body.password}, (error, result) => {
//     if (error) {
//         res.writeHead(500, {
//             'Content-Type': 'text/plain'
//         })
//         res.end('some error occurred');
//     }
//     if(result) {
//         const payload = {_id:result._id,name:result.Name}
//         const token = jwt.sign(payload,"cmpe273",{
//         expiresIn:1008000
//         });
//         res.status(200).end("JWT "+ token);
//     }
//     else{
//       res.status(401).end("Invalid credentials")
//     }
// });

      
  
// });



app.post('/getCustLocationMongo',(req, res) => {

  kafka.make_request('getCustDetails',req.body, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside err");
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    }else{
        console.log("Inside else");
            // res.json({
            //     results
            // });

            res.end(JSON.stringify(results[0].City));
        }
    
});

      
  
});

app.use("/", Login);

app.post('/restroLoginMongo',(req, res) => {

  restroSignIn.findOne({Rest_Email:req.body.email,Rest_Password:req.body.password},(error, result) => {
    if (error) {
      res.status(500).end("Error Occured");
  }
  if (result) {
      const payload = { _id: result._id, name: result.Rest_Name};
      const token = jwt.sign(payload, "cmpe273", {
          expiresIn: 1008000
      });
      res.status(200).send(JSON.stringify("JWT " + token));
  }
  else {
      res.status(401).end("Invalid Credentials");
  }
});
});

app.post('/getRestroDetailsMongo',(req, res) => {
  kafka.make_request('getRestroDetails',req.body, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside err");
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    }else{
        console.log("Inside else");
            // res.json({
            //     results
            // });

            res.end(JSON.stringify(results));
        }
    
});

});



app.post('/addDishMongo',  upload.single("image"),(req, res) => {
  var request=req.body;
  request.path=req.file.path;
  kafka.make_request('addDish',request, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside err");
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    }else{
        console.log("Inside else");
            // res.json({
            //     results
            // });

            res.end(results);
        }
    
});
      
  
});



app.post('/getDishesByRestroMongo',(req, res) => {

  kafka.make_request('getDishesByRestro',req.body, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside err");
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    }else{
        console.log("Inside else");
            // res.json({
            //     results
            // });

            res.end(JSON.stringify(results));
        }
    
});


});


app.get('/getAllRestaurantsMongo',checkAuth,(req, res) => {

  restroSignIn.find({}, (error, result) => {
    if (error) {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        })
        res.end();
    }
    else {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(result));
    }
});
});

app.post('/addtofavMongo', function(req, res){

  kafka.make_request('addtofav',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  results
              });

              res.end();
          }
      
  });
});







app.post('/getFavMongo',(req, res) => {

  kafka.make_request('getFav',req.body, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside err");
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    }else{
        console.log("Inside else");
            // res.json({
            //     results
            // });

            res.end(JSON.stringify(results));
        }
    
});


});

app.post('/addaddressMongo',(req, res) => {
  kafka.make_request('addAddress',req.body, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside err");
        console.log(err);
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    }else{
        console.log("Inside else");
            // res.json({
            //     results
            // });

            res.end(JSON.stringify(results));
        }
    
});
      
  
});


app.post('/getcustaddressesMongo',(req, res) => {

  kafka.make_request('getCustomerAddress',req.body, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside address err");
        console.log(err);
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    }else{
        console.log("Inside else");
            // res.json({
            //     results
            // });

            res.end(JSON.stringify(results));
        }
    
});


});

app.post('/placeOrderMongo',(req, res) => {

  kafka.make_request('placeOrder',req.body, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside err");
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    }else{
        console.log("Inside else");
            // res.json({
            //     results
            // });

            res.end(JSON.stringify(results));
        }
    
});
 
      
  
});


app.post('/saveOrderDetailsMongo',(req, res) => {
  
  kafka.make_request('saveOrderDetails',req.body, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside err");
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    }else{
        console.log("Inside else");
            // res.json({
            //     results
            // });

            res.end(JSON.stringify(results));
        }
    
});

      
  
});



app.post('/getOrderDetailsMongo',(req, res) => {
  kafka.make_request('getOrderDetails',req.body, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside err");
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    }else{
        console.log("Inside else");
            // res.json({
            //     results
            // });

            res.end(JSON.stringify(results));
        }
    
});

});

app.post('/editCityMongo',(req, res) => {
  kafka.make_request('editCity',req.body, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside err");
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    }else{
        console.log("Inside else");
            // res.json({
            //     results
            // });

            res.end(JSON.stringify(results));
        }
    
});

});


app.post('/viewOrderDetailsByIdMongo',(req, res) => {
  kafka.make_request('viewOrderDetailsById',req.body, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside err");
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    }else{
        console.log("Inside else");
            // res.json({
            //     results
            // });

            res.end(JSON.stringify(results));
        }
    
});
 
});

app.post('/getRestroOrderDetailsMongo',(req, res) => {

  kafka.make_request('getRestroOrderDetails',req.body, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside err");
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    }else{
        console.log("Inside else");
            // res.json({
            //     results
            // });

            res.end(JSON.stringify(results));
        }
    
});
});

app.post('/updateOrderStatusMongo',(req, res) => {

  kafka.make_request('updateOrderStatus',req.body, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside err");
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    }else{
        console.log("Inside else");
            // res.json({
            //     results
            // });

            res.end(JSON.stringify(results));
        }
    
});
      
  
});


app.post('/cancelOrder',function(req, res) {
  kafka.make_request('cancelOrder',req.body, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside err");
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    }else{
        console.log("Inside else");
            // res.json({
            //     results
            // });

            res.end(JSON.stringify(results));
        }
    
});


        });


//start your server on port 3002
module.exports=app.listen(3002, () => {
  console.log('Server Listening on port 3002');
});
module.exports = router;