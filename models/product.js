const mongoose=require('mongoose');
const schema=mongoose.Schema;

//schema
const productSchema=new schema({
    code:{type:Number,required:true},
    date:{type:Date,required:true},
    name:{type:String,required:true},
    imgPath:{type:String,required:true},
    numberOfPieces:{type:Number,required:true},
    numberOfCartons:{type:Number,required:true},
    store:{type:String,required:true},
    ChinaPrice:{type:Number,required:true}, 
    CostPrice:{type:Number,required:true},
    sellingPrice:{type:Number,required:true}
});

const product=mongoose.model('products',productSchema);

module.exports=product;

