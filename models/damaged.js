const mongoose=require('mongoose');
const schema=mongoose.Schema;

//schema
const productSchema=new schema({
    code:{type:Number,required:true},
    name:{type:String,required:true},
    numberOfCartons:{type:Number,required:true},
    store:{type:String,required:true},
    date:{type:Date,required:true},
    CostPrice:{type:Number,required:true}
});


const damaged=mongoose.model('damaged',productSchema);

module.exports=damaged;

