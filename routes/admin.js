const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/", adminController.getUploadFile);

router.post("/", adminController.postUploadFile);

module.exports = router;
