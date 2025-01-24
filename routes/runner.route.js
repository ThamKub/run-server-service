const express = require("express");
const runnerCtrl = require("../controllers/runner.controller");
const runner = require("../models/runner.model");

const router = express.Router();

router.post("/", runnerCtrl.uploadRunner, runnerCtrl.addRunner); // เพิ่มข้อมูลนักวิ่ง
router.put("/:runnerId", runnerCtrl.uploadRunner, runnerCtrl.editRunner); // แก้ไขข้อมูลนักวิ่ง
router.get("/:runnerUsername/:runnerPassword", runnerCtrl.checkLoginRunner); // ดึงข้อมูลนักวิ่งทั้งหมด

module.exports = router;
