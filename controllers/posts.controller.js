const { Post } = require("../models/post.model");
const { ref, uploadBytes } = require("../utils/firebsase");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();

    res.status(200).json({
      status: "success",
      data: { posts },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findOne({ where: { id } });

    res.status(200).json({
      status: "success",
      data: { post },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    // console.log(req.body);

    // console.table(req.file);

    // add error

    const imgRef = ref(storage, req.file.originalname);

    const result = uploadBytes(imgRef, req.file);

    const newPost = await Post.create({
      title,
      content,
      userId,
      imgURL: req.file.path,
    });

    res.status(201).json({
      status: "success",
      data: { newPost },
    });
  } catch (error) {
    console.log(error);
  }
};
