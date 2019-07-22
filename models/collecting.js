const mongoose=require('mongoose');
const schema=mongoose.Schema;

//schema
const collectingSchema=new schema({
    customer:{type:String,required:true},
    date:{type:Date,required:true},
    paid:{type:Number,required:true},
    rest:{type:Number,required:true}
});


const damaged=mongoose.model('damaged',productSchema);

module.exports=damaged;

