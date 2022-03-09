// Models
const { User } = require("../models/user.model");
const { Address } = require("../models/address.model");
const { Post } = require("../models/post.model");
const { Comments } = require("../models/comment.models");

// Step 1: Establish model relations
const initModels = () => {
  // 1 User <---> 1 Address
  User.hasOne(Address); // user: { ..., address: { ..addressProps } }
  Address.belongsTo(User);

  // 1 User <---> M Posts
  User.hasMany(Post); // user: { ..., posts: [{}, {}, {}] }
  Post.belongsTo(User);

  // 1 Post <---> M Comment
  // Post.hasMany(Comments);
  // Comments.belongsTo(Post);

  // 1 User <---> M Comment
  User.hasMany(Comments);
  Comments.belongsTo(User);

  // Examples on how to define different types of relations
  // 1 User <----> M Address
  // User.hasMany(Address)
  // Address.belongsTo(User)

  // M User <----> M Address
  // User.hasMany(Address)
  // Address.belongsToMany(User)
};

module.exports = { initModels };
