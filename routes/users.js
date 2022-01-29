const express = require("express");
const { userCreate, userGetAll } = require("../controllers/user-controller");
const { uploadLocal, uploadCloud } = require("../middlewares/file-upload");
const router = express.Router();

router.post("/", uploadCloud("img"), userCreate);
router.get("/", userGetAll);

module.exports = router;
