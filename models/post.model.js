const { DataTypes } = require("sequelize");

// Utils
const { sequelize } = require("../utils/database");

const Post = sequelize.define("post", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false, // NOT NULL
  },
  content: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  imgURL: {
    type: DataTypes.STRING(255),
    allowNull: true,
    // avisamos que la imagen no es obligatoria
    /**
     * multer necesita trabajar con form-data
     * para trabajr con archivos
     */
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { Post };
