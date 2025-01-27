document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");
  const registerBtn = document.getElementById("register-btn");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  // Cambiar entre formularios
  loginBtn.addEventListener("click", () => {
    loginBtn.classList.add("active");
    registerBtn.classList.remove("active");
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
  });

  registerBtn.addEventListener("click", () => {
    registerBtn.classList.add("active");
    loginBtn.classList.remove("active");
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
  });

  const apiUrl = "http://localhost:3000/api/auth";

  // Manejo de formulario de login
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        showNotification("Inicio de sesión exitoso.");
        localStorage.setItem("token", result.token);
        window.location.href = "/dashboard.html"; // Asegúrate de tener esta página creada
      } else {
        showNotification(result.error || "Ocurrió un error.", true);
      }
    } catch (error) {
      console.error("Error:", error);
      showNotification("No se pudo conectar al servidor.", true);
    }
  });

  // Manejo de formulario de registro
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      showNotification("Las contraseñas no coinciden.", true);
      return;
    }

    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        showNotification("Registro exitoso. Por favor, inicia sesión.");
        loginBtn.click(); // Cambiar a la vista de login automáticamente
      } else {
        showNotification(result.error || "Ocurrió un error.", true);
      }
    } catch (error) {
      console.error("Error:", error);
      showNotification("No se pudo conectar al servidor.", true);
    }
  });

  // Función para mostrar notificaciones
  function showNotification(message, isError = false) {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    notification.style.padding = "10px 20px";
    notification.style.backgroundColor = isError ? "#ff4d4d" : "#4caf50";
    notification.style.color = "white";
    notification.style.borderRadius = "5px";
    notification.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.3)";
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 5000);
  }
});

