const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { promisify } = require("util");

// models
const { User } = require("../models/user.model");

// utils
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

dotenv.config({ path: "./config.env" });

/**
 * Validaremos sesiones
 */
exports.validateSession = catchAsync(async (req, res, next) => {
  /*if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return next(new AppError(400, "Not a valid session"));
  } // validar
  */
  /**
   * Ahora vamos a extraer el token
   */
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError(401, "Invalid session"));
  }
  // verify that token is still valid
  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  console.table(decodedToken); // ver que devuelve

  const user = User.findOne({
    where: { id: decodedToken.id /*status: "active"*/ },
    attributes: {
      /**
       * metodos de findOne que nos ofrece, para excluir informacion
       * o mostrar cierta informacion
       * - se encierra en un arreglo, para que obtenga
       */
      // include: ["id", ""], // decirle que columnas incluya, o
      exclude: ["password"], // va a excluir el password
    },
  });

  console.log(user);
  // error del cliente por token invalido
  if (!user) {
    return next(new AppError(401, "This user is no longer available "));
  }

  next();
});
