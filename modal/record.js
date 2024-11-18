const mongoose = require("mongoose");
const { Schema } = mongoose;

const recordSchema = new Schema({
  latitude: Number,
  longitude: Number,
  additionalAddress: String,
  city: String,
  postcode: Number,
  loan: String,
  nominee: String,
  nomineeDOB: String,
  nomineeName: String,
  ownerName: String,
  propertyType: String,
  purchasedate: String,
  terms: String,
  title: String,
  totalPaid: Number,
  totalToBePaid: Number,
  propertyPaper: Object,
  adharCard: Object,
  panCard: Object,
});

exports.recordModel = mongoose.model("records", recordSchema);
