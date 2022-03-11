const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
/**
 * path lo mandamos directo a la raiz
 */
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 5432,
  database: process.env.DB,
  dialect: "postgres",
  logging: false,
  // parte de Heroku que necesita sequelize para conectarse a produccion
  /**/ dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  } /**/,
});

/* Host ec2-44-193-188-118.compute-1.amazonaws.com
Database d814jr3li1ujoj
User ruostyfequbjix
Port 5432
Password 6ee6b48f365e3f841ff70d8bb6b24d30053e7021796395de6fab41cf64ae45b1
*/

module.exports = { sequelize };
