const connection = require("../db-connection");
const argon2 = require("argon2");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};
// Fonction to encrypt the admin Password
const hashPassword = (password) => {
  return argon2.hash(password, hashingOptions);
};
const verifyPassword = (hashedPassword, password) => {
  return argon2.verify(hashedPassword, password, hashingOptions);
};

const findAll = (decroissant) => {
  const sql = "SELECT * FROM adm ";
  return connection.promise().query(sql);
};

const findOne = (id) => {
  const sql = "SELECT * FROM adm WHERE id=?";
  return connection.promise().query(sql, [id]);
};

const createOne = (projet) => {
  const sql = "INSERT INTO adm SET ?";
  return connection.promise().query(sql, [projet]);
};

const updateOne = (projet, id) => {
  const sql = "UPDATE adm SET ? WHERE id=?";
  return connection.promise().query(sql, [projet, id]);
};

const deleteOne = (id) => {
  const sql = "DELETE FROM adm WHERE id=?";
  return connection.promise().query(sql, [id]);
};

const verifyEmail = (mail) => {
  const sql = "SELECT * FROM adm WHERE mail= ?";
  return connection.promise().query(sql, [mail]);
};

module.exports = {
  hashPassword,
  verifyPassword,
  findAll,
  findOne,
  createOne,
  updateOne,
  deleteOne,
  verifyEmail,
};
