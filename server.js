const { app } = require("./app");

// Utils
const { sequelize } = require("./utils/database");
const { initModels } = require("./utils/initModels");

sequelize
  .authenticate()
  .then(() => console.log("Database authenticated"))
  .catch(err => console.log(err));

// Models relations
initModels();

sequelize
  .sync() // { force: true } crear a cada rato las tablas
  .then(() => console.log("Database synced"))
  .catch(err => console.log(err));

// const PORT = process.env.PORT || 4000
const PORT = process.env.PORT || 5000;
/**
 * Cualquier servicio que nos brindan, siempre hay que buscar el
 * servio o la variable PORT
 *
 */

app.listen(PORT, () => {
  console.log("API running " + PORT);
});
