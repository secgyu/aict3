const { Router } = require("express");
const displayController = require("../controllers/displayController");

const router = Router();

router.get("", displayController.getTransitionTimeController);
router.post("", displayController.setTransitionTimeController);

module.exports = router;
