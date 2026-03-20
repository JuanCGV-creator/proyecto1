/**
 * PANEL ADMINISTRATIVO - ORQUESTADOR DE MÓDULOS
 * Este archivo actúa como el enrutador principal para cargar el contenido dinámico.
 */

import { renderDashboard } from './modules/dashboard/dashboard.js';
import { renderClientes } from './modules/clientes/clientes.js';
import { renderProductos, initProductos } from './modules/productos/productos.js';
import { renderProductosXml, initProductosXml } from './modules/productos/productos-xml.js';
import { renderVentas } from './modules/ventas/ventas.js';
import { renderFacturacion, renderNuevaFactura } from './modules/facturacion/facturacion.js';
import { renderDistribucion } from './modules/distribucion/distribucion.js';
import { renderNotificaciones } from './modules/notificaciones/notificaciones.js';

// --- Referencias del DOM ---
const panelContent = document.getElementById("panelContent");
const menuItems = document.querySelectorAll(".menu li");

// --- Función principal de carga de vistas ---
export async function loadView(modulo) {
    // Actualizar clase activa en el menú
    menuItems.forEach(item => item.classList.remove("active"));
    const activeItem = Array.from(menuItems).find(item => {
        const onclickAttr = item.getAttribute("onclick");
        return onclickAttr && onclickAttr.includes(modulo);
    });
    if (activeItem) activeItem.classList.add("active");

    // Limpiar contenido previo
    panelContent.innerHTML = '';

    // Cargar el módulo correspondiente
    switch (modulo) {
        case "dashboard":
            panelContent.innerHTML = renderDashboard();
            break;
            
        case "clientes":
            panelContent.innerHTML = renderClientes();
            break;
            
        case "productos":
            panelContent.innerHTML = renderProductos();
            await initProductos(); // Inicializa lógica (fetch, events)
            break;
            
        case "productosxml":
            panelContent.innerHTML = renderProductosXml();
            await initProductosXml();
            break;
            
        case "ventas":
            panelContent.innerHTML = renderVentas();
            break;
            
        case "facturacion":
            panelContent.innerHTML = renderFacturacion();
            // Agregar listener para nueva factura ya que es un botón dinámico
            document.getElementById('btnNuevaFactura')?.addEventListener('click', () => loadView('nueva-factura'));
            break;
            
        case "nueva-factura":
            panelContent.innerHTML = renderNuevaFactura();
            document.getElementById('btnCancelarFactura')?.addEventListener('click', () => loadView('facturacion'));
            break;
            
        case "distribucion":
            panelContent.innerHTML = renderDistribucion();
            break;
            
        case "notificaciones":
            panelContent.innerHTML = renderNotificaciones();
            break;
            
        default:
            panelContent.innerHTML = "<p>Módulo no encontrado.</p>";
            break;
    }

    // Cerrar sidebar en móviles tras cargar vista
    const sidebar = document.querySelector(".sidebar");
    if (sidebar.classList.contains("active")) {
        sidebar.classList.remove("active");
    }
}

// --- Funciones Globales (Para mantener compatibilidad con onclick del HTML) ---
window.loadView = loadView;

window.cerrarSesion = function() {
    location.href = "/login";
};

window.toggleSidebar = function() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("active");
};

// --- Inicialización ---
document.addEventListener("DOMContentLoaded", () => {
    // Cargar dashboard por defecto si estamos en la ruta del panel
    loadView('dashboard');
});

// Cerrar modal si se hace clic fuera (General)
window.onclick = function (event) {
    const pModal = document.getElementById('productModal');
    const xModal = document.getElementById('xmlProductModal');
    if (event.target == pModal) pModal.style.display = 'none';
    if (event.target == xModal) xModal.style.display = 'none';
};
