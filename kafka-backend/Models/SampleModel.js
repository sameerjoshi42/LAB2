const mongoose = require('mongoose');
const schema = mongoose.Schema;

var sampleSchema = new mongoose.Schema({
    BookId:{type:String,required:true},
    Title:{type:String,required:true},
    Author:{type:String,required:true}
},{
    versionKey:false
}
);

const sampleModel = mongoose.model('sample',sampleSchema);
module.exports=sampleModel;