/**
 * Comment model
 * 
 * id
 * text
 * postId
 * userId
 * status
 */

const { DataTypes } = require('sequelize');


// Utils
const { sequelize } = require('../utils/database');
/**
 * Necesitamos a database para crear el nuevo modelo
 * llamado comments
 */

const Comments = sequelize.define('comment', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	text: {
		type: DataTypes.STRING(100),
		allowNull: false, // NOT NULL
	},
	/*postId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
    */
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
    status: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'active'
    }
});

module.exports = { Comments };