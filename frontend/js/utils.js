// ====================== UTILIDADES COMPARTIDAS ======================

function escapeHtml(text) {
    if (!text) return "";
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-CO').format(precio || 0);
}

function mostrarNotificacion(mensaje, tipo = "info") {
    // Crear notificación temporal
    const notif = document.createElement("div");
    notif.className = `notificacion notif-${tipo}`;
    notif.setAttribute("role", "alert");
    notif.innerHTML = `
        <i class="fas ${tipo === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}" aria-hidden="true"></i>
        <span>${mensaje}</span>
    `;

    // Estilos inline para notificación
    notif.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        padding: 15px 25px;
        background: ${tipo === 'success' ? '#0ca678' : '#e03131'};
        color: white;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notif);

    // Auto-remover
    setTimeout(() => {
        notif.style.animation = "slideOut 0.3s ease";
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

function mostrarError(mensaje) {
    const tbody = document.getElementById("listaProductos") || document.querySelector("tbody");
    if (tbody) {
        tbody.innerHTML = `
            <tr>
                <td colspan="100%" class="loading-container text-danger w-100">
                    <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
                    ${mensaje}
                </td>
            </tr>
        `;
    }
}
