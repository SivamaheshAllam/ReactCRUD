let express=require('express');
let router=express.Router();
let multer = require("multer");
let bcrypt=require('bcrypt')
let jwt=require("jsonwebtoken");

let connection=require('./db')

router.get('/studentsList',(req,res)=>{
    let sqlQuery=`select * from students`
    connection.query(sqlQuery,(err, result)=>{
      if(err){
        res.json({status:"failed", details:err})
        console.log(err)
      }
      else{
        res.json({status:"success", details:result});
        console.log(result)
      }
    })
    
  })

//multer cofiguration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      console.log(file);
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage: storage });


  router.post("/signup", upload.single("profilePic"), async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    let hashPassword=await bcrypt.hash(req.body.password,10);
    let filePath = req.file.destination + "/" + req.file.filename;
    connection.query(
      `select count(email) as cnt from students where email="${req.body.email}"`,
      (err, result) => {
        if (result[0].cnt > 0) {
          res.json({ status: "Email ID already exists" });
        } else {
          console.log(filePath); // works all
          let sqlQuery = `insert into students(name,email,password,studentId,batchId,mobileNo,profilePic)
          values('${req.body.name}', '${req.body.email}', '${hashPassword}',
         '${req.body.studentId}','${req.body.batchId}', '${req.body.mobileNo}','${filePath}')`;
          console.log(sqlQuery);
          connection.query(sqlQuery, (err, result) => {
            if (err) {
              res.json({status:"Insert failed", details:result});
            } else {
              res.json({ status: "Successfully Registered" });
            }
          });
        }
      }
    );
  });



  router.post("/login", upload.none(),  (req, res) => {
    console.log(req.body);
    let sqlQuery = `select * from students where email='${req.body.email}'`;
    connection.query(sqlQuery, async (err, result) => { 
      if (err) {
        res.json({ status:"failure", details: err });
      } else {
        console.log(result);
       
        if (result.length > 0) {
         let isValidPassword=await bcrypt.compare(req.body.password, result[0].password)
         let newToken=jwt.sign({id:result[0].id},"shhh")
         console.log(newToken);
  
          if (isValidPassword == true) {
            let userDetails = {
              id: result[0].id,
              name: result[0].name,
              email: result[0].email,
              studentId: result[0].studentId,
              batchId: result[0].batchId,
              mobileNo: result[0].mobileNo,
              profilePic: result[0].profilePic,
              token:newToken //sending client
            };
            res.json({ status:"success", details: userDetails }); //if password is valid
          } else {
            res.json({ status:"failure", details: "Invalid Password" });
          }
        } else {
          res.json({ status:"failure", details: "• Please enter valid Email" });
        }
      }
    });
  });


  router.put("/edit", upload.single("profilePic"), (req, res) => {
    console.log(req.body);
    console.log(req.id);
    // console.log(`""HELLO PATH",${req.file.destination}${req.file.filename}`); //works all
    let filePath = req.file.destination + "/" + req.file.filename;
    console.log(filePath);
    let sqlQuery = `update students set name="${req.body.name}",
      email="${req.body.email}", batchId="${req.body.batchId}", mobileNo="${req.body.mobileNo}",
      profilePic="${filePath}"
      where id=${req.body.id}`;
    console.log(sqlQuery);
    connection.query(sqlQuery, (err, result) => {
      if (err) {
        res.json({ status: "Update Failed", details: err });
      } else {
        res.json({ status: "Profile updated successfully", details: result });
      }
    });
  });



  router.delete("/delete",(req,res)=>{
    let sqlQuery=`delete from students where id=${req.query.id}`
    console.log(sqlQuery);
    connection.query(sqlQuery,(err, result)=>{
     if(err){
         res.json({status:"Failed to delete", details:err})
     }
     else{
         res.json({status:"Successfully deleted..", details:result});
     }
    })
 })


 router.post('/validateToken',upload.none(),(req,res)=>{
    console.log(req.body.token)
    let decryptedObj=jwt.verify(req.body.token,"shhh")//storing into object 
    console.log(decryptedObj)
    let sqlQuery=`select * from students where id=${decryptedObj.id}`
    console.log(sqlQuery)
  
    connection.query(sqlQuery,(err, result)=>{
      if(result.length > 0){
        let userDetails={
          id: result[0].id,
              name: result[0].name,
              email: result[0].email,
              studentId: result[0].studentId,
              batchId: result[0].batchId,
              mobileNo: result[0].mobileNo,
              profilePic: result[0].profilePic
        }
        res.json({status:"Success", details:userDetails});
      }
      else{
        res.json({status:"failure", details:"Invalid token"})
      }
    })
  })


  module.exports=router;