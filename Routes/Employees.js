let express= require('express');
let router=express.Router();
let connetion= require('./db')


router.get('/listOfEmployees',(req, res)=>{

 let sqlQuery="select * from employees"
 connetion.query(sqlQuery,(err,result)=>{
  if(err){
    res.json({status:"failure", details:err});
  }
  else{
    res.json({status:"success", details:result})
  }
 })
})
module.exports=router;