const mongoose=require('mongoose');
const schema=mongoose.Schema;
//schema
const collectingSchema=new schema({
    customerId:{type:String,required:true},
    customerName:{type:String,required:true},
    date:{type:Date,required:true},
    paid:{type:Number,required:true},
    rest:{type:Number,required:true}
});


const collecting=mongoose.model('collecting',collectingSchema);

module.exports=collecting;

