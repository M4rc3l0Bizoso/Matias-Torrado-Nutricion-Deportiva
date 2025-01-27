const db = require("../config/db");

// Obtener citas disponibles
const getAvailableAppointments = (req, res) => {
    const query = "SELECT * FROM appointments WHERE is_available = TRUE";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching appointments:", err);
            return res.status(500).json({ error: "Error al obtener las citas." });
        }
        res.status(200).json(results);
    });
};

// Agendar una nueva cita
const bookAppointment = (req, res) => {
    const { client_name, client_email, date, time } = req.body;

    // Validar datos
    if (!client_name || !client_email || !date || !time) {
        return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    // Verificar si la cita ya está ocupada
    const checkQuery = "SELECT * FROM appointments WHERE date = ? AND time = ?";
    db.query(checkQuery, [date, time], (err, results) => {
        if (err) {
            console.error("Error checking appointment:", err);
            return res.status(500).json({ error: "Error al verificar la cita." });
        }

        if (results.length > 0 && !results[0].is_available) {
            return res.status(400).json({ error: "La cita no está disponible." });
        }

        // Reservar la cita
        const insertQuery = "INSERT INTO appointments (client_name, client_email, date, time, is_available) VALUES (?, ?, ?, ?, FALSE)";
        db.query(insertQuery, [client_name, client_email, date, time], (err, result) => {
            if (err) {
                console.error("Error booking appointment:", err);
                return res.status(500).json({ error: "Error al agendar la cita." });
            }
            res.status(201).json({ message: "Cita agendada exitosamente." });
        });
    });
};

// Actualizar disponibilidad de la cita
const updateAppointmentAvailability = (req, res) => {
    const { id } = req.params;
    const { is_available } = req.body;

    const query = "UPDATE appointments SET is_available = ? WHERE id = ?";
    db.query(query, [is_available, id], (err, result) => {
        if (err) {
            console.error("Error updating availability:", err);
            return res.status(500).json({ error: "Error al actualizar la disponibilidad." });
        }
        res.status(200).json({ message: "Disponibilidad actualizada exitosamente." });
    });
};

module.exports = {
    getAvailableAppointments,
    bookAppointment,
    updateAppointmentAvailability,
};
