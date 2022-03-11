const express = require("express");

// Controllers
const {
  createUser,
  getUserById,
  getUsers,
  loginUser,
} = require("../controllers/users.controller");

const router = express.Router();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/", createUser);

router.post("/login", loginUser);

module.exports = { userRouter: router };
