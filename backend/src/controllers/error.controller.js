const sendErrorProd = (err, res) => {
  if (err.isKnown) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log(`Error: `, err);

    res.status(500).json({
      status: "Error",
      message: `Something went wrong.` || JSON.stringify(err),
    });
  }
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || `Error`;

  if (process.env.NODE_ENV === "dev") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "prod") {
    let errCopy = { ...err };
    sendErrorProd(errCopy, res);
  }
};
