module.exports = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    error: err.errorMessage || "Internal Server Error",
    path: req.originalUrl,
    time: new Date().toISOString(),
  });
};
