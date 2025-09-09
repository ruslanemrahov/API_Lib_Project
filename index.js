const express = require("express");
const helmet = require("helmet");
const logger = require("./middlewares/logger");
const errorHandling = require("./middlewares/errorHandling");
const server = express();

server.use(logger);
const booksRouter = require("./routers/booksRouters");

server.use(express.json());
server.use(helmet());
server.use("/books", booksRouter);

server.get("/", (req, res) => {
  res.send("Hello From Express!");
});

server.use(errorHandling);

server.listen(5000, () => {
  console.log(`http://localhost:5000 is listening...`);
});
