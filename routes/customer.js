const express=require('express');
const router=express.Router();
const checkAuth=require('../middleware/check-auth');
var customerModel=require('../models/customer');


// add customer
router.post('/',function(req,res){
    const customer=new customerModel({
        name:req.body.name,
        phone:req.body.phone,
        rest:0
    });
    customer.save().
    then(doc=>{
        res.status(201).json({
            massege:'تم اضافه العميل'
        });
    }).catch(err=>{
        res.status(500).json({
            error:'add customer \n'+err
        });
    });
});

// get all customers
router.get('/',function(req,res){
    customerModel.find().then(docs=>{
        res.status(200).json({
            customers:docs
        })
    }).catch(err=>{
        res.status(200).json({
            error:err
        });
    });
});

module.exports=router;