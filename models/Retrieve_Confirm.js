// const {DataTypes}=require('sequelize')
// const sequelize=require('../config/database')

// const status_table=sequelize.define('json_data',{
//     TokenNo: {
//         type: DataTypes.STRING,
//         allowNull: true
//       },
//       Status: {
//         type: DataTypes.STRING,
//         allowNull: true
//       },
//       Reason: {
//         type: DataTypes.STRING,
//         allowNull: true
//       }
//     },
//     {
//         tableName: 'json_data',
//         timestamps: false 
//     }  

// );
// module.exports=status_table;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the model for json_data table
const status_table = sequelize.define('json_data', {
    TokenNo: {
        type: DataTypes.STRING,  // Matches with VARCHAR type
        allowNull: true    ,
        primaryKey: true      // Allow NULL values in this column
    },
    Status: {
        type: DataTypes.STRING,  // Matches with VARCHAR type
        allowNull: true          // Allow NULL values in this column
    },
    Reason: {
        type: DataTypes.STRING,  // Matches with VARCHAR type
        allowNull: true          // Allow NULL values in this column
    }
}, {
    tableName: 'json_data',       // Explicitly setting the table name
    timestamps: false   ,
    // primaryKey: false          // Disabling timestamps (createdAt, updatedAt)
});

module.exports = status_table;
