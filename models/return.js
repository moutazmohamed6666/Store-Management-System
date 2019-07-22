const mongoose=require('mongoose');
const schema=mongoose.Schema;

//schema
const productSchema=new schema({
    CustomerId:{type:String,required:true},
    customerName:{type:String,required:true},
    code:{type:Number,required:true},
    name:{type:String,required:true},
    numberOfCartons:{type:Number,required:true},
    date:{type:Date,required:true},
    store:{type:String,required:true},
    sellingPrice:{type:Number,required:true}
});


const returnProduct=mongoose.model('return',productSchema);

module.exports=returnProduct;

