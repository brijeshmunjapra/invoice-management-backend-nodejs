const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const vendorController = require("../controllers/vendorControllers/vendor");

router.get("/vendor", vendorController.getVendorsData);
router.get("/vendor/:id", vendorController.getVendorDataById);
router.post("/vendor", vendorController.createVendor);
router.put("/vendor/:id", vendorController.updateVendor);
router.delete("/vendor/:id", vendorController.deleteVendor);

module.exports = router;
