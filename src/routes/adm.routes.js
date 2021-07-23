const adminRouter = require("express").Router();

const {
  createToken,
  authTokenFromCookie,
  refreshToken,
} = require("../controllers/jwt.controllers.js");
const {
  getAdmins,
  createOneAdmin,
  updateOneAdmin,
  verifyCredentials,
  deleteOneAdmin,
  ContactEmail,
} = require("../controllers/adm.controllers.js");

adminRouter.get("/", getAdmins);
adminRouter.get("/:id", getAdmins);
adminRouter.post("/", createOneAdmin, getAdmins);
adminRouter.post("/contact", ContactEmail);
adminRouter.put("/:id", updateOneAdmin, getAdmins);
adminRouter.delete("/:id", deleteOneAdmin);

adminRouter.post("/login", verifyCredentials, createToken);

adminRouter.post("/refresh", refreshToken);

module.exports = adminRouter;
