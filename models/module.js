const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/sequelize');

class Module extends Model {

}

Module.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING(16),
        allowNull: false,
        unique: true
    },
    instance: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    possible_codes: {
        type: DataTypes.STRING(64),
        allowNull: true
    },
    projects: {
        type: DataTypes.STRING(64),
        allowNull: true
    },
    year: {
        type: DataTypes.STRING(4),
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'module'
});

module.exports = Module;