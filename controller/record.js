const multer = require("multer");
const Record = require("../modal/record").recordModel; // Ensure correct path and model usage
const dummyRecord = require("../modal/record").dummyModel;
const sellRecord = require("../modal/record").sellModel;

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Save files to ./uploads
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename with timestamp
  },
});

exports.upload = multer({ storage });

exports.imgMiddleware = async (req, res) => {
  try {
    const { body, files } = req;

    if (!files || files.length < 3) {
      return res.status(400).send("Please upload all 3 required files.");
    }

    // Map files to retrieve important data
    const [propertyPaper, adharCard, panCard] = files.map((file) => ({
      path: file.path,
      name: file.originalname,
    }));

    // Create a new record with form data and file details
    const record = new Record({
      ...body,
      documents: {
        propertyPaper,
        adharCard,
        panCard,
      },
    });

    // Save to MongoDB
    await record.save();

    res.status(201).json({ message: "Record created successfully", record });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ message: "Failed to save record", error: err.message });
  }
};

// Additional CRUD Operations

// Get a specific record
// Get all records
exports.getAll = async (req, res) => {
  const email = req.params.email;
  try {
    const records = await Record.find({ email: email });
    res.json(records);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching records", error: err.message });
  }
};

// Update a specific record
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const updatedRecord = await Record.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "Record updated successfully", updatedRecord });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating record", error: err.message });
  }
};

// Delete a specific record
exports.deleteRecord = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedRecord = await Record.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "Record deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting record", error: err.message });
  }
};

exports.getDummyRecords = async (req, res) => {
  try {
    const record = await dummyRecord.find();
    res.status(200).json(record);
    console.log(record);
  } catch (err) {
    res.status(501).json(err);
  }
};

exports.sellData = async (req, res) => {
  try {
    const { body, file } = req;
    const { contactDetails, email } = body;
    const photo = file ? file.path : null;

    const record = new sellRecord({
      ...body,
      contactDetails,
      email,
      photo,
    });

    await record.save();

    res
      .status(201)
      .json({ message: "Sell record created successfully", record });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ message: "Failed to save sell record", error: err.message });
  }
};

exports.getSellData = async (req, res) => {
  try {
    const records = await sellRecord.find();

    if (!records || records.length === 0) {
      return res.status(404).json({ message: "No sell records found" });
    }

    res.status(200).json(records);
    console.log("Sell Records Retrieved:", records);
  } catch (err) {
    console.error("Error fetching sell records:", err);
    res
      .status(500)
      .json({ message: "Error fetching sell records", error: err.message });
  }
};

exports.deleteSellRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRecord = await sellRecord.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({ message: "Sell record not found" });
    }

    res
      .status(200)
      .json({ message: "Sell record deleted successfully", deletedRecord });
  } catch (err) {
    console.error("Error deleting sell record:", err);
    res
      .status(500)
      .json({ message: "Error deleting sell record", error: err.message });
  }
};
