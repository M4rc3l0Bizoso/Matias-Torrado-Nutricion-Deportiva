const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db'); // Asegúrate de que este archivo esté bien configurado
const authRoutes = require('./routes/authRoutes'); // Ruta para manejo de autenticación
const paymentRoutes = require('./routes/paymentRoutes'); // Ajusta la ruta según la ubicación de tu archivo
app.use('/api/payment', paymentRoutes);

// Configuración de la aplicación
const app = express();
const PORT = 3000; // Puerto donde estará corriendo el servidor


app.use(cors()); // Habilitar CORS para todas las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1); // Detiene la aplicación si hay un problema con la conexión
    }
    console.log('Connected to the MySQL database!');
});


// Rutas
app.use('/api/auth', authRoutes); // Todas las rutas relacionadas a autenticación



// Ruta de prueba para verificar que el servidor está corriendo
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente!');
});

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const appointmentsRoutes = require("./routes/appointmentRoutes");
app.use("/api/appointments", appointmentsRoutes);
