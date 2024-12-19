
const { DataTypes } = require('sequelize');
//const sequelize = require('./database');

const sequelize = require('../config/database');

 

const YourTable = sequelize.define('Data', {
    ID: {
        type: DataTypes.INTEGER,
        allowNull: true    ,
        primaryKey: true 
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    Email_ID: {
        type: DataTypes.STRING,
        allowNull: true 
    }
}, {
    tableName: 'Data',  
    timestamps: false        
});

module.exports=YourTable