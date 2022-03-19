const { User } = require("../models/user.model");
const { Address } = require("../models/address.model");
const { Post } = require("../models/post.model");
const { Comments } = require("../models/comment.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

//captura errors
/**
 * es una funcion que recibe otra funcion
 * retorna otra funcion
 */

//Utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

dotenv.config({ path: "./config.env" });

exports.getUsers = catchAsync(async (req, res, next) => {
  // SELECT * FROM users
  // JOIN address ON users.id = addresses.userId
  // JOIN posts ON posts.userId = users.id

  // Step 2: Use the attribute include
  const users = await User.findAll({
    include: [
      {
        model: Address /*include: [
					{ 
						model: Comments,
						include: [{ model: User }]
					}
				]*/,
      },
      /*{ model: Comments, include: [{ model: Post }] }, 
			{ model: Post }*/
    ],
    /**
     * al momento de agregar a include ay que asegurarnos
     */
  });

  res.status(200).json({
    status: "success",
    data: { users },
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id } });

  if (!user) {
    return next(new AppError(404, "User not found"));
    /**
     * esto se encapsula en next
     * el cual nos va a indicar que pasemos al
     * siguiente middleware
     * -- Enseguida catchAsync nos va a devolver
     * mediante su metodo catch(next) a next
     * el cual, una vez mas, ya le indicamos
     * que nos devuelva un error
     * (new AppError)
     *
     * ---
     *
     * catch no se va a ejectar a menos que
     * detecte que next esta siendo llamado.
     * Si next no esta siendo llamado, osea si
     * existe un usuario, no tiene porque ejecutarse next.
     * asi no se activara catch, ya que catch
     * siempre esta a la espera de ejecutarse
     */
    // throw Error("User not found");
    /**
     * throw solo sirve con error
     * y funciona como return
     * corta en seco el programa
     */
  }

  user.password = undefined;

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return new AppError(400, "Must provide a valid name, email and password");
  }

  const salt = await bcrypt.genSalt(12);

  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    /**
     * a create le pasamos los parametros y le indicamos
     * que password tendra una password encriptado
     */
  });
  /**
   * Es una referencia, no la informacion como tal
   * por eso podemos ocultar o poner undefined, o asignar
   * para quitar la propiedad
   */

  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    data: { newUser },
  });
});

exports.logUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body.login;
  console.log(req.body.login);

  const user = await User.findOne({
    where: { email },
    // ocurre un error al excluir password
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError(404, "Credential are invalid"));
  }

  user.password = undefined;

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  /**
   * Primero vamos a corregir alguna ideas erroneas que tenemso
   * Post no es para guardar informacion, post nos ayuda a capturar informacion
   * no necesariamente es para crear nueva informacion
   * En este punto, se ingresara informacion desde el cliente, y se utilizara axios para
   * capturar esa informacion y mandarla mediante los parametros de axios que accede a nuestro
   * backend.
   * Al mismo tiempo nuestro backend hara una peticion a la base de datos para indicarle que
   * compare los datos ingresados
   * con la informacion que tiene guardada
   * Comparar email database con email ingresado
   * pass1234 === $ddnj3jdnjldlaauwbnWAFRKJe
   */

  const { email, password } = req.body;

  console.log(req.body);
  // Find user given an email and has status active
  const user = await User.findOne({
    where: { email },
    // where: { email, status: "active" },
    /**
     * Si encontramos a email, es porque existe esa informacion
     * y nos almacena en user toda la informacion
     * { user, password, email } = user;
     * o de igal forma acceder direccto con user
     * user.user, user.password, user.email
     */
    // attributes: { exclude: ["password"] }, // va a excluir el password
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError(404, "Credential are invalid"));
  }

  /* */
  if (!user) {
    return next(new AppError(404, "Email invalid"));
  }

  // Compare entered password vs hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return next(new AppError(400, "Password is not valid"));
  }

  /**/

  // Generate credential that validates user session (token)
  // 1. Validate session
  // 2. Grant access a certain parts of our API
  // 3. Restrict access

  // Create jwt
  /**
   * user.id
   */
  //                     forma: string
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  jwt.verify(token, process.env.JWT_SECRET);

  res.status(200).json({
    status: "success",
    data: { token },
  });
});
