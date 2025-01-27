

import { initScrollEffects } from "./scrollEffects.js";
import { initAnimations } from "./animations.js";
import { initFormValidation } from "./formvalidation.js";
import { initCalendar } from "./calendar.js";

document.addEventListener("DOMContentLoaded", () => {
    initScrollEffects();
    initAnimations();
    initFormValidation();
    initCalendar();
});

document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:3000/api/appointments";

    const appointmentForm = document.getElementById("appointmentForm");
    const appointmentsTable = document.getElementById("appointmentsTable").querySelector("tbody");

    // Cargar citas disponibles
    const loadAppointments = async () => {
        try {
            const response = await fetch(apiUrl);
            const appointments = await response.json();

            appointmentsTable.innerHTML = appointments.map(app => `
                <tr>
                    <td>${app.client_name || '---'}</td>
                    <td>${app.client_email || '---'}</td>
                    <td>${app.date}</td>
                    <td>${app.time}</td>
                    <td>${app.is_available ? "Disponible" : "Reservado"}</td>
                </tr>
            `).join("");
        } catch (error) {
            console.error("Error loading appointments:", error);
        }
    };

    // Enviar formulario
    appointmentForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(appointmentForm);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("Consulta agendada exitosamente.");
                appointmentForm.reset();
                loadAppointments();
            } else {
                const result = await response.json();
                alert(result.error || "Error al agendar la consulta.");
            }
        } catch (error) {
            console.error("Error booking appointment:", error);
        }
    });

    loadAppointments();
});


