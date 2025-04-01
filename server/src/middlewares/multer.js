const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = path.join(__dirname, "..", "store", "images");
const jsonFilePath = path.join(__dirname, "..", "store", "imageData.json");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const loadJsonData = () => {
  if (!fs.existsSync(jsonFilePath)) {
    return [];
  }

  try {
    const jsonData = fs.readFileSync(jsonFilePath, "utf8").trim();
    return jsonData ? JSON.parse(jsonData) : [];
  } catch (error) {
    console.error("JSON 파일 읽기 오류:", error);
    return [];
  }
};

const saveJsonData = (data) => {
  try {
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("JSON 파일 저장 오류:", error);
  }
};

const generateSequentialId = () => {
  const existingData = loadJsonData();

  if (!Array.isArray(existingData) || existingData.length === 0) {
    return 1;
  }

  const maxId = Math.max(...existingData.map((item) => item.sortId || 1)); // sortId가 없으면 최소값 1
  return maxId + 1;
};

const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    const name = encodeURIComponent(safeName);
    cb(null, `${uniqueSuffix}-${"abc"}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    return cb(new Error(`허용되지 않은 파일 형식입니다: ${ext}`), false);
  }
  cb(null, true);
};

const crypto = require("crypto");
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 제한
  fileFilter,
});

const saveImageData = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const sortId = generateSequentialId();

  const extension = path.extname(req.file.filename);
  const newEntry = {
    id: sortId,
    path: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    filename: req.file.filename,
  };

  const existingData = loadJsonData();
  existingData.push(newEntry);
  saveJsonData(existingData);

  req.imageData = newEntry;

  next();
};

const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: `파일 업로드 오류: ${err.message}` });
  }
  next(err);
};

module.exports = {
  upload,
  saveImageData,
  handleMulterError,
};
