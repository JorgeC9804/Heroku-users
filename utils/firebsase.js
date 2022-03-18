const dotenv = require("dotenv");

// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

dotenv.config({ path: "./config.env" });

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrR3cf_ggJl4p47zfOnVwsuRngc3wDhQM",
  authDomain: "multer-imag.firebaseapp.com",
  projectId: "multer-imag",
  storageBucket: "multer-imag.appspot.com",
  messagingSenderId: "551994052511",
  appId: "1:551994052511:web:9c175e0275fb46ef45f7aa",
};

// Initialize Firebase
// const firebaseAPP = initializeApp(firebaseConfig);
// const storage = getStorage(firebaseAPP);

// module.exports = { storage };

/**
 *
 * Almacenar las credenciales en config.env ya que es documentacion
 * delicada
 * DATABASE_API_KEY
 *
 * una vez que se haya guardado las variables de entorno
 */
