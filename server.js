const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const runnerRoute = require("./routes/runner.route");
const runRoute = require("./routes/run.route");
require("dotenv").config();

// สร้าง Web Server ด้วย Express
const app = express();

// สร้างตัวแปรเก็บค่า port number ที่อยู่ใน .env
const PORT = process.env.PORT || 4040;

// สร้าง Route สำหรับ test connect server
app.get("/", (req, res) => {
  res.json({ message: "Test connect server running is OK!!!" });
});

// ใช้สิ่งที่เรียกว่า Middleware ในการใช้งาน JSON ในการรับส่งข้อมูลระหว่าง Client และ Server
app.use(cors());
app.use(bodyParser.json());
app.use("/runner", runnerRoute);
app.use("/run", runRoute);

// กำหนด Port ให้กับ Web Server พร้อมกับรอรับ Request จาก Client/User
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
  //console.log('Server is running on port ' + PORT);
});
