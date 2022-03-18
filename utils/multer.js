const multer = require("multer");

// const path = require("path");
// esta libreria nos permite construir rutas relativas o rutas completas
/**
 * esto es para tener una mejor seguridad de no equivocarnos
 */

// utils
const { AppError } = require("./appError");

/*const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // file - la imagen que vamos a recibir
    // const destinationPath = path.join(__dirname, "..", "imgs"); // construimos la ruta
    /**
     * __dirname - me va a regresar la referencia
     */
//cb(null, "imgs"); // recibe un error, y recibe donde se almacenaran las imagenes
// le indicamos que el nombre de la carpeta es imgs, en donde debe guardarse la imagen
/**
 * segundo parametro, la referencia de donde se almacenaran las imagenes
 */
// }, // donde se van almacenar
// filename: (req, file, cb) => {
// como se llamara cada archivo
/* if (!file.mimetype.startsWith("image")) {
      // return an error
      cb(new AppError(400, "Must provide an image as a file"));
    } */
/* console.log("Uploading image...");

    console.table(file);

    const [name, extension] = file.originalname.split(".");

    const fileName = `${name}-${Date.now()}.${extension}`;

    cb(null, fileName);
  },*/

/**
 * mimwtype = tipo de archivo que vamos a manejar
 * image/jpg image/png image/jpeg
 */
// });
/**
 * sera almacenar las imagenes dentro del servidor donde se aloje
 * - diskStorage
 * recibe un objeto para su configuracion
 */

// multer.memoryStorage;
/**
 * nos permite acceder a los archivos
 * para que nos permite accder a nuestra nube
 */

const storage = multer.memoryStorage(); // lo almecena ahora en forebase

const multerFileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image")) {
    // return an error
    cb(new AppError(400, "Must provide an image as a file", false));
  } else cb(null, true);
};

const upload = multer({
  storage,
  fileFilter: multerFileFilter,
});

module.exports = { upload };
