const express = require("express");
const bodyParser = require("body-parser");
const fileRouter = require("./routes/fileRouter.js");
const displayRouter = require("./routes/displayRouter.js");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());

app.use("/images", express.static(path.join(__dirname, "store", "images")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/files", fileRouter);
app.use("/display-settings", displayRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
