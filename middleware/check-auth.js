const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
try{
    const token = req.headers.authorization.split(" ")[1];
    const decoded=jwt.verify(token,'store');
    req.authData=decoded;
    next();
}
catch(error)
{
    return res.status(403).json({
        massage:'Auth failed'
            }); 
        }
   

};