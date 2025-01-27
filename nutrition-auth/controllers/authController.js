const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Clave secreta de JWT (mueve esto a un archivo .env)
const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET=mi_clave_secreta';

// Función para registrar usuarios
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Validar campos obligatorios
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    try {
        // Verificar si el usuario ya existe
        const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
        db.query(checkUserQuery, [email], async (err, results) => {
            if (err) throw err;

            if (results.length > 0) {
                return res.status(400).json({ error: 'El correo ya está registrado.' });
            }

            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insertar el nuevo usuario
            const insertUserQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            db.query(insertUserQuery, [name, email, hashedPassword], (err, result) => {
                if (err) throw err;

                res.status(201).json({ message: 'Usuario registrado exitosamente.' });
            });
        });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

// Función para iniciar sesión
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validar campos obligatorios
    if (!email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    try {
        // Buscar el usuario en la base de datos
        const findUserQuery = 'SELECT * FROM users WHERE email = ?';
        db.query(findUserQuery, [email], async (err, results) => {
            if (err) throw err;

            if (results.length === 0) {
                return res.status(404).json({ error: 'El usuario no existe.' });
            }

            const user = results[0];

            // Comparar la contraseña
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Contraseña incorrecta.' });
            }

            // Generar un token JWT
            const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({
                message: 'Inicio de sesión exitoso.',
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            });
        });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

module.exports = { registerUser, loginUser };
