const Sequelize = require("sequelize");

require("dotenv").config();

// สร้าง instance/object ของ Sequelize
const connectDB = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
  }
);

// เชื่อมต่อ database ผ่าน instance/object ที่สร้างไว้
connectDB
  .sync()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.error(`Database connection error: ${err}`);
  });

// export ออกไปเพื่อนำไปใช้งาน
module.exports = connectDB;
