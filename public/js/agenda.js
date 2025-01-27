document.addEventListener("DOMContentLoaded", () => {
    const appointmentForm = document.getElementById("appointmentForm");
    const paymentSection = document.getElementById("payment-section");
    const paymentForm = document.getElementById("paymentForm");

    appointmentForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Validar datos del formulario de agenda
        const formData = new FormData(appointmentForm);
        const data = Object.fromEntries(formData);

        console.log("Datos de la consulta:", data);

        // Mostrar formulario de pago
        appointmentForm.style.display = "none";
        paymentSection.style.display = "block";
    });

    paymentForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Validar datos de pago
        const paymentData = new FormData(paymentForm);
        const paymentDetails = Object.fromEntries(paymentData);

        console.log("Detalles de pago:", paymentDetails);

        // Aquí puedes enviar los datos de pago al servidor
        alert("Pago procesado exitosamente. ¡Gracias por tu consulta!");
    });
});
