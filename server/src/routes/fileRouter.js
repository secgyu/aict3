const { Router } = require("express");
const fileController = require("../controllers/fileController.js");
const { upload, saveImageData, handleMulterError } = require("../middlewares/multer");

const router = Router();

router.post("", upload.single("file"), saveImageData, handleMulterError, fileController.uploadFileController);

router.get("", fileController.getFilesController);

router.delete("/delete/:filename", fileController.deleteFileController);

router.post("/update", fileController.updateFileController);

module.exports = router;
