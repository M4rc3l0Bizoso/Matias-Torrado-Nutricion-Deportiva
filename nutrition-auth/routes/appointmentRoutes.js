const express = require("express");
const router = express.Router();
const appointmentsController = require("../controllers/appointmentsController");

// Ruta para obtener las citas disponibles
router.get("/", appointmentsController.getAvailableAppointments);

// Ruta para agendar una nueva cita
router.post("/", appointmentsController.bookAppointment);

// Ruta para administrar disponibilidad (habilitar/deshabilitar citas)
router.put("/:id", appointmentsController.updateAppointmentAvailability);

module.exports = router;
