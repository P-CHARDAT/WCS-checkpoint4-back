const projetsRouter = require("express").Router();

const {
  getProjects,
  createOneProject,
  updateOneProject,
  deleteOneProject,
  addImg,
} = require("../controllers/projets.controllers");

projetsRouter.get("/", getProjects);
projetsRouter.get("/:id", getProjects);
// projetsRouter.post("/", addImg, createOneProject, getProjects);
projetsRouter.post("/", createOneProject, getProjects);
projetsRouter.put("/:id", updateOneProject, getProjects);
projetsRouter.delete("/:id", deleteOneProject);

module.exports = projetsRouter;
