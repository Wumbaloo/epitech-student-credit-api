const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/sequelize');

class Roadblock extends Model {

}

Roadblock.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    credits_needed: {
        type: DataTypes.STRING(16),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'roadblock'
});

module.exports = Roadblock;