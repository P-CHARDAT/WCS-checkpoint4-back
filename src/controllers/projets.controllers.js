const Joi = require("joi");

const {
  findAll,
  createOne,
  findOne,
  updateOne,
  deleteOne,
} = require("../models/projets.model");

const multer = require("multer");

async function awesomeDataHandler(promise) {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
}

const getProjects = async (req, res) => {
  const id = req.projetId ? req.projetId : req.params.id;
  if (id) {
    const [data, error] = await awesomeDataHandler(findOne(id));
    if (data) {
      console.log(data[0]);
      return data[0].length
        ? res.json(data[0][0])
        : res.status(404).send("Project not found");
    }
    return res.status(500).send(error.message);
  }
  const [data, error] = await awesomeDataHandler(findAll());
  return data ? res.json(data[0]) : res.status(500).send(error);
};

const createOneProject = async (req, res, next) => {
  const { link, title, description, type, technos, date, img_src } = req.body;

  let validationData = null;
  validationData = Joi.object({
    link: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string(),
    type: Joi.string(),
    technos: Joi.string(),
    date: Joi.string(),
    img_src: Joi.string(),
  }).validate(
    { link, title, description, type, technos, date, img_src },
    { abortEarly: false }
  ).error;
  if (validationData) {
    res.status(500).send(`${[validationData]} Data Invalid`);
  } else {
    const project = {
      link,
      title,
      description,
      type,
      technos,
      date,
      img_src,
    };
    const [data, error] = await awesomeDataHandler(createOne(project));
    if (data) {
      req.projetId = [data].insertId;
      return next(req.projetId);
    }
    return res.status(500).send(error);
  }
};

const updateOneProject = async (req, res, next) => {
  const { link, title, description, type, technos, date, img_src } = req.body;

  let validationData = null;
  validationData = Joi.object({
    link: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string(),
    type: Joi.string(),
    technos: Joi.string(),
    date: Joi.string(),
    img_src: Joi.string(),
  }).validate(
    { link, title, description, type, technos, date, img_src },
    { abortEarly: false }
  ).error;
  if (validationData) {
    res.status(500).send("Invalid data");
  } else {
    const project = {
      link,
      title,
      description,
      type,
      technos,
      date,
      img_src,
    };
    const [data, error] = await awesomeDataHandler(
      updateOne(project, req.params.id)
    );
    if (data) {
      req.projetId = [data].insertId;
      return next(req.projetId);
    }
    return res.status(500).send(error);
  }
};

const deleteOneProject = async (req, res) => {
  const [data, error] = await awesomeDataHandler(deleteOne(req.params.id));
  console.log(data, "data de delete Adm");
  return data ? res.sendStatus(204) : res.status(500).send(error.message);
};

// Middleware pour multer
const addImg = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/assets");
    },
    filename: (_, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage }).single("file");
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      console.log(req.file);
      console.log(req.body.configuration, "config multer");
      const configuration = JSON.parse(req.body.configuration);
      req.image = {
        img_src: req.file.filename,
        alt: configuration.alt,
        // dimension: configuration.dimension,
      };
      return next();
    }
  });
};

module.exports = {
  getProjects,
  createOneProject,
  updateOneProject,
  deleteOneProject,
  addImg,
};
