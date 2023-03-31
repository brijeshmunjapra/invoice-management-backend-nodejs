const Project = require("../../models/project");
const { getData } = require("../../utils/helper");

module.exports.getProjectData = async (req, res) => {
  try {
    const project = await Project.find({});

    return res.status(200).json(project);
  } catch (err) {
    return res.status(422).send(err);
  }
};

module.exports.createProject = async (req, res) => {
  let data;
  await getData().then((res) => {
    console.log("res", "indise then");
    data = res;
  });

  console.log(data[0]?.invoiceNo, "target");
  try {
    // Get project input
    const { name, subVendor, startDate, endDate, amount, paidAmount, status } =
      req.body;

    // Validate project input
    if (
      !(
        name &&
        subVendor &&
        startDate &&
        endDate &&
        (amount === 0 || amount) &&
        (paidAmount === 0 || paidAmount) &&
        (status || !status)
      )
    ) {
      return res
        .status(400)
        .send(
          "name, subVendor, startDate, endDate, amount, paidAmount, status are required!"
        );
    }

    // check if project already exist
    // Validate if project exist in our database
    const oldProject = await Project.findOne({ name });

    if (oldProject) {
      return res.status(409).send("Project Already Exist!");
    }

    // Create vendor in our database
    const project = await Project.create({
      name,
      subVendor,
      startDate,
      endDate,
      amount,
      paidAmount,
      status,
      invoiceNo: data[0]?.invoiceNo == null ? 1 : data[0]?.invoiceNo + 1,
    });

    // return new user

    return res.status(201).json(project);
  } catch (err) {
    if (err) {
      if (err.name === "MongoServerError" && err.code === 11000) {
        return res.status(422).send("Project already exist!");
      } else {
        return res.status(422).send(err);
      }
    }
  }
};

module.exports.updateProject = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  await Project.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Project not found.`,
        });
      } else {
        res.send({ message: "Project data updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

module.exports.deleteProject = async (req, res) => {
  await Project.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Project not found.`,
        });
      } else {
        res.send({
          message: "Project deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
