const Project = require("../models/project");
module.exports.getData = async (req, res) => {
  try {
    const project = await Project.find().limit(1).sort({ _id: -1 });
    // console.log("Data", project);
    return project;
  } catch (err) {
    return err;
  }
};

// const a = handleGetdata();
// console.log(a, "response");
