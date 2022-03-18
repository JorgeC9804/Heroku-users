const express = require("express");
const { validateSession } = require("../middlewares/auth.middleware");

// Controllers
const {
  createUser,
  getUserById,
  getUsers,
  loginUser,
} = require("../controllers/users.controller");

/**
 * Se ejecutan de izquierda a derecha
 */

const router = express.Router();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/", createUser);

router.post("/login", loginUser);

module.exports = { userRouter: router };
