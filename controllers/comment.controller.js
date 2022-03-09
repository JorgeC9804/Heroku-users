const { Comments } = require('../models/comment.models');

// models include
const { Post } = require('../models/post.model');
const { User } = require('../models/user.model');

/**
 * Tomamos lo que es el modelo para definir lo que 
 * me traera, y establecer errores si no existe
 */

// get all comment include post and user
exports.getComment = async ( req, res ) => {
    try {
        const comments = await Comments.findAll({
            where: { status: 'active' },
            include: [{model:  User }] // [{ model: Post }]
        });

        res.status(200).json({
            status: 'success',
            data: { comments }
        })
    } catch(error) {
        console.log(error);
    }
};

// get one comment buy id include post and user
exports.getCommentId = async ( req, res ) => {
    try {
        const { id } = req.params;
        const comment = await Comments.findOne({
            where: {
                status: 'active',
                id
            },
            /*include: [
                { model: Post }, 
                { model: User }]
            */
        })
        if(!comment) {
            res.status(404).json({
                status: 'error',
                message: 'No post found with the given ID'
            })
            return;
        }

        res.status(200).json({
            status: 'success',
            data: { comment }
        })

    } catch (error) {
        console.log(error)
    }
}

// create a new comment
exports.createComment = async ( req, res ) => {
    try {
        const { text, userId } = req.body;

        if(!text) {
            res.status(400).json({
                status: 'error',
                message: 'Must provide text, possId and userId'
            })
        }

        const newComment = await Comments.create({
            text,
            userId
        })

        res.status(201).json({
            status: 'success',
            data: { newComment }
        });

    } catch (error) {
        console.log(error);
    }
}