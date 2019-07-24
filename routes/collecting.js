const express=require('express');
const router=express.Router();
const checkAuth=require('../middleware/check-auth');
var customerModel=require('../models/customer');
var collectingModel=require('../models/collecting');
var BillsModel=require('../models/bill');


// paid 
router.post('/',function(req,res){
    customerModel.findOneAndUpdate({_id:req.body._id},{$inc:{rest:-req.body.paid}})
    .then(docs=>{
        var collecting=new collectingModel({
            customerId:req.body._id,
            customerName:req.body.customerName,
            date:req.body.date,
            paid:req.body.paid,
            rest:(docs.rest-req.body.paid)
        });
        collecting.save()
        .then(result=>{
            res.status(201).json({
                massege:'تم اضافه التحصيل '
                        });
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        })
      
    }).catch(err=>{
        res.status(500).json({
            error:'collecting ======= '+err
        });
    });
});

// Daily Inventory
router.get('/dailyInventory',function(req,res){
    var sum=0;
    collectingModel.find({date:{$gte:req.body.date}},'paid').then(result=>{
        result.forEach(function(item){
            sum+=item.paid;
        })
    }).then(()=>{
        BillsModel.find({date:{$gte:req.body.date}},'numberOfBill customerName').then(docs=>{
            res.status(200).json({
                bills:docs,
                total:sum
            });
        }).catch(err=>{
            res.status(500).json({
                error:'daily Inventory get bills ======= '+err
            });
        });
    }).catch(err=>{
        res.status(500).json({
            error:'daily Inventory total paid  ======= '+err
        });
    });

}); 
module.exports=router;