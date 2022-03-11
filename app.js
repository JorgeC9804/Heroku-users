const express = require("express");

// Routers
const { userRouter } = require("./routes/users.routes");
const { postsRouter } = require("./routes/posts.routes");
const { addressRouter } = require("./routes/address.routes");
const { commentRouter } = require("./routes/comment.routes");

// Error
const { globalErrorHandler } = require("./controllers/error.controller");

// Implement cors
const cors = require("cors");

// Utils
const { AppError } = require("./utils/appError");

// Init express app
const app = express();

// Enable cors
app.use(cors());

// Enable JSON incoming data
app.use(express.json());

// Middlewares

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/address", addressRouter);
app.use("/api/v1/comment", commentRouter);

app.use("*", (req, res, next) => {
  // console.log("Not valid URL");
  next(new AppError(404, `${req.originalUrl} not found in this server`));
});

// Error handler (err -> AppError)
app.use(globalErrorHandler);

module.exports = { app };
// API features:

// Create users
// Give the user an address
// Allow the user to create posts

// Relations explaination

// 1 User <---> 1 Address
// 1 User <---> M Posts

// Endpoints to apply relations

// GET /users -> users { address, posts: [] }
// GET /address -> address {..., user}
// GET /posts -> posts {..., user}
