const express = require("express");

// Controllers
const {
  getPosts,
  getPostById,
  createPost,
} = require("../controllers/posts.controller");

const { upload } = require("../utils/multer");

const router = express.Router();

router.get("/", getPosts);

router.get("/:id", getPostById);

router.post("/", upload.single("postImag"), createPost);

// router.post("/", createPost);

module.exports = { postsRouter: router };
