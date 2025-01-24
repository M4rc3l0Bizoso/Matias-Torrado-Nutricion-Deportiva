// Scroll effect for navbar background
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// GSAP animation para el titulo
document.addEventListener('DOMContentLoaded', () => {
    gsap.fromTo(
        "#dynamic-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    );

gsap.fromTo(
    ".alert-box",
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 1, ease: "bounce.out", delay: 0.5 }
);

// Notification animation
const notification = document.getElementById('notification');
setTimeout(() => {
    notification.classList.add('show');
}, 2000);
// Remove notification after 30 seconds
setTimeout(() => {
    notification.classList.remove('show');
}, 35000);
});

//animaciones de seccion "ADN"
document.addEventListener('DOMContentLoaded', () => {
    gsap.fromTo(
        ".adn-box",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    );

    gsap.fromTo(
        ".styled-button",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "elastic.out", delay: 0.5 }
    );
});


//formulario de agenda 

document.addEventListener('DOMContentLoaded', () => {
    const timeSlots = {
        '2025-01-31': [
            { time: '10:30', slots: 3 },
            { time: '11:00', slots: 5 },
            { time: '11:30', slots: 2 },
            { time: '12:00', slots: 0 },
            { time: '14:00', slots: 4 },
            { time: '15:30', slots: 1 }
        ],
        '2025-02-01': [
            { time: '09:00', slots: 6 },
            { time: '10:00', slots: 2 },
            { time: '11:00', slots: 3 }
        ]
    };

    // Inicializar Flatpickr
    const calendar = flatpickr('#calendar', {
        inline: true,
        dateFormat: 'Y-m-d',
        onChange: (selectedDates, dateStr) => {
            renderTimeSlots(dateStr);
        }
    });

    // Renderizar horarios disponibles
    const renderTimeSlots = (date) => {
        const container = document.getElementById('time-slots');
        container.innerHTML = ''; // Limpiar horarios previos

        if (!timeSlots[date]) {
            container.innerHTML = '<p>No hay horarios disponibles para esta fecha.</p>';
            return;
        }

        timeSlots[date].forEach(slot => {
            const slotDiv = document.createElement('div');
            slotDiv.className = 'time-slot';
            slotDiv.innerHTML = `
                <div>${slot.time}</div>
                <div class="availability-bar" style="width: ${slot.slots * 20}%;"></div>
                <small>${slot.slots} lugar(es) disponible(s)</small>
            `;
            slotDiv.style.opacity = slot.slots > 0 ? '1' : '0.5';
            slotDiv.style.pointerEvents = slot.slots > 0 ? 'auto' : 'none';

            container.appendChild(slotDiv);
        });
    };

    // Mostrar horarios de la primera fecha por defecto
    renderTimeSlots(Object.keys(timeSlots)[0]);
});

//formulario de agenda
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        // Aquí puedes agregar lógica para enviar los datos a un servidor o mostrarlos en pantalla
        console.log('Nombre:', name);
        console.log('Apellido:', surname);
        console.log('Email:', email);
        console.log('Teléfono:', phone);

        alert('Formulario enviado correctamente');
        form.reset();
    });
});
