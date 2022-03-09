const { User } = require("../models/user.model");
const { Address } = require("../models/address.model");
const { Post } = require("../models/post.model");
const { Comments } = require("../models/comment.models");

//captura errors
/**
 * es una funcion que recibe otra funcion
 * retorna otra funcion
 */

//Utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

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

  const newUser = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    status: "success",
    data: { newUser },
  });
});
