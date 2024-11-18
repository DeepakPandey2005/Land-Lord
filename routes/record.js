const express = require("express");
const router = express.Router();
const {
  get,
  getAll,
  create,
  update,
  deleteRecord,
  imgMiddleware,
  upload
} = require("../controller/record");


// Updated Routes
router.get("/", getAll);

// Handle multiple file uploads for the 'profile' field (up to 5 files)
router.post("/", upload.array("avatar", 3), imgMiddleware);
// router.post("/", create);
router.get("/:id", get);
router.patch("/", update);
router.delete("/", deleteRecord);

exports.router = router;
