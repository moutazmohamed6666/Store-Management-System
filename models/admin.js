const mongoose=require('mongoose');
const schema=mongoose.Schema;

//schema
const adminSchema=new schema({
    mail:{type:String,required:true}, //user name
    password:{type:String,required:true}
});


const admin=mongoose.model('admins',adminSchema);

module.exports=admin;

