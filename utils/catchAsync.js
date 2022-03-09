const catchAsync = fn => {
  // libera al codigo de try catch y los sustituye
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = { catchAsync };
