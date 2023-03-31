const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  subVendor: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paidAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  invoiceNo: {
    type: Number,
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
