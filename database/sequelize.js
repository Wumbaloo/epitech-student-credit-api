const { Sequelize } = require('sequelize');

module.exports = new Sequelize('willyaer_epiplanner', 'willyaer', 'willyaer_123', {
    host: 'mysql-willyaer.alwaysdata.net',
    port: 3306,
    dialect: 'mysql'
});