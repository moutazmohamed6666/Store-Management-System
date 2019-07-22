const mongoose=require('mongoose');
const schema=mongoose.Schema;

//schema
const storeSchema=new schema({
    name:{type:String,required:true}
});


const store=mongoose.model('stores',storeSchema);

module.exports=store;

