const Vendor = require("../../models/vendor");

module.exports.getVendorsData = async (req, res) => {
  try {
    const vendor = await Vendor.find({});
    return res.status(200).json(vendor);
  } catch (err) {
    return res.status(422).send(err);
  }
};
module.exports.getVendorDataById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    res.status(200).json(vendor);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
module.exports.createVendor = async (req, res) => {
  try {
    // Get vendor input
    const {
      name,
      email,
      phoneNumber,
      additionalPhoneNumber,
      gstNumber,
      address,
    } = req.body;

    // Validate vendor input
    if (!(email && phoneNumber && name && gstNumber && address)) {
      return res
        .status(400)
        .send("name, email, phoneNumber, gstNumber, address are required!");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldVendor = await Vendor.findOne({ email });

    if (oldVendor) {
      return res.status(409).send("Vendor Already Exist!");
    }

    // Create vendor in our database
    const vendor = await Vendor.create({
      name,
      email,
      phoneNumber,
      additionalPhoneNumber,
      gstNumber,
      address,
    });

    // return new user
    return res.status(201).json(vendor);
  } catch (err) {
    if (err) {
      if (err.name === "MongoServerError" && err.code === 11000) {
        return res.status(422).send("Vendor already exist!");
      } else {
        return res.status(422).send(err);
      }
    }
  }
};

module.exports.updateVendor = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  await Vendor.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Vendor not found.`,
        });
      } else {
        res.send({ message: "Vendor data updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

module.exports.deleteVendor = async (req, res) => {
  await Vendor.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Vendor not found.`,
        });
      } else {
        res.send({
          message: "Vendor deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
