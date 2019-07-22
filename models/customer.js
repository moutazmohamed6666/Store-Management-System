const mongoose=require('mongoose');
const schema=mongoose.Schema;

//schema
const customerSchema=new schema({
    name:{type:String,required:true}, //name
    phone:{type:String},
    rest:{type:Number,required:true}
});


const customer=mongoose.model('customers',customerSchema);

module.exports=customer;

