const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const checkAuth=require('../middleware/check-auth');
var Admin=require('../models/admin');

// sing up

router.post('/singup',function(req,res){
    Admin.find({mail:req.body.mail})
    .exec()
    .then(admin=>{
        if(admin.length>=1)
        {
            return res.status(409).json({
                messege:'الحساب موجود من فضلك اختر حساب اخر'
            });
        }
        else{
            bcrypt.hash(req.body.password,15,function(err,hash){
                if(err)
                {
                    return res.status(500).json({
                        error:err
                    });
                }
                else{
                    const newAdmin=new Admin({
                        mail:req.body.mail,
                        password:hash
                    });
                    newAdmin
                        .save()
                        .then(result=>{
                            res.status(201).json({
                                massege:'تم انشاء الحساب بنجاح '
                            });
                        })
                }
            });
        }
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    });
});

// login 
router.post('/login',function(req,res){
    Admin.findOne({mail:req.body.mail})
    .exec()
    .then(admin=>{
        if(admin===null)
       {
        return res.status(401).json({
            massege:'هذا الحساب غير موجود '
        });
       }
       bcrypt.compare(req.body.password,admin.password,function(err,result){
           if(err)
           {
               return res.status(401).json({
                   massege:'كلمة السر غير صحيحه '
               });
           }
           if (result)
           {
               const token =jwt.sign({email:admin.mail},
                'store',
                { expiresIn: "12h" });
                return res.status(200).json({
                    massege:'تم الدخول ',
                    token:token
                });
           }
           return res.status(401).json({
               massege:'فشل الدخول '
           });
       });
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    })
});

// router.get('/',(req,res)=>{

//    Admin.find({},'password mail',(err,docs)=>{
//     const response = {
//         count: docs.length,
//         products: docs.map(doc => {
//           return {
//             name: doc.mail,
//             password: doc.password,
//             _id: doc._id,
//             request: {
//               type: "GET",
//               url: "http://localhost:3000/products/" + doc._id
//             }
//           };
//         })
//       };
//        res.send(response);
//    }) 
// })

module.exports=router;