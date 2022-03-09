// Define the followong endpoints

// GET - Get all comments ( Include the user info )
// GET - Get comment by Id ( Include the user info )
// POST - create new comment ( text, userId, postId )

const express = require('express');

/**
 * express para obtener las rutas
 */

const { 
    getComment,
    getCommentId, 
    createComment
 } = require('../controllers/comment.controller');

 const router = express.Router();

 router.get('/', getComment);
 router.get('/:id', getCommentId);
 router.post('/', createComment);

 module.exports = { commentRouter: router };

 /**
  * de esta forma establezco que router almacenara 
  * informacion de tipo comment, donde recibira la URL, y los 
  * controladores, que en este caso son los encargados de 
  * establecer los endpoints
  */