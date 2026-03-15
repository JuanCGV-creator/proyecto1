document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const user = {
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            cedula: document.getElementById("cedula").value,
            nacimiento: document.getElementById("nacimiento").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        };

        if (Object.values(user).some(v => v.trim() === "")) {
            alert("⚠️ Todos los campos son obligatorios.");
            return;
        }

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });

        const data = await res.json();

        if (data.success) {
            alert("Usuario creado exitosamente. Ya puedes iniciar sesión.");
            window.location.href = "/login";
        } else {
            alert("Error: " + (data.message || "Ocurrió un problema en el registro"));
        }
    });
});
