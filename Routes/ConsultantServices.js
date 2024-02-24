let express= require("express");
let router=express.Router();


router.get('/listOfConsultants',(req, res)=>{
    let consultants=["Vendor1", "Vendor2", "Vendor3"];

    res.json(consultants);
})

module.exports=router;