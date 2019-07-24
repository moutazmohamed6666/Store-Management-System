const mongoose=require('mongoose');
const schema=mongoose.Schema;

//schema
const productSchema=new schema({
    code:{type:Number,required:true},
    name:{type:String,required:true},
    numberOfPieces:{type:Number,required:true},
    numberOfCartons:{type:Number,required:true},
    store:{type:String,required:true},
    sellingPrice:{type:Number,required:true}
});

const billSchema=new schema({
    customerId:{type:String,required:true},
    customerName:{type:String,required:true},
    date:{type:Date,required:true},
    numberOfBill:{type:Number,required:true},      // db.collection.count()¶
    products:{type:[productSchema],required:true},
    total:{type:Number,required:true},
    paid:{type:Number,required:true},
    rest:{type:Number,required:true}

});
const bill=mongoose.model('bills',billSchema);

module.exports=bill;

