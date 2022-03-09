const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const User = sequelize.define('user', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		allowNull: false,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING(100),
		allowNull: false
	}
});

module.exports = { User };
