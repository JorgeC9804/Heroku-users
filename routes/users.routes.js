const express = require("express");
const { validateSession } = require("../middlewares/auth.middleware");

// Controllers
const {
  createUser,
  getUserById,
  getUsers,
  loginUser,
  logUser,
} = require("../controllers/users.controller");

/**
 * Se ejecutan de izquierda a derecha
 */

const router = express.Router();

router.get("/", getUsers);

router.get("/:id", validateSession, getUserById);

router.post("/", createUser);

router.post("/login", loginUser);

/**
 * My start
 */
router.post("/login-res", logUser);

module.exports = { userRouter: router };
