const Sequelize = require("sequelize");
const db = require("./../db/db.js");
const runner = require("./runner.model.js");

// สร้าง instance เพื่อแมปกับตารางในฐานข้อมูล
const run = db.define(
  "run_tb",
  {
    runId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "runId",
    },
    dateRun: {
      type: Sequelize.STRING(100),
      allowNull: false,
      field: "dateRun",
    },
    distanceRun: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      field: "distanceRun",
    },
    placeRun: {
      type: Sequelize.STRING(100),
      allowNull: false,
      field: "placeRun",
    },
    runnerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "runnerId",
    },
    runImage: {
      type: Sequelize.STRING(150),
      allowNull: false,
      field: "runImage",
    },
  },
  {
    db,
    tableName: "run_tb",
    timestamps: false,
    freezeTableName: true,
  }
);

// export ออกไปเพื่อนำไปใช้งาน
module.exports = run;
