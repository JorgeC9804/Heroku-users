const globalErrorHandler = (err, req, res, next) => {
  /**
   * Hasta que se manden los 4 argumentos
   * osea (err, req, res, next)
   * entonces el error va a ejecutarse
   */
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
  console.log(err);
  console.log("Error handling");

  /**
   * en routes se va a buscar e siguiente middleware
   * cuando no lo encuentre, se va a ir a un nivel arriba
   * para salir directamente a app.uss()
   * y de aqui va a buscar al siguente middleware
   * - ya que es una funcion de node js -
   * y ejecutara este error
   */
};

module.exports = { globalErrorHandler };
