const Invoice = require("../../models/invoice");
const { getData } = require("../../utils/helper");

module.exports.getInvoiceData = async (req, res) => {
  try {
    const invoice = await Invoice.find({});

    return res.status(200).json(invoice);
  } catch (err) {
    return res.status(422).send(err);
  }
};

module.exports.createInvoice = async (req, res) => {
  try {
    // Get project input
    const { invoiceNo, date, vendor, projects, invoiceAmounts, totalAmount } =
      req.body;

    // Validate project input
    if (
      !(
        invoiceNo &&
        date &&
        vendor &&
        projects &&
        invoiceAmounts &&
        totalAmount
      )
    ) {
      return res
        .status(400)
        .send(
          "invoiceNo, date, vendor, projects, invoiceAmounts, totalAmount are required!"
        );
    }

    // check if project already exist
    // Validate if project exist in our database
    const oldInvoice = await Invoice.findOne({ invoiceNo });

    if (oldInvoice) {
      return res.status(409).send("This invoice number is already exist!");
    }

    // Create vendor in our database
    const invoice = await Invoice.create({
      invoiceNo,
      date,
      vendor,
      projects,
      invoiceAmounts,
      totalAmount,
    });

    // return new user

    return res.status(201).json(invoice);
  } catch (err) {
    if (err) {
      if (err.name === "MongoServerError" && err.code === 11000) {
        return res.status(422).send("Invoice already exist!");
      } else {
        return res.status(422).send(err);
      }
    }
  }
};

// module.exports.updateProject = async (req, res) => {
//   if (!req.body) {
//     res.status(400).send({
//       message: "Data to update can not be empty!",
//     });
//   }

//   const id = req.params.id;

//   await Project.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message: `Project not found.`,
//         });
//       } else {
//         res.send({ message: "Project data updated successfully." });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message,
//       });
//     });
// };

// module.exports.deleteProject = async (req, res) => {
//   await Project.findByIdAndRemove(req.params.id)
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message: `Project not found.`,
//         });
//       } else {
//         res.send({
//           message: "Project deleted successfully!",
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message,
//       });
//     });
// };
