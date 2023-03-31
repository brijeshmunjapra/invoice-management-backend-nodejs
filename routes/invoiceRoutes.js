const express = require("express");
const router = express.Router();

const {
  createInvoice,
  getInvoiceData,
} = require("../controllers/invoiceController/invoice");

// import auth from "../middleware/auth";

router.post("/invoice", createInvoice);
router.get("/invoice", getInvoiceData);

module.exports = router;
