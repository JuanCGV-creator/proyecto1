document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const loader = document.getElementById("loading");
    const togglePass = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");

    // Mostrar / ocultar contraseña
    togglePass.addEventListener("click", () => {
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        loader.style.display = "block";

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.success) {
            alert(data.message || "Usuario válido para ingresar");
            window.location.href = "/panel";
        } else {
            alert(data.message || "Usuario no creado o disponible");
            loader.style.display = "none";
            // Opcional: limpiar campos
            // document.getElementById("email").value = "";
            // document.getElementById("password").value = "";
        }
    });
});

