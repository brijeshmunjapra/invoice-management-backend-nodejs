const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  invoiceNo: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  vendor: {
    type: String,
    required: true,
  },
  projects: {
    type: Array,
    required: true,
  },
  invoiceAmounts: {
    type: Array,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
