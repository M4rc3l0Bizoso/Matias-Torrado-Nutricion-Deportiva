const mysql = require('mysql2');

// Configuración de la conexión
const db = mysql.createConnection( {
    host:'localhost',
    user: 'root',         // Usuario de SQL Server
    password: 'Esmeralda22@',  // Contraseña del usuario    
    database: 'nutrition_auth', // Nombre de tu base de datos
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL!');
});

module.exports = db;
