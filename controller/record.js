const model = require("../modal/record");
const Record = model.recordModel;



const multer = require("multer");

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads"); // Save files to ./uploads
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`); // Unique filename with timestamp
  },
});

exports.upload = multer({ storage });




exports.imgMiddleware = (req, res) => {
  console.log("API reached");
  console.log(req.body)
  console.log(req.files); // Array of uploaded files


  // code to store the data in the database
//   try {
//     const record = new Record(req.body);
//     record.save();
//     res.status(201).json(record);
//   } catch (err) {
//     res.sendStatus(400);
//   }
// };

  if (req.files && req.files.length > 0) {
    const fileLinks = req.files.map(
      (file) => `<img src="/uploads/${file.filename}" alt="img" />`
    );
    res.send(fileLinks.join(" ")); // Display all uploaded files as images
  } else {
    res.status(400).send("No files uploaded.");
  }
};

exports.get = (req, res) => {
  // const id=req.params.id
  res.json({ type: "get" });
};

exports.getAll = (req, res) => {
  res.json({ type: "get" });
};


exports.update = (req, res) => {
  res.json({ type: "patch" });
};
exports.deleteRecord = (req, res) => {
  res.json({ type: "delete" });
};
