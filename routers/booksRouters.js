const express = require("express");
const router = express.Router();
const Author = require("../data/data-model");

router.get("/", (req, res, next) => {
  Author.findAuthors()
    .then((authors) => {
      res.status(200).json(authors);
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Can't get authors",
        error,
      });
    });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return next({
      statusCode: 400,
      errorMessage: "ID must be number!",
    });
  } 
  Author.findAuthorsById(id)
    .then((foundAuthor) => {
      if (foundAuthor.length) {
        res.status(200).json(foundAuthor[0]);
      } else {
        res.status(404).json({ errorMessage: "Author not found" });
      }
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Error when get author",
        error,
      });
    });
});

router.post("/", (req, res, next) => {
  const newAuthor = req.body;
  if (!newAuthor.author) {
    next({
      statusCode: 400,
      errorMessage: "You need to add name for adding author.",
    });
  } else {
    Author.addAuthor(newAuthor)
      .then((added) => {
        res.status(201).json(added);
      })
      .catch((error) => {
        next({
          statusCode: 500,
          errorMessage: "Error when get authors",
          error,
        });
      });
  }
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;

  Author.delAuthor(id)
    .then((deleted) => {
      if (deleted.length === 0) {
        return res.status(404).json({
          errorMessage: "Author not found",
        });
      }
      res.status(200).json({
        message: "Author deleted successfully",
        deleted,
      });
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Error when deleting author",
        error,
      });
    });
});

router.patch("/:id", (req, res, next) => {
  const { id } = req.params;
  const updateAuthor = req.body;

  if (!updateAuthor.author) {
    return next({
      statusCode: 400,
      errorMessage: "You need to provide author name for updating.",
    });
  }
  Author.updateAuthor(updateAuthor, id)
    .then((updated) => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "Author not found" });
      }
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Error when updating author",
        error,
      });
    });
});

module.exports = router;
