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
adminRouter.post("/", authTokenFromCookie, createOneAdmin, getAdmins);
adminRouter.post("/contact", ContactEmail);
adminRouter.put("/:id", authTokenFromCookie, updateOneAdmin, getAdmins);
adminRouter.delete("/:id", authTokenFromCookie, deleteOneAdmin);

adminRouter.post("/login", verifyCredentials, createToken);

adminRouter.post("/refresh", authTokenFromCookie, refreshToken);

module.exports = adminRouter;
