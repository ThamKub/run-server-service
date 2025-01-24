const Sequelize = require("sequelize");
const db = require("./../db/db.js");

// สร้าง instance เพื่อแมปกับตารางในฐานข้อมูล
const runner = db.define(
  "runner_tb",
  {
    runnerId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "runnerId",
    },
    runnerName: {
      type: Sequelize.STRING(100),
      allowNull: false,
      field: "runnerName",
    },
    runnerUsername: {
      type: Sequelize.STRING(100),
      allowNull: false,
      field: "runnerUsername",
    },
    runnerPassword: {
      type: Sequelize.STRING(100),
      allowNull: false,
      field: "runnerPassword",
    },
    runnerImage: {
          type: Sequelize.STRING(150),
          allowNull: false,
          field: "runnerImage",
        },
  },
  {
    db,
    tableName: "runner_tb",
    timestamps: false,
    freezeTableName: true,
  }
);

// export ออกไปเพื่อนำไปใช้งาน
module.exports = runner;
