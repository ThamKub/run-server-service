const run = require("./../models/run.model.js");
const multer = require("multer");
const path = require("path");

// สร้างส่วนของการอัปโหลดไฟล์ด้วย multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/run");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      "run_" +
        Math.floor(Math.random() * Date.now()) +
        path.extname(file.originalname)
    );
  },
});

// ฟังก์ชั่นอัปโหลดไฟล์
const uploadRun = multer({
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
}).single("runImage");

// ฟังก์ชั่นเพิ่มข้อมูลการวิ่ง
// กรณีไม่มีการอัปโหลดไฟล์
// const addRun = async (req, res) => {
//   try {
//     const result = await run.create(req.body);
//     res.status(201).json({ message: "Add run successfully", data: result });
//   } catch (err) {
//     res.status(500).json({ message: `ERROR: ${err}` });
//   }
// };
// กรณีมีการอัปโหลดไฟล์(โดยที่ผู้ใช้จะเลือกไฟล์หรือไม่เลือกไฟล์เพื่ออัปโหลดก็ได้)
// (แต่ถ้าไม่เลือกไฟล์ที่จะอัปโหลด จะบันทึกเป็นค่าว่าง)
const addRun = async (req, res) => {
  try {
    // สร้างตัวแปรเพื่อเก็บชืข้อมูลที่บันทึกลงตาราง โดยจะมีการเปลี่ยนชื่อไฟล์ตามที่เขียนไว้ตอนอัปโหลดข้างต้น
    let data = {
      ...req.body,
      runImage: req.file ? req.file.path.replace("image\\run\\", "") : "",
    };

    const result = await run.create(data);
    res.status(201).json({ message: "Add run successfully", data: result });
  } catch (err) {
    res.status(500).json({ message: `ERROR: ${err}` });
  }
};

// ฟังก์ชั่นแก้ไขข้อมูลการวิ่ง
// กรณีไม่การอัปโหลดไฟล์
// const editRun = async (req, res) => {
//   try {
//     const result = await run.update(req.body, {
//       where: { runId: req.params.runId },
//     });
//     res.status(200).json({ message: "Edit run successfully", data: result });
//   } catch (err) {
//     res.status(500).json({ message: `ERROR: ${err}` });
//   }
// };
// กรณีมีการอัปโหลดไฟล์(โดยที่ผู้ใช้จะเลือกไฟล์หรือไม่เลือกไฟล์เพื่ออัปโหลดก็ได้)
// (แต่ถ้าไม่เลือกไฟล์ที่จะอัปโหลด ก็ไม่ต้องแก้ runImage)
const editRun = async (req, res) => {
  try {
    let data = {
      ...req.body,
    };

    if (req.file) {
      data.runImage = req.file.path.replace("image\\run\\", "");
    } else {
      delete data.runImage;
    }

    const result = await run.update(data, {
      where: { runId: req.params.runId },
    });
    res.status(200).json({ message: "Edit run successfully", data: result });
  } catch (err) {
    res.status(500).json({ message: `ERROR: ${err}` });
  }
};

// ฟังก์ชั่นลบข้อมูลการวิ่ง
const delRun = async (req, res) => {
  try {
    const result = await run.destroy({ where: { runId: req.params.runId } });
    res.status(200).json({ message: "Delete run successfully", data: result });
  } catch (err) {
    res.status(500).json({ message: `ERROR: ${err}` });
  }
};

// ฟังก์ชั่นแสดงข้อมูลการวิ่งทั้งหมดของนักวิ่งคนนั้นๆ
const getAllRun = async (req, res) => {
  try {
    const result = await run.findAll({
      where: { runnerId: req.params.runnerId },
    });
    if (result) {
      res
        .status(200)
        .json({ message: "Get all run successfully", data: result });
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (err) {
    res.status(500).json({ message: `ERROR: ${err}` });
  }
};

module.exports = { addRun, editRun, delRun, getAllRun, uploadRun };
