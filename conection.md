# Heroku Conection

1. Subir repositorio a heroku

---

Para que heroku tome los archivos creados, los almacene y nos aviente una url para conectarnos a la base de datos

2. Cambios en la conexion a database

---

No podemos utilizar localhost en Heroku, heroku no te va a conectar a su base de datos. Nosotros queremos conectarnos a una base de datos en produccion

3. Agregar una propiedad mas a las credenciales

---

agregar despues del dialect - nombre de la database

dialectOptions: {

    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
