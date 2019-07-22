const express=require('express');
const router=express.Router();
const checkAuth=require('../middleware/check-auth');
var ProductModel=require('../models/product');
var billModel=require('../models/bill');
var damagedModel=require('../models/damaged');
var returnedModel=require('../models/return');
// Add product

router.post('/Add',function(req,res){  
    ProductModel.find().then(doc=>{
        var newcode=doc.length+1;
        const product=new ProductModel({
            code:newcode,
            date:req.body.date,
            name:req.body.name,
            numberOfPieces:req.body.numberOfPieces,
            numberOfCartons:req.body.numberOfCartons,
            imgPath:req.body.imgPath,
            store:req.body.store,
            ChinaPrice:req.body.ChinaPrice, 
            CostPrice:req.body.CostPrice,
            sellingPrice:req.body.sellingPrice
          });
        
          product.save()
          .then(result=>{
              res.status(201).json({
                  massege:'تم اضافه المنتج '
              });
          })
          .catch(err=>{
              res.status(500).json({
                  error:err
              })
          });
    }).catch(err=>{
        res.status(500).json({
            error:err
        })
    });
  
});

// get products

router.get('/',function(req,res){
    ProductModel.find({},'code name numberOfPieces numberOfCartons store sellingPrice')
    .then(docs=>{
        res.status(200).json({
            products:docs
        });
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
});
// get products list

router.get('/productlist',function(req,res){
    ProductModel.find({},'name numberOfCartons')
    .then(docs=>{
        res.status(200).json({
            products:docs
        });
    })
    .catch(err=>{
        res.status(500).json({
            error:'productlist \n '+err
        });
    });
});

// The product is damaged

router.patch('/damaged',function(req,res){
ProductModel.findOneAndUpdate({code:req.body.code},{$inc:{
    numberOfCartons:-req.body.numberOfCartons
}}).then(docs=>{
    const damaged=new damagedModel({
        code:req.body.code,
        name:req.body.name,
        numberOfCartons:req.body.numberOfCartons,
        store:req.body.store,
        date:req.body.date,
        CostPrice:req.body.CostPrice
    });
    damaged.save()
    .then(result=>{
        res.status(201).json({
            massege:'تم حذف الهالك  '
        });
    }).catch(err=>{
        res.status(500).json({
            error:err
        });
    })

}).catch(err=>{
    res.status(500).json({
        error:err
    });
});

});

//Returned products

router.patch('/returned',function(req,res){
    ProductModel.findOneAndUpdate({code:req.body.code},{$inc:{
        numberOfCartons:req.body.numberOfCartons
    }}).then(docs=>{
        const returned=new returnedModel({
            customerName:req.body.customerName,
            customerId:req.body.customerId,
            code:req.body.code,
            name:req.body.name,
            numberOfCartons:req.body.numberOfCartons,
            store:req.body.store,
            date:req.body.date,
            sellingPrice:req.body.sellingPrice
        });
        returned.save()
        .then(result=>{
            res.status(201).json({
                massege:'تم اضافة المرتجع  '
            });
        }).catch(err=>{
            res.status(500).json({
                error:err
            });
        })
    
    }).catch(err=>{
        res.status(500).json({
            error:err
        });
    });
    
    });
    
module.exports=router;