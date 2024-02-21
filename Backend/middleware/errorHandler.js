const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
  
    switch (statusCode) {
      case 400:
        res.json({
          title: "VALIDATION ERROR",
          message: err.message,
        });
        break;
      case 404:
        res.json({
          title: "PAGE NOT FOUND",
          message: err.message,
        });
        break;
      case 401:
        res.json({
          title: "UNAUTHORIZED ERROR",
          message: err.message,
        });
        break;
      case 403:
        res.json({
          title: "FORBIDDEN ERROR",
          message: err.message,
        });
        break;
      case 500:
        res.json({
          title: "SERVER ERROR",
          message: err.message,
        });
        break;
    }
  };
  
  module.exports = errorHandler