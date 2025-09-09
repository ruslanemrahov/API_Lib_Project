const db = require("./db-config");

module.exports = {
  findAuthors,
  addAuthor,
  updateAuthor,
  delAuthor,
  findAuthorsById,
};

function findAuthors() {
  return db("authors");
}

function findAuthorsById(id) {
  return db("authors").where({ id });
}

function addAuthor(newAuthor) {
  return db("authors")
    .insert(newAuthor)
    .returning("*")
    .then(([added]) => added);
}

function updateAuthor(updateAuthor, id) {
  return db("authors")
    .where({ id })
    .update(updateAuthor)
    .returning("*")
    .then(([updated]) => updated);
}

function delAuthor(id) {
  return db("authors").del().where({ id }).returning("*");
}
