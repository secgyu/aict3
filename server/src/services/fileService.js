const fs = require("fs");
const path = require("path");

const jsonFilePath = path.join(__dirname, "..", "store", "imageData.json");
const uploadDir = path.join(__dirname, "..", "store", "images");

const loadJsonData = () => {
  if (!fs.existsSync(jsonFilePath)) {
    return [];
  }

  try {
    const jsonData = fs.readFileSync(jsonFilePath, "utf8").trim();
    return jsonData ? JSON.parse(jsonData) : []; // ✅ JSON이 비어 있어도 빈 배열 반환
  } catch (error) {
    console.error("🚨 JSON 파일 읽기 오류:", error);
    return [];
  }
};

const saveJsonData = (data) => {
  console.log("saveJsonData : ", data);
  try {
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("🚨 JSON 파일 저장 오류:", error);
  }
};

const generateSequentialId = () => {
  const existingData = loadJsonData();
  return existingData.length ? Math.max(...existingData.map((file) => file.sortId)) + 1 : 1;
};

const deleteFile = (filename) => {
  let existingData = loadJsonData();

  if (!Array.isArray(existingData)) {
    console.error("🚨 JSON 데이터가 배열이 아닙니다:", existingData);
    return { error: "Invalid JSON format" };
  }

  const fileIndex = existingData.findIndex((imageData) => imageData.filename === filename);

  if (fileIndex === -1) {
    return { error: "File not found" };
  }

  const filePath = path.join(uploadDir, path.basename(existingData[fileIndex].path));

  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
    } catch (error) {
      console.error("🚨 파일 삭제 오류:", error);
      return { error: "Error deleting file" };
    }
  }

  existingData.splice(fileIndex, 1);
  saveJsonData(existingData);
  return { message: "File deleted successfully" };
};

const updateFileSort = (newImageData) => {
  console.log("updateFileSort : ", newImageData);
  if (!Array.isArray(newImageData) || newImageData.length === 0) {
    return { error: "Invalid data format or empty array" };
  }
  saveJsonData(newImageData);

  return { message: "Sort order updated successfully" };
};

module.exports = {
  loadJsonData,
  saveJsonData,
  generateSequentialId,
  deleteFile,
  updateFileSort,
};
