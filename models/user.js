const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  address: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  gstNumber: {
    type: String,
    required: false,
  },
  gstValue: {
    type: Number,
    required: false,
  },
  cgstValue: {
    type: Number,
    required: false,
  },
  sgstValue: {
    type: Number,
    required: false,
  },
  token: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
