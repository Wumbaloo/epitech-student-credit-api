const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/sequelize');

class TekYear extends Model {

}

TekYear.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
}, {
    sequelize,
    modelName: 'tekYear'
});

module.exports = TekYear;