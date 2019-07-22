const express=require('express');
const router=express.Router();
const checkAuth=require('../middleware/check-auth');
var ProductModel=require('../models/product');
var billModel=require('../models/bill');

// make a bill
router.patch('/',function(req,res){
    
    for(var i=0;i<req.body.products.length;i++)
    {
        ProductModel.findOneAndUpdate({code:req.body.products[i].code},
            {$inc:{numberOfCartons:-req.body.products[i].numberOfCartons}})
            .then(docs=>{

            }).catch(err=>{
                res.status(500).json({
                    error:err
                });
            })  
    }
billModel.find().then(docs=>{
   var count= docs.length+1;
    const bill=new billModel({
        customerId:req.body.customerId,
        customerName:req.body.customerName,
        date:req.body.date,
        numberOfBill:count,      
        products:req.body.products
    });

    bill.save()
    .then(result=>{
        res.status(201).json({
            massege:'تم اضافه الفاتوره '
        });
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
}).catch(err=>{
    res.status(500).json({
        error:err
    });
})


});

// get bills
router.get('/',function(req,res){
    billModel.find()
    .then(docs=>{
        res.status(200).json({
            bills:docs
        });

    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
});

// get all bills for customer
router.get('/customer/:id',function(req,res){
    billModel.find({customerId:req.params.id})
    .then(docs=>{
        res.status(200).json({
            bills:docs
        });
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    })
});

// get only bill for customer
router.get('/:numberOfBill',function(req,res){
    billModel.find({numberOfBill:req.params.numberOfBill})
    .then(docs=>{
        res.status(200).json({
            bill:docs
        });
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    })
});

// router.patch('/:numberOfBill',function(req,res){
//     billModel.findOneAndUpdate({numberOfBill:req.params.numberOfBill},
//         )
// });


module.exports=router;