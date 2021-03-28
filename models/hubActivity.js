const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/sequelize');

class HubActivity extends Model {

}

HubActivity.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(16),
        allowNull: false,
        unique: true
    },
    organization_present_xp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    organization_missing_xp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    present_xp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    missing_xp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    possible_names: {
        type: DataTypes.STRING(64),
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'hub_activity'
});

module.exports = HubActivity;