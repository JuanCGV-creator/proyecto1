export function renderNotificaciones() {
    return `
        <h3>Centro de Notificaciones</h3>
        <div class="timeline">
            <div class="timeline-item">
                <div class="timeline-date">Hace 5 minutos</div>
                <div class="timeline-content">
                    <strong><i class="fas fa-check-circle text-success"></i> Pago Recibido</strong>
                    <p>Se ha confirmado el pago de la factura #FAC-1023 por $150.000.</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-date">Hace 1 hora</div>
                <div class="timeline-content">
                    <strong><i class="fas fa-box text-info"></i> Stock Bajo</strong>
                    <p>El producto "Filtro de Aire" tiene menos de 5 unidades disponibles.</p>
                    <span class="badge badge-warning">Alerta de Stock</span>
                </div>
            </div>
        </div>
    `;
}
