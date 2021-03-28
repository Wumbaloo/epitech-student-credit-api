const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/sequelize');

class Redoublant extends Model {

}

Redoublant.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    login: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    modelName: 'redoublant'
});

module.exports = Redoublant;