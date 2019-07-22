const mongoose=require('mongoose');
const schema=mongoose.Schema;

//schema
const supplierSchema=new schema({
    name:{type:String,required:true} //name
});


const supplier=mongoose.model('suppliers',supplierSchema);

module.exports=supplier;
