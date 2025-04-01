const fs = require("fs");
const path = require("path");
const fileService = require("../services/fileService");

const uploadDir = path.join(__dirname, "..", "store", "images");
const jsonFilePath = path.join(__dirname, "..", "store", "imageData.json");

const uploadFileController = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.status(200).json({
    message: "File store successfully",
    ...req.imageData,
  });
};

const getFilesController = (req, res) => {
  const data = fileService.loadJsonData();

  if (!Array.isArray(data)) {
    console.error("JSON 데이터가 배열이 아닙니다:", data);
    return res.status(500).json({ error: "Invalid JSON format" });
  }

  res.set("Cache-Control", "no-store");
  res.json(data);
};

const deleteFileController = (req, res) => {
  const { filename } = req.params;

  if (!filename) {
    return res.status(400).json({ error: "Filename is required" });
  }

  const result = fileService.deleteFile(filename);
  if (result.error) return res.status(404).json(result);

  res.status(200).json(result);
};

const updateFileController = (req, res) => {
  console.log("updateFileController", req.body);
  const result = fileService.updateFileSort(req.body);
  if (result.error) return res.status(400).json(result);
  res.status(200).json(result);
};

module.exports = {
  uploadFileController,
  getFilesController,
  deleteFileController,
  updateFileController,
};
