// ไฟล์ประเภท controller เป็นไฟล์ที่จะทำงานกับตารางในฐานข้อมูล
// C (create/insert) เพิ่ม
// R (read/select) ค้นหา,ตรวจสอบ,ดึง,ดู
// U (update/edit) แก้ไข
// D (delete) ลบ
const runner = require("./../models/runner.model.js");
const multer = require("multer");
const path = require("path");

// สร้างส่วนของการอัปโหลดไฟล์ด้วย multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/runner");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      "runner_" +
        Math.floor(Math.random() * Date.now()) +
        path.extname(file.originalname)
    );
  },
});

// ฟังก์ชั่นอัปโหลดไฟล์
const uploadRunner = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpg|jpeg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("runnerImage");

// ฟังก์ชั่นเพิ่มข้อมูลนักวิ่ง
// กรณีไม่มีการอัปโหลดไฟล์
// const addRunner = async (req, res) => {
//   try {
//     const result = await runner.create(req.body);
//     res.status(201).json({ message: "Add runner successfully", data: result });
//   } catch (err) {
//     res.status(500).json({ message: `ERROR: ${err}` });
//   }
// };
// กรณีมีการอัปโหลดไฟล์(โดยที่ผู้ใช้จะเลือกไฟล์หรือไม่เลือกไฟล์เพื่ออัปโหลดก็ได้)
// (แต่ถ้าไม่เลือกไฟล์ที่จะอัปโหลด จะบันทึกเป็นค่าว่าง)
const addRunner = async (req, res) => {
  try {
    // สร้างตัวแปรเพื่อเก็บชืข้อมูลที่บันทึกลงตาราง โดยจะมีการเปลี่ยนชื่อไฟล์ตามที่เขียนไว้ตอนอัปโหลดข้างต้น
    let data = {
      ...req.body,
      runnerImage: req.file ? req.file.path.replace("image\\runner\\", "") : "",
    };

    const result = await runner.create(data);
    res.status(201).json({ message: "Add runner successfully", data: result });
  } catch (err) {
    res.status(500).json({ message: `ERROR: ${err}` });
  }
};

// ฟังก์ชั่น Login เพื่อเข้าใช้งานบันทึกข้อมูลนักวิ่ง
const checkLoginRunner = async (req, res) => {
  try {
    const result = await runner.findOne({
      where: {
        runnerUsername: req.params.runnerUsername,
        runnerPassword: req.params.runnerPassword,
      },
    });
    if (result) {
      res.status(200).json({ message: "Login successfully", data: result });
    } else {
      res.status(404).json({ message: "Login Username or Password incorrect" });
    }
  } catch (err) {
    res.status(500).json({ message: `ERROR: ${err}` });
  }
};

// ฟังก์ชั่นแก้ไขข้อมูลส่วนตัวของนักวิ่ง
// const editRunner = async (req, res) => {
//   try {
//     const result = await runner.update(req.body, {
//       where: { runnerId: req.params.runnerId },
//     });
//     res.status(200).json({ message: "Edit runner successfully", data: result });
//   } catch (err) {
//     res.status(500).json({ message: `ERROR: ${err}` });
//   }
// };
const editRunner = async (req, res) => {
  try {
    let data = {
      ...req.body,
    };

    if (req.file) {
      data.runnerImage = req.file.path.replace("image\\runner\\", "");
    } else {
      delete data.runnerImage;
    }

    const result = await runner.update(data, {
      where: { runnerId: req.params.runnerId },
    });
    res.status(200).json({ message: "Edit runner successfully", data: result });
  } catch (err) {
    res.status(500).json({ message: `ERROR: ${err}` });
  }
};

module.exports = { addRunner, checkLoginRunner, editRunner, uploadRunner };
