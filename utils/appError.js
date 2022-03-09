class AppError extends Error {
  /**
   * hereda error, de derecha izquierda
   * y ahora si, se le dice a AppError que
   * sera tratada como una funcion  que ahora si
   * es de error
   */
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode; // numero
    this.message = message;
    this.status = `${statusCode}`.startsWith("4") ? "error" : "fall";
    /**
     * Si error empieza con 4 -- error del cliente
     * Si error empieza con 5 -- error de nosostros
     */
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { AppError };
