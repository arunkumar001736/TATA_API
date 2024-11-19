const {Sequelize}= require('sequelize')

const sequelize = new Sequelize({
    dialect: 'mssql',
    host: 'ARUNKR-LT',
    port: '59989', // Replace with actual port number
    database: 'ASRS_TATA_API',
    username: 'sa',
    password: 'ca123',
    dialectOptions: {
        options: {
            encrypt: true,
            trustServerCertificate: true,
            requestTimeout: 60000
        }
    },
    logging: false
});




sequelize.authenticate()
.then(()=>{
    console.log('Database connection has been established successfully.');

})
.catch((err)=>{
    console.log('Unable to connect to the database.'+err);
});

module.exports=sequelize;