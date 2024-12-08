const mongoose = require("mongoose");
const { Schema } = mongoose;

const recordSchema = new Schema({
  email: { type: String,required: true },
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

const sellSchema = new Schema({
  email:String,
  latitude: Number,
  longitude: Number,
  additionalAddress: String,
  city: String,
  postcode: String,
  nominee: String,
  nomineeDOB: String,
  nomineeName: String,
  ownerName: String,
  propertyType: String,
  purchaseDate: String,
  terms: String,
  title: String,
});
const workerSchema= new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  designation: {
    type: String,
    required: true,
  },
  experience_years: {
    type: Number,
    required: true,
    min: 0,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  per_hour_fees: {
    type: Number,
    required: true,
    min: 1000,
    max: 2000,
  },
  contact_no: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  gender: {
    type: String,
    required: true,
  },
})
exports.recordModel = mongoose.model("record", recordSchema);
exports.dummyModel = mongoose.model("dummys", dummySchema);
exports.sellModel = mongoose.model("selldata", sellSchema);
exports.workerModel = mongoose.model("worker", workerSchema);
