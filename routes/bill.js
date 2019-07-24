const express=require('express');
const router=express.Router();
const checkAuth=require('../middleware/check-auth');
var ProductModel=require('../models/product');
var billModel=require('../models/bill');
var customerModel=require('../models/customer');
var collectingModel=require('../models/collecting');

// make a bill
router.patch('/',function(req,res){
    // update products 
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
    //create new bill
billModel.find().then(docs=>{
   var count= docs.length+1;
    const bill=new billModel({
        customerId:req.body.customerId,
        customerName:req.body.customerName,
        date:req.body.date,
        numberOfBill:count,      
        products:req.body.products,
        total:req.body.total,
        paid:req.body.paid,
        rest:req.body.rest
    });
// add collecting
    bill.save()
    .then(result=>{
        customerModel.findOneAndUpdate({_id:req.body.customerId},{$inc:{rest:-req.body.paid}})
        .then(docs=>{
            var collecting=new collectingModel({
                customerId:req.body.customerId,
                customerName:req.body.customerName,
                date:req.body.date,
                paid:req.body.paid,
                rest:(docs.rest-req.body.paid)
            });
            collecting.save()
            .then(result=>{
                res.status(201).json({
                    massege:'تم اضافه الفاتوره '
                });
            }).catch(err=>{
                res.status(500).json({
                    error:'save collecting === '+err
                })
            })
    })
    .catch(err=>{
        res.status(500).json({
            error:'add collecting ======= '+err
        })
    })
}).catch(err=>{
    res.status(500).json({
        error:err
    });
})


});
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

// inventory for only one product

router.get('/inventory/:code',function(req,res){
    billModel.find({"products.code":req.params.code},'customerName date numberOfBill')
    .then(docs=>{
        ProductModel.findOne({code:req.params.code},'numberOfCartons').then(rest=>{
            res.status(200).json({
                rest:rest,
                result:docs
                });
        }).catch(err=>{
            res.status(500).json({
                error:'inventory for only one product find rest \n '+err
            });
        });
       
    })
    .catch(err=>{
        res.status(500).json({
            error:'inventory for only one product \n '+err
        });
    });
});

module.exports=router;