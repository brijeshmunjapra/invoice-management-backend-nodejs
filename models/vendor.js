const mongoose = require("mongoose");

const vendorsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  additionalPhoneNumber: {
    type: String,
  },
  gstNumber: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  address: {
    type: String,
    minlength: 5,
    maxlength: 1024,
  },
});

const Vendor = mongoose.model("Vendor", vendorsSchema);

module.exports = Vendor;
