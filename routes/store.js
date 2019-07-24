const express=require('express');
const router=express.Router();
const checkAuth=require('../middleware/check-auth');
var storeModel=require('../models/store');
var productModel=require('../models/product');


// add store
router.post('/',function(req,res){
    const store=new storeModel({
        name:req.body.name
    });
    store.save().
    then(doc=>{
        res.status(201).json({
            massege:'تم انشاء المخزن'
        });
    }).catch(err=>{
        res.status(500).json({
            error:'add store \n'+err
        });
    });
});

// get all stores
router.get('/',function(req,res){
    storeModel.find().then(docs=>{
        res.status(200).json({
            store:docs
        })
    }).catch(err=>{
        res.status(200).json({
            error:err
        });
    });
});

// inventory 
router.get('/inventory',function(req,res){
    productModel.find({},'code name numberOfPieces imgPath ChinaPrice CostPrice')
    .then(docs=>{
        res.status(200).json({
            products:docs
        });
    }).catch(err=>{
        res.status(500).json({
            error:'inventory route \n'+err
        });
    });
});

module.exports=router;