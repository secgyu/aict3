const fs = require("fs");
const path = require("path");

const getTransitionTimeController = (req, res) => {
  const dataFilePath = path.join(__dirname, "..", "store", "displayTransitionTime.json");

  try {
    const configData = fs.readFileSync(dataFilePath, "utf8");
    const config = JSON.parse(configData);
    res.send({ count: config.delaySec });
  } catch (err) {
    console.error("Error reading config file:", err);
    res.status(500).send({ message: "Failed to read delay time." });
  }
};

const setTransitionTimeController = (req, res) => {
  const { count } = req.body; // 요청 본문에서 count 값을 가져옴
  const dataFilePath = path.join(__dirname, "..", "store", "displayTransitionTime.json");

  try {
    const configData = fs.readFileSync(dataFilePath, "utf8");
    const config = JSON.parse(configData);

    config.delaySec = count;

    fs.writeFileSync(dataFilePath, JSON.stringify(config, null, 4), "utf8");
    res.send({ message: "Delay time updated successfully!" });
  } catch (err) {
    console.error("Error updating config file:", err);
    res.status(500).send({ message: "Failed to update delay time." });
  }
};

module.exports = {
  getTransitionTimeController,
  setTransitionTimeController,
};
