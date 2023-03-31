const express = require("express");
const router = express.Router();

const {
  getProjectData,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectControllers/project");

// import auth from "../middleware/auth";

router.get("/project", getProjectData);

router.post("/project", createProject);
router.put("/project/:id", updateProject);
router.delete("/project/:id", deleteProject);
module.exports = router;
