export const error = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
  });
};

export const pageNotFound = (req, res, next) => {
  const error = new Error("Page Not Found");
  res.status(404);
  next(error);
};
