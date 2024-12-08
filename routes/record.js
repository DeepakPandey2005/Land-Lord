const express = require("express");
const router = express.Router();
const {
  getAll,
  update,
  deleteRecord,
  imgMiddleware,
  upload,
  getDummyRecords,
  sellData,
  getSellData,
  deleteSellRecord,
} = require("../controller/record");

router.get("/dummys", getDummyRecords);
router.get("/:email", getAll);
// Handle multiple file uploads for the 'profile' field (up to 5 files)
router.post("/", upload.array("avatar", 3), imgMiddleware);
router.patch("/:id", update);
router.delete("/:id", deleteRecord);
router.delete("/sell/:id", deleteSellRecord);

router.post("/sell", sellData);
router.get("/sell/records", getSellData);
exports.router = router;
