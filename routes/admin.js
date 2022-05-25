const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/", adminController.getUploadFile);

router.get("/delete_complete_db", adminController.getDbDeleted);

router.post("/", adminController.postUploadFile);

module.exports = router;
