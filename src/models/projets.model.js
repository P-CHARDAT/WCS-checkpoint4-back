const connection = require("../db-connection");

const findAll = () => {
  const sql = "SELECT * FROM projets";
  return connection.promise().query(sql);
};

const findOne = (id) => {
  const sql = "SELECT * FROM projets WHERE id=?";
  return connection.promise().query(sql, [id]);
};

const createOne = (projets) => {
  const sql = "INSERT INTO projets SET ?";
  return connection.promise().query(sql, [projets]);
};

const updateOne = (projets, id) => {
  const sql = "UPDATE projets SET ? WHERE id=?";
  return connection.promise().query(sql, [projets, id]);
};

const deleteOne = (id) => {
  const sql = "DELETE FROM projets WHERE id=?";
  return connection.promise().query(sql, [id]);
};

module.exports = { findAll, createOne, findOne, updateOne, deleteOne };
