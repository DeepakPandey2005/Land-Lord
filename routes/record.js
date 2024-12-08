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
  getAllSellData,
  deleteSellRecord,
  getWorkerData
} = require("../controller/record");

router.get("/dummys", getDummyRecords);
router.get("/workers", getWorkerData);
router.get("/:email", getAll);
router.post("/", upload.array("avatar", 3), imgMiddleware);
router.patch("/:id", update);
router.delete("/:id", deleteRecord);
router.delete("/sell/:id", deleteSellRecord);

router.post("/sell", sellData);
router.get("/sell/records/:email", getSellData);
router.get("/sell/records", getAllSellData);
exports.router = router;
