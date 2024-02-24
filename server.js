let express = require("express");
let cors = require("cors");

let baseServices = require("./Routes/BaseServices");
let consultantServices=require('./Routes/ConsultantServices')
let employeeServices= require('./Routes/Employees')


// let upload= multer();

let app = express();
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/", baseServices);
app.use('/consultant',consultantServices)
app.use('/employees', employeeServices)

app.use(express.json());
app.use(express.urlencoded());

app.listen(4444, () => {
  console.log("listening to port 4444");
});
