const mainRouter = require("express").Router();
const adminRouter = require("./adm.routes");
const projetsRouter = require("./projets.routes");

mainRouter.use("/admin", adminRouter);
mainRouter.use("/projets", projetsRouter);

module.exports = mainRouter;
