const express=require('express');
const mongoose=require('mongoose');
const  app = express();
const bodyParser=require('body-parser');

// promises

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/store',{useNewUrlParser: true });
mongoose.connection.once('open',function(){
    console.log('connection has been made');
}).on('error',function(err){
console.log('connection Error : '+err);
});
app.use(bodyParser.json());
app.use('/admin',require('./routes/admin'));
app.use('/products',require('./routes/product'));
app.use('/bills',require('./routes/bill'));
app.use('/customer',require('./routes/customer'));
app.use('/supplier',require('./routes/supplier'));
app.listen(3000,()=>{console.log(`listenning 3000`)});

