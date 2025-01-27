// formValidation.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#bookingForm");
    const inputs = form.querySelectorAll("input, textarea");
    const errorMessages = {
        name: "Por favor, introduce un nombre válido.",
        email: "Introduce un correo electrónico válido.",
        phone: "Introduce un número de teléfono válido.",
    };

    form.addEventListener("submit", (event) => {
        let isValid = true;
        inputs.forEach((input) => {
            if (!input.value.trim()) {
                isValid = false;
                alert(errorMessages[input.name] || "Este campo es obligatorio.");
            }
        });

        if (!isValid) event.preventDefault();
    });
});
