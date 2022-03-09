const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
	host: 'localhost',
	username: 'postgres',
	password: '1998',
	database: 'relations-example',
	dialect: 'postgres',
	logging: false
});

module.exports = { sequelize };
