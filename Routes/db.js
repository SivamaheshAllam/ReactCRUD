let mysql=require('mysql')
let dotenv=require('dotenv')


dotenv.config()

let connection = mysql.createConnection({
    host: process.env.dbHost,
    user: process.env.dbUser,
    password: process.env.dbPassword,
    port: process.env.dbPort,
    database: process.env.dbName
  });
  connection.connect((err,result)=>{
    if(err){
      console.log(err)
      console.log("unable to connect");
    }
    else{
      console.log("Successfully connected to Database")
    }
  })

  module.exports= connection;