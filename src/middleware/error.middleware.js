function globalErrMiddleware(err, req, res, next) {
  console.log(err.cause);

  res.status(err.cause?.statusCode || 400).json({
    errMsg: err.message,
    stack: err.stack,
    err,
    cause: err.cause,
  });
}

export default globalErrMiddleware;
