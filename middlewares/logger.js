module.exports = (req, res, next) => {
  console.log(`${new Date().toUTCString()} - ${req.hostname} - ${req.method}`);
  next();
};
