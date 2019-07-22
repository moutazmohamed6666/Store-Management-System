const express=require('express');
const router=express.Router();
const checkAuth=require('../middleware/check-auth');
var supplierModel=require('../models/supplier');


// add supplier
router.post('/',function(req,res){
    const supplier=new supplierModel({
        name:req.body.name
    });
    supplier.save().
    then(doc=>{
        res.status(201).json({
            massege:'تم اضافه المورد'
        });
    }).catch(err=>{
        res.status(500).json({
            error:'add supplier \n'+err
        });
    });
});

// get all suppliers
router.get('/',function(req,res){
    supplierModel.find().then(docs=>{
        res.status(200).json({
            suppliers:docs
        })
    }).catch(err=>{
        res.status(200).json({
            error:err
        });
    });
});

module.exports=router;