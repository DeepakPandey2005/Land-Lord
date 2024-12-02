const mongoose = require("mongoose");
const { Schema } = mongoose;

const recordSchema = new Schema({
  email: { type: String, unique: false , required: true },
  latitude: Number,
  longitude: Number,
  additionalAddress: String,
  city: String,
  postcode: String,
  loan: String,
  nominee: String,
  nomineeDOB: String,
  nomineeName: String,
  ownerName: String,
  propertyType: String,
  purchaseDate: String,
  terms: String,
  title: String,
  totalPaid: Number,
  totalToBePaid: Number,
  documents: Object,
});
const dummySchema = new Schema({
  cityName: String,
  propertyName: String,
  address: String,
  latitude: String,
  longitude: String,
  propertyType: String,
  postCode: String,
  Image: String,
});
exports.recordModel = mongoose.model("records", recordSchema);
exports.dummyModel = mongoose.model("dummys", dummySchema);
