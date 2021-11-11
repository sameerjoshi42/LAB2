var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
var AddtoFav = require('./services/addtofav');
var getDishesByRestro = require('./services/getDishesByRestro');
var getFav = require('./services/getFav');
var addAddress = require('./services/addAddress');
var getAddress = require('./services/getAddress');
var getRestroDetails = require('./services/getRestroDetails');
var addDish = require('./services/addDish');
var getCustDetails = require('./services/getCustDetails');

var placeOrder = require('./services/placeOrder');
var getOrderDetails = require('./services/getOrderDetails');
var getRestroOrderDetails = require('./services/getRestroOrderDetails');
var saveOrderDetails = require('./services/saveOrderDetails');
var viewOrderDetailsById = require('./services/viewOrderDetailsById');
var updateOrderStatus = require('./services/updateOrderStatus');
var cancelOrder = require('./services/cancelOrder');


const mongoose = require('mongoose');
var mongoOptions={
    useNewUrlParser:true,
    useUnifiedTopology:true,
    maxPoolSize:500
    
    
    };
    mongoose.connect("mongodb+srv://root:root@cluster0.p7ceh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",mongoOptions,(err,res)=>{
      if(err){
        console.log(err);
        console.log('connection failed');
      }
      else{
        console.log('connection successful!!!');
      }
    })

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("addtofav",AddtoFav)
handleTopicRequest("getDishesByRestro",getDishesByRestro)
handleTopicRequest("getFav",getFav)
handleTopicRequest("addAddress",addAddress)
handleTopicRequest("getCustomerAddress",getAddress)
handleTopicRequest("getRestroDetails",getRestroDetails)
handleTopicRequest("addDish",addDish)
handleTopicRequest("getCustDetails",getCustDetails)
handleTopicRequest("placeOrder",placeOrder)
handleTopicRequest("getOrderDetails",getOrderDetails)
handleTopicRequest("getRestroOrderDetails",getRestroOrderDetails)
handleTopicRequest("saveOrderDetails",saveOrderDetails)
handleTopicRequest("viewOrderDetailsById",viewOrderDetailsById)
handleTopicRequest("updateOrderStatus",updateOrderStatus)
handleTopicRequest("cancelOrder",cancelOrder)
